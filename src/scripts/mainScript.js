import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);
import image1 from "../assets/images/products/image1.png";
import image2 from "../assets/images/products/image2.png";
import image3 from "../assets/images/products/image3.png";
import image4 from "../assets/images/products/image4.png";
import headphone1 from "../assets/images/products/headphones1.png";
import headphone2 from "../assets/images/products/headphones2.png";
import headphone3 from "../assets/images/products/headphones3.png";

export default class MainScript {
    constructor() {
        //initialize menu function, variables and animations
        this.animateBurger();
        this.pageAnimations();
        this.menu_status = false;
        this.setdiscover();
        this.current_slide = 0;
        this.slide_data = [headphone1, headphone2, headphone3];
        this.slide_buttons = ["#image-id-1", "#image-id-2", "#image-id-3"];
        this.slider_btn = $(".slider-btn")
        this.feature_name = "";
        this.product_version_data = [
            [
                "M23",
                "$45.00",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etla pariatur.",
                image1,
            ],
            [
                "M45",
                "$24.50",
                "elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing incididunt ut labore etla pariatur.",
                image2,
            ],
            [
                "M4",
                "$65.60",
                "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etla pariatur.",
                image3,
            ],
            [
                "MT5",
                "$15.50",
                "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etla pariatur.",
                image4,
            ],
        ];

        //hero section buttons
        this.slide_buttons.map(
            (item, index) => {
                $(item).on("click", () => this.slide(index,true));
            }
        );

        //menu and links buttons
        $("#burger-menu").on("click",()=>this.overLayMenu());
        $(".links a").on("click",()=>this.overLayMenu());

        //menu icon animation
        this.anime_menu = gsap.timeline({ reversed: true });
        this.anime_menu.from("#menu", {
            opacity: 0,
            duration: 0.3,
            onStart: function () {
                $("#menu").css("display", "flex");
            }.bind(this),
            onReverseComplete: function () {
                $("#menu").css("display", "none");
            }.bind(this),
        });

        //products next and previous
        this.current_product = 0;
        $("#product-next").on("click", () => {
            this.setProducts(+1);
        });
        $("#product-prev").on("click", () => {
            this.setProducts(-1);
        });
        $(".battery").css("background-color", "#EA6C41");
    }

    overLayMenu() {
        //burger toggle
        if ($("#menu").css("display") == "none") {
            this.anim_burger.restart();
            $("body").css("overflow", "hidden");
            $(window).scrollTop();
            this.anime_menu.restart();
        } else {
            this.anim_burger.reverse();
            this.anime_menu.reverse();
            $("body").css("overflow", "scroll");
        }
    }

    animateBurger() {
        //burger animation
        let d = 0.3;
        this.anim_burger = gsap.timeline({ paused: true, reversed: true });
        this.anim_burger.to(
            " .burgertop",
            {
                duration: d,
                rotationZ: -40,
                x: -5,
                transformOrigin: "right top",
            },
            "rotate"
        );
        this.anim_burger.to(
            " .burgerbot",
            { opacity: 0, duration: d },
            "rotate"
        );
        this.anim_burger.to(
            " .burgermid",
            {
                duration: d,
                rotationZ: 38,
                x: -5,
                transformOrigin: "right bottom",
            },
            "rotate"
        );
    }

