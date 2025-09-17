(function () {


    const sub2 = function () {

        function Init() {
            function resetScroll() {
                setTimeout(function () {
                    window.scrollTo(0, 0);
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }, 10);
            }

            window.addEventListener("DOMContentLoaded", resetScroll);
            window.addEventListener("load", resetScroll);

            createVisual();
            createSecret();
            createTutorial();
            createTutorialStep();
            createTutorialStep0();
            createTutorialStep1();
            createTutorialStep2();
            createTutorialStep3();
            createTutorialStep4();
            createProgress();
            createQuiz();
            createSectionBg();
        }

        function createSectionBg() {

        }

        function createSecret() {
            const secret = $(".secret");
            const secretTitle = secret.find(".secret-title");

            ScrollTrigger.create({
                trigger: secret,
                start: "bottom 80%",
                end: "bottom 80%",
                onLeave: function () {
                    gsap.killTweensOf($(".secret-img"));
                    gsap.killTweensOf($(".secret-bg-item"));

                    gsap.to($(".secret-img"), {
                        x: -30, duration: 0.5, filter: "blur(10px)", opacity: 0, ease: Cubic.easeOut, onComplete: () => {
                        }
                    });
                    gsap.to($(".secret-bg-item"), {
                        x: 30,duration: 0.5, filter: "blur(10px)", opacity: 0, ease: Cubic.easeOut, onComplete: () => {
                        }
                    });
                },

                onEnterBack: function () {
                    gsap.killTweensOf($(".secret-img"));
                    gsap.killTweensOf($(".secret-bg-item"));

                    $(".secret-img").css("display", "block");
                    $(".secret-bg-item").css("display", "block");

                    gsap.to($(".secret-img"), { x: 0, duration: 0.5, filter: "blur(0px)", opacity: 1, ease: Cubic.easeOut });
                    gsap.to($(".secret-bg-item"), { x: 0, duration: 0.5, filter: "blur(0px)", opacity: 1, ease: Cubic.easeOut });
                },
            });

            const titleDt = secretTitle.find("dl dt");
            const titleDd = secretTitle.find("dl dd");
            
            ScrollTrigger.create({
                trigger: secret,
                start: "top 80%",
                onEnter: function () {
                    gsap.fromTo(titleDt,
                        { x: -40, opacity: 0 },
                        { x: 0, opacity: 1, ease: Cubic.easeInOut, duration: 0.5 }
                    );
                    gsap.fromTo(titleDd,
                        { x: 40, opacity: 0 },
                        { x: 0, opacity: 1, ease: Cubic.easeInOut, duration: 0.5 }
                    );
                },
                once: true
            });
        }

        function createTutorialStep() {
            const tutorialContents = $(".tutorial-content");

            tutorialContents.each(function (i) {
                const tutorialContent = $(this);
                const tutorialStep = tutorialContent.find(".tutorial-step-bx");
                const stepDt = tutorialStep.find("dl dt");
                const stepDd = tutorialStep.find("dl dd");

                ScrollTrigger.create({
                    trigger: tutorialContent,
                    start: "top 60%",
                    onEnter: function () {
                        gsap.fromTo(stepDt,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
                        );
                        gsap.fromTo(stepDd,
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15 }
                        );
                    },
                    once: true
                });
            });
        }

        function createProgress() {
            const tutorialContents = $(".tutorial-contents");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: tutorialContents,
                    start: "bottom bottom",
                    end: "bottom 80%",
                    scrub: true,
                }
            });

            tl.fromTo($(".tutorial-progress"),
                { opacity: 1, },
                { opacity: 0, ease: "none" },
            );

            const contents = tutorialContents.find(".tutorial-content");
            const progressBx = $(".tutorial-progress");
            const character = progressBx.find(".circle-character").find("li");
            const characterBx = progressBx.find(".circle-character-bx");
            const circleBx = progressBx.find(".circle-line-bx").find(".circle-line");
            const checkBx = progressBx.find(".circle-list-bx").find(".circle-list-item");
            const checkBxText = progressBx.find(".circle-list-bx").find(".circle-list-item__text");

            const w = [0, 25, 50, 75, 100];

            contents.each(function (i, el) {
                ScrollTrigger.create({
                    trigger: el,
                    start: "top center",
                    end: "bottom top",
                    onEnter: function () {
                        showGage(i);
                    },
                    onLeaveBack: function () {
                        const bIdx = i - 1;
                        showGage(bIdx);
                    },
                });

                ScrollTrigger.create({
                    trigger: el,
                    start: "bottom bottom",
                    end: "bottom bottom",
                    onLeave: function () {
                        showAnimation(i, false);
                    },

                    onEnterBack: function () {
                        console.log(i, "EnterBack");
                        showAnimation(i, true);
                    },
                });
            });


            const tutorialAnimationBx = $(".tutorial-animation--items");
            function showAnimation(i, isBoo) {
                if (i === 4) return;
                const animationBx = $(tutorialAnimationBx[i]);

                const animationItems = animationBx.find(".tutorial-animation--items-img");
                const animationCharacters = animationBx.find(".tutorial-animation--object-bx").find( "img" );

                // const listX = [ -40, 40, 40, 40, 40];

                const listX = [
                    [ 40, -40, -40, -40, -40],
                    [ -40, 40, 40, 40, 40],
                    [ -40, 40, 40, 40, 40],
                    [ 40, -40, -40, -40, -40],
                ]

                const allAnimationElements = [
                    ...animationItems.toArray(),
                    ...animationCharacters.toArray()
                ];

                $( allAnimationElements ).each(function (idx, el) {
                    const pX = listX[i][idx];
                    gsap.killTweensOf(el);
                    if( isBoo ){
                        gsap.to(el, { opacity: 1, filter: "blur(0px)", ease: Cubic.easeOut, duration: 0.5, x: 0 });
                    } else {
                        gsap.to(el, { opacity: 0, filter: "blur(0px)", ease: Cubic.easeOut, duration: 0.5, x: pX });
                    }
                });

                // gsap.killTweensOf(animationBx);
                // if (isBoo) {
                //     gsap.to(animationBx, {
                //         opacity: 1, filter: "blur(0px)", ease: Cubic.easeOut, duration: 0.5,
                //     });
                // } else {
                //     gsap.to(animationBx, { opacity: 0, filter: "blur(10px)", ease: Cubic.easeOut, duration: 0.5 });
                // }
            }






            function showGage(idx) {
                character.removeClass("on");
                $(character[idx]).addClass("on");

                checkBx.removeClass("on");
                $(checkBx[idx]).addClass("on");

                checkBxText.removeClass("bold");
                $(checkBxText[idx]).addClass("bold");
                $(checkBxText[idx]).addClass("on");

            }

            const content00 = $(".tutorial-00");
            const content01 = $(".tutorial-01");
            const content02 = $(".tutorial-02");
            const content03 = $(".tutorial-03");

            // 리팩토링: 반복되는 gsap.fromTo를 배열과 반복문으로 처리

            const progressSteps = [
                { from: "75%", to: "100%", trigger: content03 },
                { from: "50%", to: "75%", trigger: content02 },
                { from: "25%", to: "50%", trigger: content01 },
                { from: "0%", to: "25%", trigger: content00 },
            ];

            progressSteps.forEach(step => {
                gsap.fromTo(
                    characterBx,
                    { width: step.from },
                    {
                        width: step.to,
                        scrollTrigger: {
                            trigger: step.trigger,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: true,
                        },
                    }
                );
            });

            progressSteps.forEach(step => {
                gsap.fromTo(
                    circleBx,
                    { width: step.from },
                    {
                        width: step.to,
                        scrollTrigger: {
                            trigger: step.trigger,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: true,
                        },
                    }
                );
            });
        }

        function createTutorialStep0() {
            const tutorialStep1 = $(".tutorial-00");
            const tutorialBg = tutorialStep1.find(".tutorial-bg");
            const tutorialStep1Animation = tutorialStep1.find(".tutorial-animation--items--00");
            const tutorialStep1Bg = tutorialStep1.find("img");

            const object00 = tutorialStep1Animation.find(".tutorial-animation--object-00");
            const object01 = tutorialStep1Animation.find(".tutorial-animation--object-01");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: tutorialBg[0],
                    start: "50% bottom",
                    end: "bottom bottom",
                    scrub: true,
                }
            });

            const imgs = [
                tutorialStep1Bg[0],
                tutorialStep1Bg[1],
                tutorialStep1Bg[2],
                object00[0],
                object01[0],
            ]

            let arrY = [30, 50, 50, 50, 50];
            imgs.forEach(function (el, i) {
                tl.fromTo(
                    el,
                    { y: arrY[i] },
                    { y: 0, ease: "none" },
                    "<",
                );
            });
        }

        function createTutorialStep1() {
            const tutorialStep1 = $(".tutorial-01");
            const tutorialBg = tutorialStep1.find(".tutorial-bg");
            const tutorialStep1Animation = tutorialStep1.find(".tutorial-animation--items--01");
            const tutorialStep1Bg = tutorialStep1.find("img");

            const object00 = tutorialStep1Animation.find(".tutorial-animation--object-10");
            const object01 = tutorialStep1Animation.find(".tutorial-animation--object-11");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: tutorialBg[0],
                    start: "50% bottom",
                    end: "bottom bottom",
                    scrub: true,
                }
            });

            const imgs = [
                tutorialStep1Bg[0],
                tutorialStep1Bg[1],
                tutorialStep1Bg[2],
                object00[0],
                object01[0],
            ]

            let arrY = [30, 50, 50, 50, 50];
            imgs.forEach(function (el, i) {
                tl.fromTo(
                    el,
                    { y: arrY[i] },
                    { y: 0, ease: "none" },
                    "<",
                );
            });
        }

        function createTutorialStep2() {
            const tutorialStep1 = $(".tutorial-02");
            const tutorialBg = tutorialStep1.find(".tutorial-bg");
            const tutorialStep1Animation = tutorialStep1.find(".tutorial-animation--items--02");
            const tutorialStep1Bg = tutorialStep1.find("img");

            const object00 = tutorialStep1Animation.find(".tutorial-animation--object-20");
            const object01 = tutorialStep1Animation.find(".tutorial-animation--object-21");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: tutorialBg[0],
                    start: "50% bottom",
                    end: "bottom bottom",
                    scrub: true,
                }
            });

            const imgs = [
                tutorialStep1Bg[0],
                tutorialStep1Bg[1],
                tutorialStep1Bg[2],
                object00[0],
                object01[0],
            ]

            let arrY = [30, 50, 50, 50, 50];
            imgs.forEach(function (el, i) {
                tl.fromTo(
                    el,
                    { y: arrY[i] },
                    { y: 0, ease: "none" },
                    "<",
                );
            });
        }

        function createTutorialStep3() {
            const tutorialStep1 = $(".tutorial-03");
            const tutorialBg = tutorialStep1.find(".tutorial-bg");
            const tutorialStep1Animation = tutorialStep1.find(".tutorial-animation--items--03");
            const tutorialStep1Bg = tutorialStep1.find("img");

            const object00 = tutorialStep1Animation.find(".tutorial-animation--object-30");
            const object01 = tutorialStep1Animation.find(".tutorial-animation--object-31");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: tutorialBg[0],
                    start: "50% bottom",
                    end: "bottom bottom",
                    scrub: true,
                }
            });

            const imgs = [
                tutorialStep1Bg[0],
                tutorialStep1Bg[1],
                tutorialStep1Bg[2],
                object00[0],
                object01[0],
            ]

            let arrY = [30, 50, 50, 50, 50];
            let arrX = [0, 0, 0, -246, 0];
            let opacitys = [1, 1, 1, 1, 0];
            imgs.forEach(function (el, i) {
                if (i === 4) {
                    return;
                }
                tl.fromTo(
                    el,
                    { y: arrY[i], x: arrX[i], opacity: opacitys[i] },
                    { y: 0, x: 0, opacity: 1, ease: "none" },
                    "<",
                );
            });

            gsap.to(object01[0], {
                scrollTrigger: {
                    trigger: tutorialBg[0],
                    start: "80% bottom",
                    end: "80% bottom",
                    onEnter: function () {
                        gsap.to(object01[0], {
                            opacity: 1,
                            rotationY: 360,
                            ease: "none"
                        });
                    },

                    onEnterBack: function () {
                        gsap.to(object01[0], {
                            opacity: 0,
                            rotationY: 0,
                            ease: "none"
                        });
                    }
                },
            });

        }

        function createTutorialStep4() {
            const tutorialStep1 = $(".tutorial-04");
            const tutorialBg = tutorialStep1.find(".tutorial-bg");
            const tutorialStep1Animation = tutorialStep1.find(".tutorial-animation--items--04");
            const tutorialStep1Bg = tutorialStep1.find("img");

            const object00 = tutorialStep1Animation.find(".tutorial-animation--object-40");
            const object01 = tutorialStep1Animation.find(".tutorial-animation--object-41");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: tutorialBg[0],
                    start: "50% bottom",
                    end: "bottom bottom",
                    scrub: true,
                    onLeave: () => {
                    },
                }
            });

            const imgs = [
                tutorialStep1Bg[0],
                object00[0],
            ]

            let arrY = [30, 0];
            let arrX = [0, 197];
            let opacitys = [1, 1];
            imgs.forEach(function (el, i) {
                tl.fromTo(
                    el,
                    { y: arrY[i], x: arrX[i], opacity: opacitys[i] },
                    { y: 0, x: 0, opacity: 1, ease: "none" },
                    "<",
                );
            });

            tl.fromTo(
                object01[0],
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, ease: "none" },
            );
        }


        function createQuiz() {
            const quiz = $(".quiz");
            const quizBtn = quiz.find(".quiz-item-list input");

            const popup = $(".popup");
            const popupBx = popup.find(".popup-content-list");
            const popupContents = popup.find(".popup-content-list .popup-content");
            const popupCloseBtn = popup.find(".popup-close");

            const dimmed = popup.find(".popup-dimmed");

            const closePopup = () => {
                popup.removeClass("on");
                console.log("Click Handler");
            }

            popupCloseBtn.on("click", closePopup);
            dimmed.on("click", closePopup);
            $(".popup-close-btn").on("click", closePopup);

            quizBtn.on("change", (e) => {
                const parents = $(".quiz-item");
                const parent = $(e.currentTarget).parents(".quiz-item");
                parents.addClass("dimmed");
                parent.removeClass("dimmed");

                const idx = $(parent).index();
                popup.addClass("on");

                gsap.killTweensOf(popupContents);
                popupContents.removeClass("on");

                const popupContent = $(popupContents[idx]);
                popupContent.addClass("on");
                gsap.fromTo(popupBx,
                    { y: 10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.35, ease: Cubic.easeInOut });

                gsap.fromTo(popupCloseBtn,
                    { y: -10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.35, ease: Cubic.easeInOut });

            });
        }

        function createTutorial() {
            const tutorial = $(".tutorial-list");
            const tutorialContents = tutorial.find(".tutorial-contents");
            const tutorialContent = tutorialContents.find(".tutorial-content");

            tutorialContent.each(function (i) {
                const tutorialItem = $(this);

                const tutorialDescription = tutorialItem.find(".swiper-bx");
                const stepBx = tutorialItem.find(".tutorial-step-bx");

                if (i === tutorialContent.length - 1) {
                    return;
                }

                let descTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: tutorialDescription,
                        start: "top center",
                        end: "top 20%",
                        scrub: true,
                    }
                });

                descTl.to(stepBx, { opacity: 0, y: -30, ease: Linear.easeInOut });
                // descTl.to(tutorialItem.find( ".tutorial-dimmed" ), { opacity: 1, ease: Linear.easeInOut });
            });

            const tutorialSwiper = $(".tutorial-desc-swiper");
            tutorialSwiper.each((idx, el) => {
                const item = $(el);
                new Swiper(item[0], {
                    nested: true,
                    touchStartPreventDefault: false,
                    touchReleaseOnEdges: true,
                    slidesPerView: "auto",
                    centeredSlides: true,
                    spaceBetween: 15,
                    lazy: false,
                    preloadImages: true,
                    updateOnImagesReady: true,
                    pagination: {
                        el: '.tutorial-desc-swiper .swiper-pagination',
                        clickable: true,
                    },
                    on: {
                        slideChange: (e) => {
                            const index = e.activeIndex;
                            const swiperDiv = $(e.el);

                            const activeSwiper = swiperDiv.find(".swiper-slide");
                            activeSwiper.removeClass("on");
                            $(activeSwiper[index]).addClass("on");

                            console.log($(activeSwiper[index])[0]);
                        }
                    }
                });
            });
        }

        function createVisual() {
            const visual = $(".visual");
            const visualKey = visual.find(".visual-key");
            const visualKeyBx = visual.find(".visual-key-bx");
            const visualKeyImg = visual.find(".visual-key-img");
            const visualKeyBgColor = visual.find(".visual-key-bg-color");
            const visualKeyBg = visual.find(".visual-key-bg");

            const visualKeyContent = visual.find(".visual-key-content");

            const visualLogo = visual.find(".visual-logo-bx").find("img");
            const visualLogoText = visual.find(".visual-logo-bx").find("span");

            const visualImgs = $(".visual").find("img");
            let loadedCount = 0;
            const totalImgs = visualImgs.length;
            let isShow = false;
            function onAllImagesLoaded() {
                gsap.fromTo(visualLogo,
                    { opacity: 0, y: -15 },
                    { opacity: 1, y: 0, duration: 1.5, ease: Cubic.easeInOut }
                )

                gsap.fromTo(visualLogoText,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 1.5, ease: Cubic.easeInOut }
                )

                gsap.fromTo(visualKeyContent,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 1.5, ease: Cubic.easeInOut }
                )

                gsap.fromTo(visualKeyImg,
                    { opacity: 0, rotationY: 1 },
                    {
                        opacity: 1, rotationY: 360, duration: 2.5, ease: Cubic.easeInOut, delay: 1,
                        onComplete: () => {
                            function showVisualStart() {
                                isShow = true;
                                if (isShow) {
                                    window.removeEventListener("touchstart", showVisualStart);
                                    window.removeEventListener("mousedown", showVisualStart);

                                    showVisual();

                                    setTimeout(() => {
                                        $("body").removeClass("hidden");
                                    }, 2000);
                                }
                            }

                            window.addEventListener("touchstart", showVisualStart);
                            window.addEventListener("mousedown", showVisualStart);
                        }
                    }
                )
            }

            visualImgs.each(function (idx, el) {
                if (el.complete && el.naturalWidth !== 0) {
                    loadedCount++;
                    if (loadedCount === totalImgs) {
                        onAllImagesLoaded();
                    }
                } else {
                    $(el).one("load", function () {
                        loadedCount++;
                        if (loadedCount === totalImgs) {
                            onAllImagesLoaded();
                        }
                    }).one("error", function () {
                        loadedCount++;
                        if (loadedCount === totalImgs) {
                            onAllImagesLoaded();
                        }
                    });
                }
            });

            function showVisual() {

                function showHidden() {
                    gsap.to(visualLogo, { opacity: 0, y: -20, duration: 0.6, ease: Cubic.easeInOut });
                    gsap.to(visualLogoText, { opacity: 0, y: 20, duration: 0.6, ease: Cubic.easeInOut });

                    gsap.to(visualKeyBx, { scale: 15, duration: 2.5, ease: Cubic.easeInOut });
                    gsap.to(visualKeyImg, { opacity: 0, duration: 1, ease: Cubic.easeOut });
                    gsap.to(visualKeyBx, { opacity: 0, duration: 1, ease: Cubic.easeInOut, delay: 1.5 });
                    gsap.to(visualKeyBgColor, { opacity: 0, duration: 1, ease: Cubic.easeInOut, delay: 1.5 });
                    gsap.to(visualKeyBg, { opacity: 0, duration: 2.5, ease: Cubic.easeInOut });


                    gsap.fromTo($(".visual-introduce__content").find("dl"),
                        { opacity: 0, y: 20, },
                        { opacity: 1, y: 0, duration: 0.75, ease: Cubic.easeInOut, delay: 1.25 }
                    )

                    gsap.fromTo($(".visual-introduce__content-key"),
                        { opacity: 0, y: -20 },
                        { opacity: 1, y: 0, duration: 0.75, ease: Cubic.easeInOut, delay: 1.5 }
                    )

                    gsap.fromTo($(".visual-introduce__journey"),
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.75, ease: Cubic.easeInOut, delay: 1.25 }
                    )
                }

                gsap.to(visualKeyImg.find("img"), { y: '150%', duration: 1, ease: Cubic.easeInOut });
                setTimeout(() => {
                    showHidden();
                }, 550);


            }
        }

        return {
            Init
        }
    }

    $(document).ready(function () {
        if ($(".hands-on-tour2")[0]) {
            App.sub2 = sub2();
            App.sub2.Init();
        }
    });

})();
