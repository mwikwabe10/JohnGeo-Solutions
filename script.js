/* =========================================================
   HERO VIDEO
   OPTIMIZED FOR DESKTOP + MOBILE
========================================================= */

const heroVideo =
    document.getElementById("hero-video");

if (heroVideo) {

    const mobile =
        window.matchMedia("(max-width: 768px)").matches;


    /* -----------------------------------------------------
       SELECT VIDEO
    ----------------------------------------------------- */

    heroVideo.src = mobile
        ? "hero-video-mobile.mp4"
        : "hero-video.mp4";


    /* -----------------------------------------------------
       MOBILE-SAFE SETTINGS
    ----------------------------------------------------- */

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.autoplay = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;
    heroVideo.controls = false;


    heroVideo.setAttribute("muted", "");
    heroVideo.setAttribute("autoplay", "");
    heroVideo.setAttribute("loop", "");
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute(
        "webkit-playsinline",
        ""
    );


    /* -----------------------------------------------------
       LOAD VIDEO
    ----------------------------------------------------- */

    heroVideo.load();


    /* -----------------------------------------------------
       START ONCE VIDEO IS READY
    ----------------------------------------------------- */

    const startVideo = () => {

        heroVideo.muted = true;

        heroVideo.play().catch(() => {
            /*
               Autoplay can be blocked by some browsers.
               Do not repeatedly force playback.
            */
        });

    };


    heroVideo.addEventListener(
        "canplay",
        startVideo,
        { once: true }
    );


    heroVideo.addEventListener(
        "loadeddata",
        startVideo,
        { once: true }
    );


    /* -----------------------------------------------------
       INITIAL ATTEMPT
    ----------------------------------------------------- */

    startVideo();


    /* -----------------------------------------------------
       USER INTERACTION FALLBACK
    ----------------------------------------------------- */

    const resumeVideo = () => {

        if (
            heroVideo.paused &&
            !heroVideo.ended
        ) {

            heroVideo.muted = true;

            heroVideo.play().catch(() => {});

        }

    };


    document.addEventListener(
        "touchstart",
        resumeVideo,
        {
            passive: true,
            once: true
        }
    );


    /* -----------------------------------------------------
       RETURNING TO PAGE
    ----------------------------------------------------- */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "visible"
            ) {

                if (
                    heroVideo.paused &&
                    !heroVideo.ended
                ) {

                    heroVideo.muted = true;

                    heroVideo.play().catch(() => {});

                }

            }

        }
    );

}
