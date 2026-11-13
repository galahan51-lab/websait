
document.addEventListener("DOMContentLoaded", () => {

    const envelope = document.getElementById("envelope");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("closeBtn");

    if (!envelope || !modal || !closeBtn) {
        console.error("HTML ID олдсонгүй!");
        return;
    }

    let opening = false;
    let closing = false;

    // Захидал нээх
    function openLetter() {

        if (
            opening ||
            closing ||
            modal.classList.contains("show")
        ) return;

        opening = true;

        envelope.classList.add("open");

        setTimeout(() => {
            modal.classList.add("show");
            opening = false;
        }, 850);
    }

    // Захидал хаах
    function closeLetter() {

        if (opening || closing) return;
        if (!modal.classList.contains("show")) return;

        closing = true;

        modal.classList.remove("show");

        setTimeout(() => {
            envelope.classList.remove("open");
            closing = false;
        }, 450);
    }

    // Дугтуй дарах
    envelope.addEventListener("click", openLetter);

    // Гарны товчоор нээх
    envelope.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLetter();
        }
    });

    // Хаах товч
    closeBtn.addEventListener("click", closeLetter);

    // Гадна хэсэг дарах
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeLetter();
        }
    });

    // ESC дарах
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLetter();
        }
    });

    // Гэрлийн canvas
    const canvas = document.createElement("canvas");
    canvas.id = "lightCanvas";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let lights = [];

    function resizeCanvas() {

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    // Гэрэл үүсгэх
    function createLight(x, y, amount = 2) {

        for (let i = 0; i < amount; i++) {

            lights.push({
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,

                radius: Math.random() * 2.5 + 1,

                alpha: 1,

                speed: Math.random() * 0.025 + 0.015
            });
        }

        if (lights.length > 250) {
            lights.splice(0, lights.length - 250);
        }
    }

    // Гэрэл хөдөлгөх
    function animateLights() {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        lights.forEach((light) => {

            ctx.beginPath();

            ctx.arc(
                light.x,
                light.y,
                light.radius,
                0,
                Math.PI * 2
            );

            ctx.shadowBlur = 15;
            ctx.shadowColor = "#ff8cff";

            ctx.fillStyle =
                `rgba(255, 170, 255, ${light.alpha})`;

            ctx.fill();

            light.alpha -= light.speed;
            light.y -= 0.4;
        });

        lights = lights.filter(
            light => light.alpha > 0
        );

        requestAnimationFrame(animateLights);
    }

    animateLights();

    // Компьютерийн mouse хөдөлгөөн
    window.addEventListener("mousemove", (event) => {
        createLight(event.clientX, event.clientY, 2);
    });

    // Mouse дарах
    window.addEventListener("click", (event) => {
        createLight(event.clientX, event.clientY, 15);
    });

    // Утасны хуруу хөдөлгөх
    window.addEventListener("touchmove", (event) => {

        for (const touch of event.changedTouches) {

            createLight(
                touch.clientX,
                touch.clientY,
                5
            );
        }

    }, { passive: true });

    // Утасны дэлгэц хүрэх
    window.addEventListener("touchstart", (event) => {

        for (const touch of event.changedTouches) {

            createLight(
                touch.clientX,
                touch.clientY,
                25
            );
        }

    }, { passive: true });

});
