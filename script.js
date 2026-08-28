/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const open = navLinks.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(open)
        );

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("nav a");

function updateActiveNav() {

    let current = "home";
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {

        if (scrollPosition >= section.offsetTop) {
            current = section.id;
        }

    });

    navAnchors.forEach(anchor => {

        anchor.classList.toggle(
            "active",
            anchor.getAttribute("href") === "#" + current
        );

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("in");
    });

}


/* =========================================================
   PORTFOLIO LIGHTBOX
========================================================= */

const lightbox = document.getElementById("lightbox");
const fullImg = document.getElementById("full-img");
const lightboxClose = document.getElementById("lightbox-close");
const projectCards = document.querySelectorAll(".project-card");


function openLightbox(card) {

    if (!lightbox || !fullImg) {
        return;
    }

    const imageURL = card.dataset.image;
    const image = card.querySelector("img");

    if (!image) {
        return;
    }

    fullImg.src = imageURL || image.src;
    fullImg.alt = image.alt || "";

    lightbox.classList.add("active");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeLightbox() {

    if (!lightbox || !fullImg) {
        return;
    }

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    setTimeout(() => {

        if (!lightbox.classList.contains("active")) {
            fullImg.src = "";
        }

    }, 250);

}


projectCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {
            openLightbox(card);
        }
    );

    card.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();
                openLightbox(card);

            }

        }
    );

});


if (fullImg) {

    fullImg.addEventListener(
        "click",
        event => {

            event.stopPropagation();
            closeLightbox();

        }
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        event => {

            event.stopPropagation();
            closeLightbox();

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (formStatus) {

                formStatus.textContent =
                    "Thanks — your project inquiry has been recorded. We'll get back to you shortly.";

                formStatus.classList.add("show");

            }

            contactForm.reset();

        }
    );

}


/* =========================================================
   HERO VIDEO
   STABLE DESKTOP + MOBILE VERSION
========================================================= */

const heroVideo =
    document.getElementById("hero-video");

if (heroVideo) {

    /* -----------------------------------------------------
       VIDEO SETTINGS
    ----------------------------------------------------- */

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.controls = false;

    heroVideo.setAttribute("muted", "");
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("webkit-playsinline", "");


    /* -----------------------------------------------------
       VIDEO STATE
    ----------------------------------------------------- */

    let videoStarted = false;
    let userHasInteracted = false;


    /* -----------------------------------------------------
       START VIDEO
    ----------------------------------------------------- */

    function startHeroVideo() {

        if (
            document.visibilityState !== "visible"
        ) {
            return;
        }

        if (videoStarted) {
            return;
        }

        heroVideo.muted = true;

        const playPromise = heroVideo.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    videoStarted = true;

                })
                .catch(() => {

                    videoStarted = false;

                });

        }

    }


    /* -----------------------------------------------------
       INITIAL START
    ----------------------------------------------------- */

    if (heroVideo.readyState >= 3) {

        startHeroVideo();

    } else {

        heroVideo.addEventListener(
            "canplay",
            startHeroVideo,
            { once: true }
        );

    }


    /* -----------------------------------------------------
       USER INTERACTION FALLBACK
    ----------------------------------------------------- */

    function resumeHeroVideo() {

        userHasInteracted = true;

        if (
            heroVideo.paused &&
            !heroVideo.ended
        ) {

            videoStarted = false;
            startHeroVideo();

        }

    }


    document.addEventListener(
        "pointerdown",
        resumeHeroVideo,
        {
            passive: true,
            once: true
        }
    );


    /* -----------------------------------------------------
       PAGE VISIBILITY
    ----------------------------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState === "visible"
            ) {

                if (
                    heroVideo.paused &&
                    !heroVideo.ended
                ) {

                    if (userHasInteracted) {

                        videoStarted = false;
                        startHeroVideo();

                    }

                }

            }

        }
    );


    /* -----------------------------------------------------
       VIDEO ERROR HANDLING
    ----------------------------------------------------- */

    heroVideo.addEventListener(
        "error",
        () => {

            console.warn(
                "JohnGeo hero video could not be loaded."
            );

        }
    );


    /* -----------------------------------------------------
       VIDEO ENDED
    ----------------------------------------------------- */

    heroVideo.addEventListener(
        "ended",
        () => {

            if (!heroVideo.loop) {

                heroVideo.currentTime = 0;
                videoStarted = false;
                startHeroVideo();

            }

        }
    );

}


/* =========================================================
   INITIAL NAVIGATION UPDATE
========================================================= */

updateActiveNav();
