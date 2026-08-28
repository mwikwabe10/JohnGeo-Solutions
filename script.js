/* =========================================================
   HERO VIDEO
   DESKTOP + LIGHTWEIGHT MOBILE VERSION
========================================================= */

const heroVideo =
    document.getElementById("hero-video");


if (heroVideo) {

    /* -----------------------------------------------------
       DETECT DEVICE
    ----------------------------------------------------- */

    const isMobile =
        window.matchMedia("(max-width: 768px)").matches;


    /* -----------------------------------------------------
       SELECT VIDEO
    ----------------------------------------------------- */

    const selectedVideo = isMobile
        ? "hero-video-mobile.mp4"
        : "hero-video.mp4";


    /* -----------------------------------------------------
       VIDEO SETTINGS
    ----------------------------------------------------- */

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;
    heroVideo.autoplay = true;
    heroVideo.loop = true;
    heroVideo.controls = false;


    heroVideo.setAttribute(
        "muted",
        ""
    );

    heroVideo.setAttribute(
        "autoplay",
        ""
    );

    heroVideo.setAttribute(
        "loop",
        ""
    );

    heroVideo.setAttribute(
        "playsinline",
        ""
    );

    heroVideo.setAttribute(
        "webkit-playsinline",
        ""
    );


    /* -----------------------------------------------------
       LOAD CORRECT VIDEO
    ----------------------------------------------------- */

    heroVideo.src = selectedVideo;

    heroVideo.load();


    /* -----------------------------------------------------
       START VIDEO
    ----------------------------------------------------- */

    function playHeroVideo() {

        if (
            document.visibilityState !==
            "visible"
        ) {
            return;
        }


        heroVideo.muted = true;


        const playPromise =
            heroVideo.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(() => {

                /*
                   Autoplay may be blocked by
                   the mobile browser.

                   We do not continuously retry.
                */

            });

        }

    }


    /* -----------------------------------------------------
       START WHEN VIDEO IS READY
    ----------------------------------------------------- */

    if (
        heroVideo.readyState >= 2
    ) {

        playHeroVideo();

    } else {

        heroVideo.addEventListener(
            "loadeddata",
            playHeroVideo,
            {
                once: true
            }
        );

    }


    heroVideo.addEventListener(
        "canplay",
        playHeroVideo,
        {
            once: true
        }
    );


    /* -----------------------------------------------------
       MOBILE USER-INTERACTION FALLBACK
    ----------------------------------------------------- */

    const resumeHeroVideo = () => {

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
        resumeHeroVideo,
        {
            passive: true,
            once: true
        }
    );


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
                document.visibilityState ===
                "visible"
            ) {

                if (
                    heroVideo.paused &&
                    !heroVideo.ended
                ) {

                    heroVideo.muted = true;

                    heroVideo
                        .play()
                        .catch(() => {});

                }

            }

        }
    );


    /* -----------------------------------------------------
       VIDEO ERROR
    ----------------------------------------------------- */

    heroVideo.addEventListener(
        "error",
        () => {

            console.warn(
                "JohnGeo hero video failed to load:",
                selectedVideo
            );

        }
    );

}
