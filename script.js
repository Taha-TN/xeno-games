document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    SCROLL REVEAL
    ==========================================
    */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /*
    ==========================================
    NUMBER COUNTERS
    ==========================================
    */

    const counters = document.querySelectorAll("[data-count]");

    counters.forEach((counter) => {

        const target = counter.dataset.count;

        if (target === "∞") {
            counter.textContent = "∞";
            return;
        }

        const finalValue = parseInt(target, 10);

        if (isNaN(finalValue)) return;

        let current = 0;

        const duration = 900;

        const startTime = performance.now();

        function updateCounter(time) {

            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            current = Math.floor(
                progress * finalValue
            );

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = finalValue;
            }

        }

        requestAnimationFrame(updateCounter);

    });


    /*
    ==========================================
    MOUSE PARALLAX
    ==========================================
    */

    const hero = document.querySelector(".hero");

    if (hero && window.matchMedia("(pointer:fine)").matches) {

        const floatingElements =
            hero.querySelectorAll(".floating-symbol");

        hero.addEventListener("mousemove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            floatingElements.forEach((element, index) => {

                const strength = (index + 1) * 8;

                element.style.transform =
                    `translate(${x * strength}px, ${y * strength}px)`;

            });

        });

        hero.addEventListener("mouseleave", () => {

            floatingElements.forEach((element) => {
                element.style.transform = "";
            });

        });

    }


    /*
    ==========================================
    BUTTON RIPPLE
    ==========================================
    */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {

        button.addEventListener("click", function(event) {

            const rect = this.getBoundingClientRect();

            const ripple = document.createElement("span");

            ripple.className = "button-ripple";

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 650);

        });

    });


    /*
    ==========================================
    ACTIVE NAVIGATION
    ==========================================
    */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach((link) => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (
            href === currentPage &&
            !link.classList.contains("nav-cta")
        ) {
            link.classList.add("active");
        }

    });

});