    pageAnimations() {
        // animations for the whole page
        this.anime_scroll_down = gsap
            .timeline({ repeat: -1 })
            .from(".scroll-down p", { duration: 1, opacity: 1, x: 8 }, "slidm")
            .to(".scroll-down p", { duration: 1, opacity: 1, x: 8 }, "slideto");

        // hero animation
        gsap.timeline({
            reversed: true,
            scrollTrigger: {
                trigger: ".hero-container",
                start: "center +=30%)",
                end: "bottom +=20%",
                scrub: 1,
                duration: 3,
                toggleActions: "play play play play",
            },
        })
            .fromTo(
                "#hero-text img",
                { opacity: 1 },
                { scale: 0, opacity: 0, duration: 3 },
                "hero"
            )
            .fromTo(
                "#hero-text h2",
                { x: 0, opacity: 1 },
                { x: -300, opacity: 0, duration: 3 },
                "hero"
            )
            .fromTo(
                "#hero-text p",
                { x: 0, opacity: 1 },
                { x: 50, opacity: 0, duration: 3 },
                "hero"
            )
            .fromTo(
                "#hero-text button",
                { x: 0, opacity: 1 },
                { x: -30, opacity: 0, ease: "back", duration: 3 },
                "hero"
            );
            
        //new device animation
        gsap
            .timeline({
                reversed: true,
                scrollTrigger: {
                    trigger: "#discover",
                    start: "top bottom",
                    end: "bottom +=80%",
                    scrub: 1,
                    toggleActions: "play play play play",
                },
            })

            .from(
                "#discover-heading",
                { x: -300, opacity: 0, ease: "power4.inOut", duration: 3 },
                "discover"
            )
            .from(
                "#discover-img",
                { scale: 0, opacity: 0, ease: "power4.inOut", duration: 3 },
                "discover"
            )
            .from(
                ".features .left",
                { x: 300, opacity: 0, ease: "power4.inOut", duration: 3 },
                "discover"
            )
            .from(
                ".features .right",
                {
                    x: 300,
                    opacity: 0,
                    delay: 0.2,
                    ease: "power4.inOut",
                    duration: 3,
                },
                "discover"
            );

        //speaker section animation
        gsap.timeline({
            scrollTrigger: {
                trigger: ".speakers-container",
                start: "top 50%",
                end: "bottom 80%",
                scrub: 1,
                duration: 3,
            },
        })
            .from(
                ".speaker-last",
                { x: 300, opacity: 0, duration: 3 },
                "speaker"
            )
            .from(
                ".speaker-first",
                { x: -300, opacity: 0, duration: 3 },
                "speaker"
            )
            .from(
                ".speaker-content img",
                { scale: 0, opacity: 0, ease: "power4.inOut", duration: 3 },
                "speaker"
            )
            .from(
                ".speaker-content h2",
                { y: 30, opacity: 0, ease: "power4.inOut", duration: 3 },
                "speaker"
            )
            .from(
                ".speaker-content a",
                {
                    y: 10,
                    opacity: 0,
                    ease: "power4.inOut",
                    ease: "back",
                    duration: 3,
                },
                "speaker"
            );

        //product animation
        gsap.timeline({
            reversed: true,
            scrollTrigger: {
                trigger: ".products",
                start: "top bottom",
                end: "bottom +=80%",
                scrub: 1,
                duration: 3,
                toggleActions: "play play play play",
            },
        })
            .from(
                ".products button ",
                { opacity: 0, ease: "power4.inOut", duration: 3 },
                "products"
            )
            .from(
                "#product-content-info h2",
                { opacity: 0, ease: "power4.inOut", duration: 3 },
                "products"
            )
            .from(
                ".product-infor img",
                { opacity: 0, ease: "power4.inOut", duration: 3 },
                "products"
            )
            .from(
                "#product-content-info p",
                { opacity: 0, ease: "power4.inOut", duration: 3 },
                "products"
            )
            .from(
                ".buy p",
                { opacity: 0, ease: "power4.inOut", duration: 1 },
                "products"
            )
            .from(
                ".buy button",
                { opacity: 0, ease: "power4.inOut", duration: 1 },
                "products"
            );

        //earbuds text animation
        var title = $("#earbuds-heading").text();
        $("#earbuds-heading").empty();

        for (let items of title) {
            $("#earbuds-heading").append(`<span class='char'>${items}</span>`);
        }

        //earbuds animation
        gsap
            .timeline({
                reversed: true,
                scrollTrigger: {
                    trigger: ".earbuds",
                    start: "top +=80%",
                    end: "+=60%",
                    scrub: 1,
                    toggleActions: "play play play play",
                },
            })
            .from(
                ".char",
                {
                    y: +100,
                    duration: 0.8,
                    opacity: 0,
                    stagger: {
                        each: 1 / title.length,
                        from: "left",
                        ease: `steps(${title.length})`,
                    },
                },
                "home"
            )

            .from(
                ".earbuds-infor .earbuds-left",
                { opacity: 0, ease: "power4.inOut", duration: 4 },
                "earbuds"
            )
            .from(
                ".earbuds-infor .earbuds-left_",
                { opacity: 0, ease: "power4.inOut", duration: 4 },
                "earbuds"
            )
            .from(
                ".earbuds-infor .earbuds-right",
                { opacity: 0, ease: "power4.inOut", duration: 4 },
                "earbuds"
            )
            .from(
                ".earbuds-infor .earbuds-right_",
                { opacity: 0, ease: "power4.inOut", duration: 4 },
                "earbuds"
            );

        //footer back to top animation
        gsap.timeline({ repeat: true })
            .from(".back-to-top", { opacity: 0.4, duration: 2 })
            .to(".back-to-top", { opacity: 1, duration: 2 })
            .repeat(-1);
    }

