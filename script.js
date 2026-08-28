<script>


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("mobile-menu");

const navLinks =
    document.getElementById("nav-links");


menuToggle.addEventListener("click", () => {

    const open =
        navLinks.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

});


navLinks
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navAnchors =
    document.querySelectorAll(
        "nav a"
    );


function updateActiveNav(){

    let current = "home";

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach(section => {

        if(
            scrollPosition >=
            section.offsetTop
        ){

            current =
                section.id;

        }

    });


    navAnchors.forEach(anchor => {

        anchor.classList.toggle(
            "active",
            anchor.getAttribute("href") ===
            "#" + current
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    {passive:true}
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(
                    entry.isIntersecting
                ){

                    entry.target.classList.add(
                        "in"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold:.12
        }

    );


revealElements.forEach(
    element =>
        revealObserver.observe(element)
);


/* =========================================================
   PORTFOLIO LIGHTBOX
========================================================= */

const lightbox =
    document.getElementById(
        "lightbox"
    );

const fullImg =
    document.getElementById(
        "full-img"
    );

const lightboxClose =
    document.getElementById(
        "lightbox-close"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


function openLightbox(card){

    const imageURL =
        card.dataset.image;

    const image =
        card.querySelector("img");

    fullImg.src =
        imageURL || image.src;

    fullImg.alt =
        image.alt;

    lightbox.classList.add(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeLightbox(){

    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    setTimeout(() => {

        if(
            !lightbox.classList.contains(
                "active"
            )
        ){

            fullImg.src = "";

        }

    },250);

}


projectCards.forEach(card => {

    card.addEventListener(
        "click",
        event => {

            openLightbox(card);

        }
    );


    card.addEventListener(
        "keydown",
        event => {

            if(
                event.key === "Enter" ||
                event.key === " "
            ){

                event.preventDefault();

                openLightbox(card);

            }

        }
    );

});


fullImg.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        closeLightbox();

    }
);


lightbox.addEventListener(
    "click",
    event => {

        if(
            event.target === lightbox
        ){

            closeLightbox();

        }

    }
);


lightboxClose.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        closeLightbox();

    }
);


document.addEventListener(
    "keydown",
    event => {

        if(
            event.key === "Escape" &&
            lightbox.classList.contains(
                "active"
            )
        ){

            closeLightbox();

        }

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );

const formStatus =
    document.getElementById(
        "form-status"
    );


contactForm.addEventListener(
    "submit",
    function(event){

        event.preventDefault();


        formStatus.textContent =
            "Thanks — your project inquiry has been recorded. We'll get back to you shortly.";

        formStatus.classList.add(
            "show"
        );


        contactForm.reset();

    }
);


/* =========================================================
   HERO VIDEO
========================================================= */

const heroVideo =
    document.querySelector(
        ".hero-media video"
    );


if(heroVideo){

    /*
       MOBILE / IOS / ANDROID VIDEO FIX
       --------------------------------
       Autoplay is allowed only when the video is muted.
       We explicitly set every relevant property before
       attempting playback, then retry when the browser
       becomes ready or the user interacts with the page.
    */

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    heroVideo.setAttribute("muted", "");
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("webkit-playsinline", "");

    const playVideo = () => {

        if(
            document.visibilityState !== "visible"
        ){
            return;
        }

        heroVideo.muted = true;

        const promise = heroVideo.play();

        if(promise !== undefined){

            promise.catch(() => {
                /*
                   Some mobile browsers require a user
                   gesture before starting media. We retry
                   below on touch/pointer/scroll interaction.
                */
            });

        }

    };


    /*
       Try immediately.
    */
    playVideo();


    /*
       Try again when enough video data is available.
    */
    heroVideo.addEventListener(
        "loadedmetadata",
        playVideo,
        {once:true}
    );

    heroVideo.addEventListener(
        "canplay",
        playVideo,
        {once:true}
    );


    /*
       Retry after the first real user interaction.
       This handles mobile browsers that block the
       initial autoplay attempt.
    */
    const resumeVideo = () => {

        playVideo();

    };

    document.addEventListener(
        "touchstart",
        resumeVideo,
        {passive:true, once:true}
    );

    document.addEventListener(
        "pointerdown",
        resumeVideo,
        {passive:true, once:true}
    );

    document.addEventListener(
        "scroll",
        resumeVideo,
        {passive:true, once:true}
    );


    /*
       If the user leaves the tab and comes back,
       attempt playback again.
    */
    document.addEventListener(
        "visibilitychange",
        () => {

            if(
                document.visibilityState ===
                "visible"
            ){

                playVideo();

            }

        }
    );


    /*
       If playback is interrupted, retry once the browser
       reports that the video can play again.
    */
    heroVideo.addEventListener(
        "pause",
        () => {

            if(
                document.visibilityState ===
                "visible"
            ){

                setTimeout(
                    playVideo,
                    150
                );

            }

        }
    );

}


/* =========================================================
   INITIAL NAV UPDATE
========================================================= */

updateActiveNav();


</script>


</body>
</html>
