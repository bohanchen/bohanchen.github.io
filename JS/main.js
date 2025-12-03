const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");

// Mobile menu toggle
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// Smooth scroll with adjustable duration
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        const targetPosition = target.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1000; // scroll duration in milliseconds (1000ms = 1s)
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const ease = easeInOutCubic(progress / duration); // easing function
            window.scrollTo(0, startPosition + distance * ease);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);

        // Close mobile menu after click
        if(navMenu.classList.contains("open")){
            navMenu.classList.remove("open");
        }
    });
});

// Easing function for smooth animation
function easeInOutCubic(t) {
    return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2;
}
