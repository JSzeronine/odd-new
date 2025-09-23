

(function () {

    const fullPageMotion = function () {
        let _visual;
        let _secret;
        let _stepList;
        let _quiz;
        let _skyBg;
        let _skyCould;
        let _bgY = [];

        let visual;
        let visualVideo;
        let visualIntroduce;
        function Init() {
            _visual = $(".visual");

            visual = _visual;
            visualVideo = visual.find(".visual-introduce__video");
            visualIntroduce = visual.find(".visual-introduce");

            _secret = $(".secret");
            _stepList = $(".step-list");
            _quiz = $(".quiz");
            _skyBg = $(".sky-bg-bx").find(".sky-bg-img");
            _skyCould = $(".sky-bg-bx").find(".sky-could");

            const h = $(window).innerHeight();
            _bgY = [
                0,
                0,
                h,
                h,
                h * 2,
                h * 2,
                h * 3,
                h * 3,
                h * 4,
                h * 4,
                h * 5,
            ]
        }

        function skyBg(idx) {
            gsap.killTweensOf(_skyBg);
            gsap.killTweensOf(_skyCould);

            gsap.to(_skyBg, { duration: 1.5, y: _bgY[idx], ease: Cubic.easeInOut });
            gsap.to(_skyCould, { duration: 2, y: _bgY[idx], ease: Cubic.easeInOut });
        }

        function inVisual() {
            const delayTime = 0;

            _visual.css("display", "flex");

            gsap.to(visual, { opacity: 1, duration: 1, ease: Cubic.easeInOut, delay: delayTime });
            gsap.to(visualVideo, { duration: 1, scale: 1, ease: Cubic.easeInOut, delay: delayTime });
            gsap.to(visualIntroduce, { duration: 1, scale: 1, ease: Cubic.easeInOut, delay: delayTime });
        }

        function exitVisual() {

            gsap.to(visual, { alpha: 0, duration: 1, ease: Cubic.easeInOut });
            gsap.to(visualVideo, { duration: 1, scale: 0.95, ease: Cubic.easeInOut });
            gsap.to(visualIntroduce, {
                duration: 1, scale: 1.2, ease: Cubic.easeInOut, onComplete: () => {
                    _visual.css("display", "none");
                }
            });
        }

        function inSecret() {
            const delayTime = 0.5;

            _secret.addClass("on");

            const title = _secret.find(".secret-title");
            const titleDt = title.find("dl dt");
            const titleDd = title.find("dl dd");

            const chicken = _secret.find(".secret-img");
            const bgItem = _secret.find(".secret-bg-item");

            gsap.fromTo(titleDt,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            );

            gsap.fromTo(titleDd,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            gsap.fromTo(chicken,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            gsap.fromTo(bgItem,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )
        }

        function exitSecret() {
            _secret.removeClass("on");

            const title = _secret.find(".secret-title");
            const titleDt = title.find("dl dt");
            const titleDd = title.find("dl dd");

            const chicken = _secret.find(".secret-img");
            const bgItem = _secret.find(".secret-bg-item");

            gsap.fromTo(titleDt,
                { opacity: 1, x: 0 },
                { opacity: 0, x: -20, duration: 1, ease: Cubic.easeInOut }
            );

            gsap.fromTo(titleDd,
                { opacity: 1, x: 0 },
                { opacity: 0, x: 20, duration: 1, ease: Cubic.easeInOut }
            )

            gsap.fromTo(chicken,
                { opacity: 1, x: 0 },
                { opacity: 0, y: 20, duration: 1, ease: Cubic.easeInOut }
            )

            gsap.fromTo(bgItem,
                { opacity: 1, x: 0 },
                { opacity: 0, y: 20, duration: 1, ease: Cubic.easeInOut }
            )
        }

        function inProgress() {
            gsap.fromTo($(".tutorial-progress-bx"),
                { y: -40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: Cubic.easeInOut, delay: 0.5, });
        }

        function exitProgress() {
            gsap.fromTo($(".tutorial-progress-bx"),
                { y: 0, opacity: 1 },
                { y: -40, opacity: 0, duration: 1.5, ease: Cubic.easeOut });

        }

        function showProgress(idx, characterIdx, isIn) {
            const progressBx = $(".tutorial-progress-bx");
            const characterBx = progressBx.find(".circle-character-bx");
            const circleBx = progressBx.find(".circle-line-bx").find(".circle-line");
            const character = progressBx.find(".circle-character").find("li");
            const checkBx = progressBx.find(".circle-list-bx").find(".circle-list-item");
            const checkBxText = progressBx.find(".circle-list-bx").find(".circle-list-item__text");

            const w = `${25 * idx}%`;

            gsap.to(characterBx, { width: w, duration: 1.5, ease: Cubic.easeInOut });
            gsap.to(circleBx, {
                width: w, duration: 1.5, ease: Cubic.easeInOut, onComplete: () => {
                    if (isIn) {
                        console.log(characterIdx);

                        character.removeClass("on");
                        $(character[characterIdx]).addClass("on");

                        checkBx.removeClass("on");
                        $(checkBx[idx]).addClass("on");
                    }

                    $(checkBxText[idx]).addClass("bold");
                    $(checkBxText[idx]).addClass("on");
                }
            });

            checkBxText.removeClass("bold");
        }

        function inStep0() {
            const delayTime = 0.5;
            $(_stepList[0]).addClass("on");

            const stepTitle = $(_stepList[0]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");
            const animationItems = $(_stepList[0]).find(".tutorial-animation--items--00").find("img");

            gsap.set(stepTitleDt, { opacity: 0 });
            gsap.set(stepTitleDd, { opacity: 0 });
            gsap.set(animationItems, { opacity: 0 });

            gsap.fromTo(stepTitleDt,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            const inPostion = {
                x: [-30, 30, 0, 0, 0],
                y: [0, 0, 30, 30, 30]
            }

            animationItems.each(function (i, el) {
                gsap.fromTo(el,
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i] },
                    { opacity: 1, x: 0, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
                )
            })
        }

        function inStep0Swiper() {
            $(_stepList[0]).find(".tutorial-description").addClass("on");

            const swiper = $(_stepList[0]).find(".tutorial-description");

            swiper.css("visibility", "visible");
            swiper.css("pointer-events", "auto");

            gsap.fromTo(swiper,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut });
        }

        function exitStep0() {
            $(_stepList[0]).removeClass("on");

            const stepTitle = $(_stepList[0]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");

            gsap.fromTo(stepTitleDt,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            const animationItems = $(_stepList[0]).find(".tutorial-animation--items--00").find("img");
            const inPostion = {
                x: [-30, 30, 0, 0, 0],
                y: [0, 0, 30, 30, 30]
            }

            animationItems.each(function (i, el) {
                gsap.fromTo(el,
                    { opacity: 1, x: 0, y: 0 },
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i], duration: 1, ease: Cubic.easeOut }
                )
            })
        }

        function exitStep0Swiper() {
            $(_stepList[0]).find(".tutorial-description").removeClass("on");

            const swiper = $(_stepList[0]).find(".tutorial-description");

            gsap.fromTo(swiper,
                { opacity: 1, y: 0 },
                {
                    opacity: 0, y: 0, duration: 1, ease: Cubic.easeInOut, onComplete: () => {
                        swiper.css("visibility", "hidden");
                        swiper.css("pointer-events", "none");
                    }
                });
        }

        function inStep1() {
            const delayTime = 0.5;
            $(_stepList[1]).addClass("on");

            const stepTitle = $(_stepList[1]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");
            const animationItems = $(_stepList[1]).find(".tutorial-animation--items--01").find("img");

            gsap.set(stepTitleDt, { opacity: 0 });
            gsap.set(stepTitleDd, { opacity: 0 });
            gsap.set(animationItems, { opacity: 0 });

            gsap.fromTo(stepTitleDt,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            const inPostion = {
                x: [-30, 30, 0, 0, 0],
                y: [0, 0, 30, 30, 30]
            }

            animationItems.each(function (i, el) {
                gsap.fromTo(el,
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i] },
                    { opacity: 1, x: 0, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
                )
            })
        }

        function inStep1Swiper() {
            $(_stepList[1]).find(".tutorial-description").addClass("on");

            const swiper = $(_stepList[1]).find(".tutorial-description");

            swiper.css("visibility", "visible");
            swiper.css("pointer-events", "auto");

            gsap.fromTo(swiper,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut });
        }

        function exitStep1() {
            $(_stepList[1]).removeClass("on");

            const stepTitle = $(_stepList[1]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");

            gsap.fromTo(stepTitleDt,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            const animationItems = $(_stepList[1]).find(".tutorial-animation--items--01").find("img");
            const inPostion = {
                x: [-30, 30, 0, 0, 0],
                y: [0, 0, 30, 30, 30]
            }

            animationItems.each(function (i, el) {
                gsap.fromTo(el,
                    { opacity: 1, x: 0, y: 0 },
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i], duration: 1, ease: Cubic.easeOut }
                )
            })
        }

        function exitStep1Swiper() {
            $(_stepList[1]).find(".tutorial-description").removeClass("on");

            const swiper = $(_stepList[1]).find(".tutorial-description");

            gsap.fromTo(swiper,
                { opacity: 1, y: 0 },
                {
                    opacity: 0, y: 0, duration: 1, ease: Cubic.easeInOut, onComplete: () => {
                        swiper.css("visibility", "hidden");
                        swiper.css("pointer-events", "none");
                    }
                });
        }

        function inStep2() {
            const delayTime = 0.5;
            $(_stepList[2]).addClass("on");

            const stepTitle = $(_stepList[2]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");
            const animationItems = $(_stepList[2]).find(".tutorial-animation--items--02").find("img");

            gsap.set(stepTitleDt, { opacity: 0 });
            gsap.set(stepTitleDd, { opacity: 0 });
            gsap.set(animationItems, { opacity: 0 });

            gsap.fromTo(stepTitleDt,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            const inPostion = {
                x: [-30, 30, 0, 0, 0],
                y: [0, 0, 30, 30, 30]
            }

            animationItems.each(function (i, el) {
                gsap.fromTo(el,
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i] },
                    { opacity: 1, x: 0, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
                )
            })
        }

        function inStep2Swiper() {
            $(_stepList[2]).find(".tutorial-description").addClass("on");

            const swiper = $(_stepList[2]).find(".tutorial-description");

            swiper.css("visibility", "visible");
            swiper.css("pointer-events", "auto");

            gsap.fromTo(swiper,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut });
        }

        function exitStep2() {
            $(_stepList[2]).removeClass("on");

            const stepTitle = $(_stepList[2]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");

            gsap.fromTo(stepTitleDt,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            const animationItems = $(_stepList[2]).find(".tutorial-animation--items--02").find("img");
            const inPostion = {
                x: [-30, 30, 0, 0, 0],
                y: [0, 0, 30, 30, 30]
            }

            animationItems.each(function (i, el) {
                gsap.fromTo(el,
                    { opacity: 1, x: 0, y: 0 },
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i], duration: 1, ease: Cubic.easeOut }
                )
            })
        }

        function exitStep2Swiper() {
            $(_stepList[2]).find(".tutorial-description").removeClass("on");

            const swiper = $(_stepList[2]).find(".tutorial-description");

            gsap.fromTo(swiper,
                { opacity: 1, y: 0 },
                {
                    opacity: 0, y: 0, duration: 1, ease: Cubic.easeInOut, onComplete: () => {
                        swiper.css("visibility", "hidden");
                        swiper.css("pointer-events", "none");
                    }
                });
        }

        function inStep3() {
            const delayTime = 0.5;
            $(_stepList[3]).addClass("on");

            const stepTitle = $(_stepList[3]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");
            const animationItems = $(_stepList[3]).find(".tutorial-animation--items--03").find("img");

            gsap.set(stepTitleDt, { opacity: 0 });
            gsap.set(stepTitleDd, { opacity: 0 });
            gsap.set(animationItems, { opacity: 0 });

            gsap.fromTo(stepTitleDt,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            const inPostion = {
                x: [0, 30, -30, -60, 0],
                y: [30, 0, 0, 0, 0]
            }

            animationItems.each(function (i, el) {
                if (i === 4) {
                    return;
                }

                gsap.fromTo(el,
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i] },
                    { opacity: 1, x: 0, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
                )
            });

            gsap.fromTo(animationItems[4],
                { opacity: 0, rotationY: 0 },
                { opacity: 1, rotationY: 360, duration: 0.75, ease: "none", delay: 1.25 }
            )
        }

        function inStep3Swiper() {
            $(_stepList[3]).find(".tutorial-description").addClass("on");

            const swiper = $(_stepList[3]).find(".tutorial-description");

            swiper.css("visibility", "visible");
            swiper.css("pointer-events", "auto");

            gsap.fromTo(swiper,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut });
        }

        function exitStep3() {
            $(_stepList[3]).removeClass("on");

            const stepTitle = $(_stepList[3]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");

            gsap.fromTo(stepTitleDt,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            const animationItems = $(_stepList[3]).find(".tutorial-animation--items--03").find("img");
            const inPostion = {
                x: [0, 30, -30, -60, 0],
                y: [30, 0, 0, 0, 0]
            }

            animationItems.each(function (i, el) {
                gsap.fromTo(el,
                    { opacity: 1, x: 0, y: 0 },
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i], duration: 1, ease: Cubic.easeOut }
                )
            })
        }

        function exitStep3Swiper() {
            $(_stepList[3]).find(".tutorial-description").removeClass("on");

            const swiper = $(_stepList[3]).find(".tutorial-description");

            gsap.fromTo(swiper,
                { opacity: 1, y: 0 },
                {
                    opacity: 0, y: 0, duration: 1, ease: Cubic.easeInOut, onComplete: () => {
                        swiper.css("visibility", "hidden");
                        swiper.css("pointer-events", "none");
                    }
                });
        }

        function inStep4($delayTime = 0.5) {
            const delayTime = $delayTime;
            $(_stepList[4]).addClass("on");

            const stepTitle = $(_stepList[4]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");
            const animationItems = $(_stepList[4]).find(".tutorial-animation--items--04").find("img");

            gsap.set(stepTitleDt, { opacity: 0 });
            gsap.set(stepTitleDd, { opacity: 0 });
            gsap.set(animationItems, { opacity: 0 });

            gsap.fromTo(stepTitleDt,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
            )

            const inPostion = {
                x: [0, 50],
                y: [30, 0],
            }

            animationItems.each(function (i, el) {
                if (i === 2) {
                    return;
                }

                gsap.fromTo(el,
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i] },
                    { opacity: 1, x: 0, y: 0, duration: 1, ease: Cubic.easeInOut, delay: delayTime }
                )
            });

            gsap.fromTo(animationItems[2],
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0, duration: 0.5, ease: "none", delay: 1.25 }
            )
        }

        function exitStep4() {
            $(_stepList[4]).removeClass("on");

            const stepTitle = $(_stepList[4]).find(".tutorial-step-bx");
            const stepTitleDt = stepTitle.find("dl dt");
            const stepTitleDd = stepTitle.find("dl dd");

            gsap.fromTo(stepTitleDt,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            gsap.fromTo(stepTitleDd,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeOut }
            )

            const animationItems = $(_stepList[4]).find(".tutorial-animation--items--04").find("img");
            const inPostion = {
                x: [0, 50, 0],
                y: [30, 0, 0],
            }

            animationItems.each(function (i, el) {
                gsap.fromTo(el,
                    { opacity: 1, x: 0, y: 0 },
                    { opacity: 0, x: inPostion.x[i], y: inPostion.y[i], duration: 1, ease: Cubic.easeOut }
                )
            })
        }
        

        function inQuiz() {
            _quiz.addClass("on");

            gsap.fromTo(_quiz,
                { opacity: 0, y: 0 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut }
            )

            const titleBx = _quiz.find(".quiz-title");

            gsap.fromTo(titleBx,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut }
            )

            const itemList = _quiz.find(".quiz-item-list");
            const item = itemList.find(".quiz-item");
            const itemImg = item.find(".quiz-item-img");

            gsap.fromTo( itemImg, 
                { scale: 1.5},
                { scale: 1, duration: 1, ease: Cubic.easeInOut }
            )


            const productDescription = _quiz.find(".quiz-product-description");
            gsap.fromTo(productDescription,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut }
            )

            const btn = _quiz.find(".quiz-btn-bx");
            gsap.fromTo(btn,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: Cubic.easeInOut }
            )
        }

        function exitQuiz() {
            _quiz.addClass("on");

            gsap.fromTo(_quiz,
                { opacity: 1, y: 0 },
                { opacity: 0, y: 0, duration: 1, ease: Cubic.easeInOut }
            )

            const titleBx = _quiz.find(".quiz-title");
            gsap.fromTo(titleBx,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 1, ease: Cubic.easeInOut }
            )

            const itemList = _quiz.find(".quiz-item-list");
            const item = itemList.find(".quiz-item");
            const itemImg = item.find(".quiz-item-img");

            const productDescription = _quiz.find(".quiz-product-description");
            gsap.fromTo(productDescription,
                { opacity: 1, y: 0 },
                { opacity: 0, y: 20, duration: 1, ease: Cubic.easeInOut }
            )

            const btn = _quiz.find(".quiz-btn-bx");
            gsap.fromTo(btn,
                { opacity: 1, y: 0 },
                { opacity: 0, y: 20, duration: 1, ease: Cubic.easeInOut }
            )
        }


        return {
            Init,
            inVisual,
            exitVisual,
            inSecret,
            exitSecret,
            inStep0,
            inStep0Swiper,
            exitStep0,
            inStep1,
            inStep1Swiper,
            exitStep1,
            inStep2,
            inStep2Swiper,
            exitStep2,
            inStep3,
            inStep3Swiper,
            exitStep3,
            inStep4,
            exitStep4,
            inQuiz,
            exitQuiz,
            exitStep0Swiper,
            exitStep1Swiper,
            exitStep2Swiper,
            exitStep3Swiper,
            skyBg,
            inProgress,
            exitProgress,
            showProgress,
        }
    }

    $(document).ready(function () {
        if ($(".fullpage")[0]) {
            App.fullPageMotion = fullPageMotion();
            App.fullPageMotion.Init();
        }
    });

})();