    setdiscover() {
        // discovery navigator
        var product_data = {
            settings: [
                "New Settings",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etla pariatur.",
            ],
            battery: [
                "Long life Battery",
                "elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing incididunt ut labore etla pariatur.",
            ],
            music: [
                "Improved Sound",
                "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etla pariatur.",
            ],
            bluetooth: [
                "Bluetooth",
                "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etla pariatur.",
            ],
        };

        $(".settings").on(
            "click",
            function () {
                this.discover(product_data["settings"], "settings");
                $(".settings").css("background-color", "#EA6C41");
            }.bind(this)
        );
        $(".battery").on(
            "click",
            function () {
                this.discover(product_data["battery"], "battery");
                $(".battery").css("background-color", "#EA6C41");
            }.bind(this)
        );
        $(".music").on(
            "click",
            function () {
                this.discover(product_data["music"], "music");
                $(".music").css("background-color", "#EA6C41");
            }.bind(this)
        );
        $(".bluetooth").on(
            "click",
            function () {
                this.discover(product_data["bluetooth"], "bluetooth");
                $(".bluetooth").css("background-color", "#EA6C41");
            }.bind(this)
        );
    }

    discover(productData, name) {
        if (name != this.feature_name) {
            $(".features .right").children().css("background-color", "#fcfcfc");
            gsap.from(".features .left h2", {
                opacity: 0,
                rotateX: 45,
                duration: 1,
                onStart: function () {
                    $(".features .left h2").text(productData[0]);
                }.bind(this),
            });
            gsap.from(".features .left p", {
                opacity: 0,
                rotateX: 45,
                duration: 1,
                onStart: function () {
                    $(".features .left p").text(productData[1]);
                }.bind(this),
            });
            this.feature_name = name;
        }
    }

    setProducts(index) {
        this.current_product += index;
        if (
            (this.current_product >= 0) &
            (this.current_product < this.product_version_data.length - 1)
        ) {
        } else {
            if (this.current_product > this.product_version_data.length - 1) {
                this.current_product = 0;
            } else {
                this.current_product = this.product_version_data.length - 1;
            }
        }
        var image = this.product_version_data[this.current_product][3];
        $("#product-content-info h2").text(
            this.product_version_data[this.current_product][0]
        );
        $("#product_p").text(
            this.product_version_data[this.current_product][2]
        );
        $(".buy p").text(this.product_version_data[this.current_product][1]);
        $(".product-image img").empty();
        $(".product-image img").attr("src", image);
    }

    slide(index, button = false) {
        // hero page picture slide auto and manual change
        if (button) {
            clearInterval(this.slidetime);
        }

        if ((index >= 0) & (index < this.slide_data.length)) {
            $("#hero-img").fadeOut(() => {
                $("#hero-img").attr("src", this.slide_data[index]).fadeIn();
                this.slider_btn.css('background','#111213')
                $(this.slide_buttons[index]).css('background','#ea6c41')
                this.slidetime = setTimeout(() => {
                    index += 1;
                    if (index >= this.slide_data.length) index = 0;
                    this.slide(index);
                }, 6000);
            });
        }
    }
}
