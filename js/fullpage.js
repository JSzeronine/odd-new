

(function () {

    const fullpage = () => {

        function Init() {
            if ($("hidden")[0]) {
                function resetScroll() {
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0;
                    }, 10);
                }

                window.addEventListener("DOMContentLoaded", resetScroll);
                window.addEventListener("load", resetScroll);
            }

            createVisual();
            createQuiz();
            createStep();
            createStepContentScroll();

            // createScroll();
        }

        function createStep() {
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
                });
            });
        }

        let _isContentScroll = false;
        function createStepContentScroll() {
            $(".tutorial-desc-item__text").find("dd").on("scroll", function () {
                _isContentScroll = true;
            });
        }

        let sceneIndex = 0;
        let sceneType = "";

        let iC = false;

        let isScroll = false;
        function createScroll() {
            if (iC === false) change(sceneIndex, "up");
            iC = true;

            let sX = 0;
            let sY = 0;

            let mX = 0;
            let mY = 0;

            $(window).off("touchstart").on("touchstart", function (e) {
                let { clientX, clientY } = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

                sX = clientX;
                sY = clientY;
            });

            $(window).off("touchend").on("touchend", function (e) {
                if (isScroll) return;
                if (_isContentScroll) {
                    _isContentScroll = false;
                    return;
                }

                let { clientX, clientY } = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

                mX = Math.abs(clientX - sX);
                mY = Math.abs(clientY - sY);

                if (mX > mY) {
                    console.log("swiper");
                } else {
                    if (mY < 10) return;

                    if (sY > clientY) {
                        sceneType = "up";
                        sceneIndex++;
                    } else {
                        sceneType = "down";
                        sceneIndex--;
                    }

                    if (sceneIndex < 0) {
                        sceneIndex = 0;
                        return;
                    } else if (sceneIndex > 11) {
                        sceneIndex = 11;
                        return;
                    }

                    change(sceneIndex, sceneType);
                    setTimeout(() => {
                        isScroll = false;
                    }, 1000);

                    isScroll = true;
                }
            });

        }

        function change(idx, type) {
            console.log("SHOW ===========", idx, type);

            App.fullPageMotion.skyBg(idx);
            if (type === "up") {
                switch (idx) {
                    case 0:
                        break;
                    case 1:
                        App.fullPageMotion.inSecret();
                        App.fullPageMotion.exitVisual();
                        break;
                    case 2:
                        App.fullPageMotion.exitSecret();
                        App.fullPageMotion.inStep0();
                        App.fullPageMotion.inProgress();
                        break;
                    case 3:
                        App.fullPageMotion.inStep0Swiper();
                        App.fullPageMotion.showProgress(0.5, 0, false);
                        break;
                    case 4:
                        App.fullPageMotion.exitStep0();
                        App.fullPageMotion.exitStep0Swiper();
                        App.fullPageMotion.inStep1();
                        App.fullPageMotion.showProgress(1, 1, true);
                        break;
                    case 5:
                        App.fullPageMotion.inStep1Swiper();
                        App.fullPageMotion.showProgress(1.5, 1, false);
                        break;
                    case 6:
                        App.fullPageMotion.exitStep1();
                        App.fullPageMotion.exitStep1Swiper();
                        App.fullPageMotion.inStep2();
                        App.fullPageMotion.showProgress(2, 2, true);
                        break;
                    case 7:
                        App.fullPageMotion.inStep2Swiper();
                        App.fullPageMotion.showProgress(2.5, 2, false);
                        break;
                    case 8:
                        App.fullPageMotion.exitStep2();
                        App.fullPageMotion.exitStep2Swiper();
                        App.fullPageMotion.inStep3();
                        App.fullPageMotion.showProgress(3, 3, true);
                        break;
                    case 9:
                        App.fullPageMotion.inStep3Swiper();
                        App.fullPageMotion.showProgress(3.5, 3, false);
                        break;
                    case 10:
                        App.fullPageMotion.exitStep3();
                        App.fullPageMotion.exitStep3Swiper();
                        App.fullPageMotion.inStep4();
                        App.fullPageMotion.showProgress(4, 3, true);
                        break;
                    case 11:
                        App.fullPageMotion.exitStep4();
                        App.fullPageMotion.inQuiz();
                        App.fullPageMotion.exitProgress();
                        break;
                }
            } else {
                switch (idx) {
                    case 0:
                        App.fullPageMotion.inVisual();
                        App.fullPageMotion.exitSecret();
                        break;
                    case 1:
                        App.fullPageMotion.inSecret();
                        App.fullPageMotion.exitStep0();
                        App.fullPageMotion.exitProgress();
                        break;

                    case 2:
                        App.fullPageMotion.exitStep0Swiper();
                        App.fullPageMotion.showProgress(0, 0, true);
                        break;
                    case 3:
                        App.fullPageMotion.exitStep1();
                        App.fullPageMotion.inStep0();
                        App.fullPageMotion.inStep0Swiper();
                        App.fullPageMotion.showProgress(0.5, 0, false);
                        break;

                    case 4:
                        App.fullPageMotion.exitStep1Swiper();
                        App.fullPageMotion.showProgress(1, 0, true);
                        break;
                    case 5:
                        App.fullPageMotion.exitStep2();
                        App.fullPageMotion.inStep1();
                        App.fullPageMotion.inStep1Swiper();
                        App.fullPageMotion.showProgress(1.5, 1, false);
                        break;

                    case 6:
                        App.fullPageMotion.exitStep2Swiper();
                        App.fullPageMotion.showProgress(2, 1, true);
                        break;
                    case 7:
                        App.fullPageMotion.exitStep3();
                        App.fullPageMotion.inStep2();
                        App.fullPageMotion.inStep2Swiper();
                        App.fullPageMotion.showProgress(2.5, 2, false);
                        break;

                    case 8:
                        App.fullPageMotion.exitStep3Swiper();
                        App.fullPageMotion.showProgress(3, 2, true);
                        break;
                    case 9:
                        App.fullPageMotion.exitStep4();
                        App.fullPageMotion.inStep3();
                        App.fullPageMotion.inStep3Swiper();
                        App.fullPageMotion.showProgress(3.5, 3, false);
                        break;

                    case 10:
                        App.fullPageMotion.exitQuiz();
                        App.fullPageMotion.inStep4(0);
                        App.fullPageMotion.inProgress();
                        break;
                }
            }
        }

        function createQuiz() {
            const quiz = $(".quiz");
            const quizBtn = quiz.find(".quiz-item-list input");
            const quizItem = quiz.find(".quiz-item");
            // quizItem.on( "touchstart", function(){
            //     quizItem.removeClass( "on" );
            //     $( this ).addClass( "on" );
            // });

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

                setTimeout(() => {
                    popup.addClass("on");
                    gsap.fromTo(popup.find(".popup-inner"),
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.75, ease: Cubic.easeInOut })
                }, 500);

                quizItem.removeClass("on");
                quizItem.off("touchstart");
                $("body").off("touchend");

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

                $(".quiz-result-icon").addClass("on");

                quizBtn.attr("disabled", true);
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
                            showVisual();

                            setTimeout(() => {
                                $("body").removeClass("hidden");
                                createScroll();
                            }, 2000);
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

                gsap.to(visualKeyImg.find("img"), { y: '100%', opacity: 0, duration: 1, ease: Cubic.easeInOut });
                setTimeout(() => {
                    showHidden();
                }, 550);


            }
        }

        return {
            Init
        }
    }


    $(document).ready(() => {
        if ($(".fullpage")[0]) {
            App.fullpage = fullpage();
            App.fullpage.Init();
        }
    });


})();