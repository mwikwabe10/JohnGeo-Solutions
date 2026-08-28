// =====================================================
// HERO VIDEO
// =====================================================

const heroVideo = document.getElementById("hero-video");

if (heroVideo) {

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.playsInline = true;

    heroVideo.setAttribute("muted", "");
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("webkit-playsinline", "");

    function playHeroVideo() {

        heroVideo.muted = true;

        const promise = heroVideo.play();

        if (promise !== undefined) {
            promise.catch(() => {
                // Browser blocked autoplay.
            });
        }
    }

    playHeroVideo();

    heroVideo.addEventListener(
        "loadedmetadata",
        playHeroVideo,
        { once: true }
    );

    heroVideo.addEventListener(
        "canplay",
        playHeroVideo,
        { once: true }
    );

    document.addEventListener(
        "touchstart",
        playHeroVideo,
        {
            passive: true,
            once: true
        }
    );
}


// =====================================================
// IMAGE MODAL
// =====================================================

function openModal(src) {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("img01").src = src;
}
