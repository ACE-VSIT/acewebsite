/*
[MAIN.js]

[0] Google map init
[1] Declaration of functions
    1   Counters
    1.1 Accordion
    1.2 Tabs
    1.3 Progress bars
    1.4 Isotope grid
    1.5 Map toggle
    1.6 Gallery
    1.7 Parallax
    1.8 Image modal
    1.9 Video modal
    2   Sizes for flip cards
    2.1 Swiper
    2.2 Ajax Contact Form

[2] Declaration of variables
[3] Hero header general
    1   Constructor
    1.1 Background gradient
    1.2 Arrow down link
    1.3 Hero header waves background
    1.4 Hero header 3d-lines background
    1.5 Hero header snow-particles
    1.6 Hero header gravity-particles
    1.7 Hero header color-particles
    1.8 Hero header default-particles
    1.9 Hero header circle-particles
    2   Hero header connect-particles
    2.1 Hero header moving-particles
    2.2 Hero header confetti-particles
    2.3 Hero header youtube background
    2.4 Hero header swiper default
    2.5 Hero header swiper vertical
    2.6 Hero header swiper cube
    2.7 Hero header swiper fade
    2.8 Hero header swiper coverflow
    2.9 Hero header swiper flip
    3   Hero header swiper parallax
    3.1 Hero header init

[4] Navbar general
    1   Constructor
    1.1 Mobile test
    1.2 Mobile menu
    1.3 Sub menus
    1.4 Navbar search
    1.5 Navbar type

[5] Declaration of constants for main classes
[6] Init main classes
[7] Images Loaded
[8] Sizes flip cards init
[9] Sizes flip cards reinit
[10] Tabs init
[11] Accordions init
[12] Counters init
[13] Progress bars iInit
[14] Footer type init
[15] Color scheme
[16] Map toggle init
[17] Parallax init
[18] Gallery init
[19] Image modal init
[20] Video modal init
[21] Swiper init
[22] 3d-hover for elements init
[23] Ajax contact form init
*/

/* [0] Google map init */
function initMap() {
    let lat_lng = {
        lat: 40.746912,
        lng: -73.984404
    };
    let map = new google.maps.Map(document.getElementById('map'), {
        center: lat_lng,
        zoom: 14,
    });
    let marker = new google.maps.Marker({
        position: lat_lng,
        map: map,
        title: 'Hello!'
    });
}

(function () {
    'use strict';

    $(document).ready(function ($) {
        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
        })();

        /* [1] Declaration of functions */

        /* (1) Counters */
        function counters_init(element, count) {
            $(element).waypoint(function () {
                if (!$(element).hasClass("finished_counters")) {
                    let propertiesObj = {};
                    let param = {
                        targets: propertiesObj,
                        easing: 'easeInQuad',
                        round: 1,
                        duration: function (el, i, l) {
                            return 4000 + (i * 300);
                        },
                        update: function () {
                            let el = $(element).find(".prop-obj");
                            let i = 0;
                            for (const prop in propertiesObj) {
                                el[i].innerHTML = JSON.stringify(propertiesObj[prop]);
                                i++;
                            }
                        }
                    }
                    for (let i = 1; i < count + 1; i++) {
                        propertiesObj['prop' + i] = 0;
                        param['prop' + i] = $(element).find(".prop-obj" + i).data("count");
                    }
                    anime(param);
                    $(element).addClass("finished_counters");
                }
            }, {
                offset: '100%'
            });
        }

        /* (1.1) Accordion */
        function accordion_init(element, speed) {
            let accordion = $(element).find('.accordion');
            let accordion_header = accordion.find('.accordion-header');
            let accordion_body = accordion.find('.accordion-body');
            $(element).find('.active-accordion').find('.accordion-body').slideDown(speed);
            accordion_header.on('click', function () {
                let body = $(this).parent().find('.accordion-body');
                let parent = $(this).parent();
                if (!parent.hasClass('active-accordion')) {
                    accordion.removeClass('active-accordion');
                    accordion_body.slideUp(speed);
                }
                parent.toggleClass('active-accordion');
                body.slideToggle(speed);
            });
        }

        /* (1.2) Tabs */
        function tabs_init(element) {
            let tab_header = $(element).find('.tabs-header');
            let tab_trigger = tab_header.find('.tab-trigger');
            let tab_body_wrapper = $(element).find('.tabs-body-wrapper');
            let tab_body = tab_body_wrapper.find('.tab-body');
            tab_trigger.on('click', function () {
                let tab_body_data = $(this).data('tab');
                tab_body.removeClass('active-body');
                tab_trigger.removeClass('active');
                $(tab_body_data).addClass('active-body');
                $(this).addClass('active');
            });
        }

        /* (1.3) Progress bars */
        function progress_bars_init(element, progress) {
            let bar = new ProgressBar.Line(element, {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: color_scheme_color,
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {width: '100%', height: '3px'},
                text: {
                    style: {},
                    autoStyleContainer: false
                },
                from: {color: '#FFEA82'},
                to: {color: '#ED6A5A'},
                step: (state, bar) => {
                    bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            });
            bar.animate(progress);
        }

        /* (1.4) Isotope grid */
        function isotope_grid_init(handler, button_group) {
            let grid = handler.isotope({
                transitionDuration: '0.7s',
                stagger: 50
            });
            let buttons = $(button_group).find('button');
            button_group.on('click', 'button', function () {
                $(buttons).removeClass('active-button');
                $(this).addClass('active-button');
                let filter_value = $(this).attr('data-filter');
                grid.isotope({
                    filter: filter_value
                });
            });
        }

        /* (1.5) Map toggle */
        function map_toggle_init(map, btn, speed) {
            map.slideUp('fast');
            btn.on('click', function () {
                map.slideToggle(speed);
                btn.find('.hide').toggleClass('active');
                btn.find('.show').toggleClass('active');
            });
        }

        /* (1.6) Gallery */
        function gallery_init(gallery) {
            gallery.magnificPopup({
                delegate: '.image-item',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                removalDelay: 300,
                mainClass: 'mfp-fade',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                    titleSrc: function (item) {
                        return item.el.attr('title');
                    }
                },
                zoom: {
                    enabled: true,
                    duration: 500,
                }
            });
        }

        /* (1.7) Parallax */
        function parallax_init(container) {
            for (let i = 0; i < container.length; i++) {
                let data = $(container[i]).data('src');
                let speed = $(container[i]).data('speed');
                $(container[i]).parallax({
                    imageSrc: data,
                    speed: speed
                });
            }
        }

        /* (1.8) Image modal */
        function image_modal_init(modal) {
            modal.magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,
                mainClass: 'mfp-fade',
                image: {
                    verticalFit: true
                },
                zoom: {
                    enabled: true,
                    duration: 500
                }
            });
        }

        /* (1.9) Video modal */
        function video_modal_init(modal) {
            modal.magnificPopup({
                type: 'inline',
                closeOnContentClick: true,
                mainClass: 'mfp-fade',
                modal: true,
                closeBtnInside: true,
            });
            $('.modal-video-box').on('click', function (e) {
                $.magnificPopup.close();
            });
        }

        /* (2) Sizes for flip cards */
        function sizes_flip_cards(section) {
            let flip_container = section.find('.flip-container');
            let flip_card_img = flip_container.find('img');
            let flip_front = flip_container.find('.front');
            let flip_back = flip_container.find('.back');
            for (let i = 0; i < flip_container.length; i++) {
                let height_img = $(flip_card_img[i]).innerHeight();
                $(flip_container[i]).css('height', height_img);
                $(flip_front[i]).css('height', height_img);
                $(flip_back[i]).css('height', height_img);
            }
        }

        /* (2.1) Swiper */
        function swiper_init() {
            // Swiper team
            let swiper_team = new Swiper('.swiper-team', {
                loop: true,
                speed: 500,
                spaceBetween: 8,
                slidesPerView: 3,
                pagination: {
                    el: '.swiper-pagination-bullets-common',
                    type: 'bullets',
                    clickable: true,
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                },
                breakpoints: {
                    767: {
                        slidesPerView: 2,
                    },
                    450: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    0: {
                        spaceBetween: 0
                    }
                }
            });

            // Swiper testimonials
            let swiper_testimonials = new Swiper('.swiper-testimonials', {
                speed: 600,
                loop: true,
                effect: 'flip',
                flipEffect: {
                    rotate: 30,
                    slideShadows: false,
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                },
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination-bullets-default',
                    type: 'bullets',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next-testimonials',
                    prevEl: '.swiper-button-prev-testimonials',
                }
            });

            // Swiper portfolio
            let swiper_portfolio = new Swiper('.swiper-portfolio', {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
                autoplay: {
                    delay: 3000,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next-portfolio',
                    prevEl: '.swiper-button-prev-portfolio',
                }
            });

            // Swiper clients
            let swiper_clients = new Swiper('.swiper-clients', {
                slidesPerView: 4,
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    }
                }
            });

            // Swiper default
            let swiper_default = new Swiper('.swiper-default', {
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                navigation: {
                    nextEl: '.swiper-button-next-portfolio',
                    prevEl: '.swiper-button-prev-portfolio',
                },
                pagination: {
                    el: '.swiper-pagination-bullets-common',
                    type: 'bullets',
                    clickable: true,
                },
            });

            // Swiper post
            let swiper_post = new Swiper('.swiper-post', {
                loop: true,
                autoplay: {
                    delay: 2000,
                },
                pagination: {
                    el: '.swiper-pagination-bullets-default',
                    type: 'bullets',
                    clickable: true,
                },
            });
        }

        /* (2.2) Ajax Contact Form */
        function ajax_contact_init() {
            $(form).submit(function (e) {
                e.preventDefault();
                let form_data = $(this).serialize();
                $.ajax({
                    type: "POST",
                    url: "mailer.php",
                    data: form_data,
                    success: function () {
                        alert("Your message send");
                    }
                });
            });
        }

        /* [2] Declaration of variables */
        // Common constants
        const COMMON = {
            win: window,
            doc: document,
            body: $('body')
        };

        // Viewport sizes
        const VIEWPORT = {
            w: COMMON.win.innerWidth,
            h: COMMON.win.innerHeight
        };

        // ROOT
        let root = COMMON.doc.querySelector(':root');

        // Page width
        let page_width = VIEWPORT.w;

        // Hero header
        let hero_header = $('.hero-header');

        // Main wrapper
        let wrapper = $('#main-wrapper');

        // Footer
        let footer = $('footer');

        // Page loader
        let loader = $('.loader');

        // Mobile breakpoint
        let mobile_point = 992;

        // Start for mobile version template
        let mobile_start = 991;

        // Color scheme
        let color_scheme_color = '#00a999';

        // Logo light
        let logo_light = $('.logo-light');

        // Logo dark
        let logo_dark = $('.logo-dark');

        // Navbar type
        let navbar_type = 'navbar-fill';

        // Footer type
        let footer_type = 'footer-dark';

        // Logo position
        let logo_position = 'logo-left';

        // Counters wrapper
        let counters_wrapper = $('.counters-wrapper');

        // Tabs wrapper
        let tabs_wrapper = $('.tabs-wrapper');

        // Accordions wrapper
        let accordions_wrapper = $('.accordion-wrapper');

        // Flip cards section
        let flip_section = $('.flip-section');

        // Parallax background
        let parallax_background = $('.parallax-window');

        // Image modal
        let image_modal = $('.image-popup');

        // Video modal
        let video_modal = $('.video-popup');

        // Google map wrapper
        let map = $('#map');

        // Google map toggle
        let map_toggle = $('.toggle-map');

        // Progress bar
        let progress_bar = '.progress-bar-skill';

        // Progress bar test variable
        let progress_check = true;

        // Progress bars count
        let progress_bar_count = $(progress_bar).length;

        // Contact form
        let form = $('#ajax-contact');

        // Wrapper for 3d-hover elements
        let hover3d = $('.hover3d-wrapper');

        // Isotope grid
        let isotope_grid = $('.grid');

        // Gallery
        let gallery = $('.popup-gallery');

        // Isotope button group
        let button_group = $('.button-group-default');

        // Hero header type
        let hero_type = hero_header.data('section-type');

        // Viewport sizes reinit
        $(COMMON.win).resize(function () {
            VIEWPORT.w = COMMON.win.innerWidth;
            VIEWPORT.h = COMMON.win.innerHeight;
            if ((page_width >= mobile_point && VIEWPORT.w <= mobile_start) || (page_width <= mobile_start && VIEWPORT.w >= mobile_point)) {
                location.reload();
            }
        });

        /* [3] Hero header general */
        class HERO {
            /* (1) Constructor */
            constructor() {
                this.canvas = COMMON.doc.getElementById('canvas-hero');
                this.canvas_header = $('#canvas-parent');
                this.canvas_width = COMMON.win.innerWidth;
                this.canvas_height = this.canvas_header.height();
                this.particles_wrapper = 'canvas-parent';
                this.angle_down = $('.angle-down');
                this.hero_header = $('.hero-header');
                this.youtube_wrapper = this.hero_header.find('.hero-video');
                this.wrapper_slider = '.swiper-hero';
            }

            /* (1.1) Background gradient */
            _bg_gradient() {
                let colors = [
                    [62, 35, 150],
                    [60, 50, 80],
                    [147, 35, 178],
                    [45, 32, 110],
                    [70, 65, 120],
                    [150, 45, 90]
                ];
                let step = 0;
                let colorIndices = [0, 1, 2, 3];

                let gradientSpeed = 0.001;

                function updateGradient() {

                    if ($ === undefined) return;

                    let c0_0 = colors[colorIndices[0]];
                    let c0_1 = colors[colorIndices[1]];
                    let c1_0 = colors[colorIndices[2]];
                    let c1_1 = colors[colorIndices[3]];

                    let istep = 1 - step;
                    let r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
                    let g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
                    let b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
                    let color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

                    let r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
                    let g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
                    let b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
                    let color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

                    $('.gradient').css({
                        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
                    }).css({
                        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
                    });

                    step += gradientSpeed;
                    if (step >= 1) {
                        step %= 1;
                        colorIndices[0] = colorIndices[1];
                        colorIndices[2] = colorIndices[3];

                        //pick two new target color indices
                        //do not pick the same as the current one
                        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

                    }
                }

                setInterval(updateGradient, 10);
            }

            /* (1.2) Arrow down link */
            _arrow_down() {
                $(this.angle_down).on("click", () => {
                    let top = this.hero_header.height();
                    $('body,html').animate({scrollTop: top}, 1500);
                });
            }

            /* (1.3) Hero header waves background */
            _particles_wave_header() {
                let SEPARATION = 100;
                let AMOUNTX = 50;
                let AMOUNTY = 50;
                let camera, scene, renderer;
                let particles;
                let particle;
                let count = 0;
                let mouseX = 85;
                let mouseY = -342;
                let windowHalfX = COMMON.win.innerWidth / 2;
                let windowHalfY = COMMON.win.innerHeight / 2;
                let container = this.canvas;

                init();
                animate();

                function init() {
                    camera = new THREE.PerspectiveCamera(120, COMMON.win.innerWidth / COMMON.win.innerHeight, 1, 10000);
                    camera.position.z = 1000;
                    scene = new THREE.Scene();
                    particles = [];
                    let PI2 = Math.PI * 2;
                    let material = new THREE.SpriteCanvasMaterial({
                        color: 0xe1e1e1,
                        program: function (context) {
                            context.beginPath();
                            context.arc(0, 0, .3, 0, PI2, true);
                            context.fill();
                        }
                    });
                    let i = 0;
                    for (let ix = 0; ix < AMOUNTX; ix++) {
                        for (let iy = 0; iy < AMOUNTY; iy++) {
                            particle = particles[i++] = new THREE.Particle(material);
                            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                            scene.add(particle);
                        }
                    }
                    renderer = new THREE.CanvasRenderer();
                    renderer.setSize(COMMON.win.innerWidth, COMMON.win.innerHeight);
                    container.appendChild(renderer.domElement);
                    document.addEventListener('mousemove', onDocumentMouseMove, false);
                    document.addEventListener('touchstart', onDocumentTouchStart, false);
                    document.addEventListener('touchmove', onDocumentTouchMove, false);
                    COMMON.win.addEventListener('resize', onWindowResize, false);
                }

                function onWindowResize() {
                    windowHalfX = COMMON.win.innerWidth / 2;
                    windowHalfY = COMMON.win.innerHeight / 2;
                    camera.aspect = COMMON.win.innerWidth / COMMON.win.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(COMMON.win.innerWidth, COMMON.win.innerHeight);
                }

                function onDocumentMouseMove(event) {
                    mouseX = event.clientX - windowHalfX;
                    mouseY = event.clientY - windowHalfY;
                }

                function onDocumentTouchStart(event) {
                    if (event.touches.length === 1) {
                        event.preventDefault();
                        mouseX = event.touches[0].pageX - windowHalfX;
                        mouseY = event.touches[0].pageY - windowHalfY;
                    }
                }

                function onDocumentTouchMove(event) {
                    if (event.touches.length === 1) {
                        event.preventDefault();
                        mouseX = event.touches[0].pageX - windowHalfX;
                        mouseY = event.touches[0].pageY - windowHalfY;
                    }
                }

                function animate() {
                    requestAnimationFrame(animate);
                    render();
                }

                function render() {
                    camera.position.x += (mouseX - camera.position.x) * .05;
                    camera.position.y += (-mouseY - camera.position.y) * .05;
                    camera.lookAt(scene.position);
                    let i = 0;
                    for (let ix = 0; ix < AMOUNTX; ix++) {
                        for (let iy = 0; iy < AMOUNTY; iy++) {
                            particle = particles[i++];
                            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
                        }
                    }
                    renderer.render(scene, camera);
                    count += 0.1;
                }
            }

            /* (1.4) Hero header 3d-lines background */
            _particles_3d_header() {
                this._bg_gradient();
                let mouseX = 0, mouseY = 0;
                let windowHalfX = COMMON.win.innerWidth / 2;
                let windowHalfY = COMMON.win.innerHeight / 2;
                let SEPARATION = 200;
                let AMOUNTX = 1;
                let AMOUNTY = 1;
                let camera;
                let scene;
                let renderer;
                let container = this.canvas;
                let width = this.canvas_width;
                let height = this.canvas_height;
                init();
                animate();

                function init() {
                    let separation = 1000, amountX = 50, amountY = 50, color = 0xeeeeee,
                        particles, particle;
                    camera = new THREE.PerspectiveCamera(75, COMMON.win.innerWidth / COMMON.win.innerHeight, 1, 10000);
                    camera.position.z = 100;
                    scene = new THREE.Scene();
                    renderer = new THREE.CanvasRenderer({alpha: true});
                    renderer.setPixelRatio(COMMON.win.devicePixelRatio);
                    renderer.setClearColor(0x000000, 0);
                    renderer.setSize(width, height);
                    container.appendChild(renderer.domElement);
                    let PI2 = Math.PI * 2;
                    let material = new THREE.SpriteCanvasMaterial({
                        color: color,
                        opacity: 0.5,
                        program: function (context) {
                            context.beginPath();
                            context.arc(0, 0, 0.5, 0, PI2, true);
                            context.fill();
                        }
                    });
                    let geometry = new THREE.Geometry();
                    for (let i = 0; i < 150; i++) {
                        particle = new THREE.Sprite(material);
                        particle.position.x = Math.random() * 2 - 1;
                        particle.position.y = Math.random() * 2 - 1;
                        particle.position.z = Math.random() * 2 - 1;
                        particle.position.normalize();
                        particle.position.multiplyScalar(Math.random() * 10 + 600);
                        particle.scale.x = particle.scale.y = 5;
                        scene.add(particle);
                        geometry.vertices.push(particle.position);
                    }
                    let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: color, opacity: 0.2}));
                    scene.add(line);
                    document.addEventListener('mousemove', onDocumentMouseMove, false);
                    document.addEventListener('touchstart', onDocumentTouchStart, false);
                    document.addEventListener('touchmove', onDocumentTouchMove, false);
                    COMMON.win.addEventListener('resize', onWindowResize, false);
                }

                function onWindowResize() {
                    windowHalfX = COMMON.win.innerWidth / 2;
                    windowHalfY = COMMON.win.innerHeight / 2;
                    camera.aspect = COMMON.win.innerWidth / COMMON.win.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(COMMON.win.innerWidth, COMMON.win.innerHeight);
                }

                function onDocumentMouseMove(event) {
                    mouseX = (event.clientX - windowHalfX) * 0.05;
                    mouseY = (event.clientY - windowHalfY) * 0.2;
                }

                function onDocumentTouchStart(event) {
                    if (event.touches.length > 1) {
                        event.preventDefault();
                        mouseX = (event.touches[0].pageX - windowHalfX) * 0.7;
                        mouseY = (event.touches[0].pageY - windowHalfY) * 0.7;
                    }
                }

                function onDocumentTouchMove(event) {
                    if (event.touches.length == 1) {
                        event.preventDefault();
                        mouseX = event.touches[0].pageX - windowHalfX;
                        mouseY = event.touches[0].pageY - windowHalfY;
                    }
                }

                function animate() {
                    requestAnimationFrame(animate);
                    render();
                }

                function render() {
                    camera.position.x += (mouseX - camera.position.x) * 0.1;
                    camera.position.y += (-mouseY + 200 - camera.position.y) * 0.05;
                    camera.lookAt(scene.position);
                    renderer.render(scene, camera);
                }
            }

            /* (1.5) Hero header snow-particles */
            _particles_snow_header() {
                let circles, target, animateHeader = true;
                let canvas = this.canvas;
                let width = this.canvas_width;
                let height = this.canvas_height;
                let canvas_header = this.canvas_header;
                let ctx = this.canvas.getContext('2d');

                initHeader();
                addListeners();

                function initHeader() {
                    canvas.width = width;
                    canvas.height = height;
                    target = {x: 0, y: height};
                    canvas_header.css({
                        'height': height + 'px'
                    });
                    circles = [];
                    for (let x = 0; x < width * 0.5; x++) {
                        let c = new Circle();
                        circles.push(c);
                    }
                    animate();
                }

                function addListeners() {
                    COMMON.win.addEventListener('scroll', scrollCheck);
                    COMMON.win.addEventListener('resize', resize);
                }

                function scrollCheck() {
                    if (COMMON.doc.body.scrollTop > height) animateHeader = false;
                    else animateHeader = true;
                }

                function resize() {
                    width = COMMON.win.innerWidth;
                    height = COMMON.win.innerHeight;
                    canvas_header.css({
                        'height': height + 'px'
                    });
                    canvas.width = width;
                    canvas.height = height;
                }

                function animate() {
                    if (animateHeader) {
                        ctx.clearRect(0, 0, width, height);
                        for (let i in circles) {
                            circles[i].draw();
                        }
                    }
                    requestAnimationFrame(animate);
                }


                function Circle() {
                    let $this = this;

                    (function () {
                        $this.pos = {};
                        init();
                    })();

                    function init() {
                        $this.pos.x = Math.random() * width;
                        $this.pos.y = height + Math.random() * 100;
                        $this.alpha = 0.1 + Math.random() * 0.4;
                        $this.scale = 0.1 + Math.random() * 0.3;
                        $this.velocity = Math.random();
                    }

                    this.draw = function () {
                        if ($this.alpha <= 0) {
                            init();
                        }
                        $this.pos.y -= $this.velocity;
                        $this.alpha -= 0.0003;
                        ctx.beginPath();
                        ctx.arc($this.pos.x, $this.pos.y, $this.scale * 10, 0, 2 * Math.PI, false);
                        ctx.fillStyle = 'rgba(255,255,255,' + $this.alpha + ')';
                        ctx.fill();
                    };
                }
            }

            /* (1.6) Hero header gravity-particles */
            _particles_gravity_header() {
                let onload = function () {
                    setTimeout(init(), 0)
                };
                let a, ctx, canvas, mouse, gravityStrength, particles, spawnTimer, spawnInterval, type, time,
                    particleOverflow, x, y;
                canvas = this.canvas;
                ctx = canvas.getContext('2d');
                canvas.width = this.canvas_width;
                canvas.height = this.canvas_height;
                let init = function () {
                    let onresize = function () {
                        canvas.width = canvas.clientWidth;
                        canvas.height = canvas.clientHeight;
                    };
                    onresize();

                    mouse = {x: canvas.width / 2, y: canvas.height / 2, out: false}

                    canvas.onmouseout = function () {
                        mouse.out = true
                    };

                    canvas.onmousemove = function (e) {
                        let rect = canvas.getBoundingClientRect()
                        mouse = {
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            out: false
                        }
                    };

                    gravityStrength = 10;
                    particles = [];
                    spawnTimer = 0;
                    spawnInterval = 10;
                    type = 0;
                    requestAnimationFrame(startLoop)
                };

                let newParticle = function () {
                    type = type ? 0 : 1;
                    particles.push({
                        x: mouse.x,
                        y: mouse.y,
                        xv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
                        yv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
                        c: type ? 'rgb(255,' + ((250 * Math.random()) | 0) + ',' + ((150 * Math.random()) | 0) + ')' : 'rgb(255,255,255)',
                        s: type ? 5 + 10 * Math.random() : 1,
                        a: 1
                    })
                };

                let startLoop = function (newTime) {
                    time = newTime;
                    requestAnimationFrame(loop);
                };

                let loop = function (newTime) {
                    draw();
                    calculate(newTime);
                    requestAnimationFrame(loop);
                };

                let draw = function () {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    for (let i = 0; i < particles.length; i++) {
                        let p = particles[i];
                        ctx.globalAlpha = p.a;
                        ctx.fillStyle = p.c;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                };

                let calculate = function (newTime) {
                    let dt = newTime - time;
                    time = newTime;

                    if (!mouse.out) {
                        spawnTimer += (dt < 100) ? dt : 100;
                        for (; spawnTimer > 0; spawnTimer -= spawnInterval) {
                            newParticle();
                        }
                    }

                    particleOverflow = particles.length - 700;
                    if (particleOverflow > 0) {
                        particles.splice(0, particleOverflow);
                    }

                    for (let i = 0; i < particles.length; i++) {
                        let p = particles[i];
                        if (!mouse.out) {
                            x = mouse.x - p.x;
                            y = mouse.y - p.y;
                            a = x * x + y * y;
                            a = a > 100 ? gravityStrength / a : gravityStrength / 100;
                            p.xv = (p.xv + a * x) * 0.99;
                            p.yv = (p.yv + a * y) * 0.99;
                        }
                        p.x += p.xv;
                        p.y += p.yv;
                        p.a *= 0.99;
                    }
                };
                onload();
            }

            /* (1.7) Hero header color-particles */
            _particles_color_header() {
                const json = {
                    "particles": {
                        "number": {
                            "value": 150,
                            "density": {
                                "enable": true,
                                "value_area": 700
                            }
                        },
                        "color": {
                            "value": ["#e30c0c",
                                "#ee3158",
                                "#c73ede", "#996ce9",
                                "#5f75ed", "#2196f3",
                                "#df4b1d", "#ff9800",
                                "#ffc107", "#e4c239"]
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 5
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 0.65,
                            "random": false,
                            "anim": {
                                "enable": false,
                                "speed": 1,
                                "opacity_min": 0.1,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 5,
                            "random": true,
                            "anim": {
                                "enable": false,
                                "speed": 40,
                                "size_min": 0.3,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 110.48,
                            "color": "#ffffff",
                            "opacity": 0.2,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "bounce",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": false,
                                "mode": "bubble"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 300,
                                "line_linked": {
                                    "opacity": 0.3
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 8,
                                "duration": 5,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 200,
                                "duration": 2
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true
                }
                particlesJS(this.particles_wrapper, json);
            }

            /* (1.8) Hero header default-particles */
            _particles_default_header() {
                const json = {
                    "particles": {
                        "number": {
                            "value": 190,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": ['#00bcd4', '#00bcd4', '#00bcd4']
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 2
                            },
                            "image": {
                                "src": "img/github.svg",
                                "width": 100,
                                "height": 100
                            }
                        },
                        "opacity": {
                            "value": 1,
                            "random": false,
                            "anim": {
                                "enable": true,
                                "speed": 5,
                                "opacity_min": 0.5,
                                "sync": false
                            }
                        },
                        "size": {
                            "value": 3.5,
                            "random": true,
                            "anim": {
                                "enable": true,
                                "speed": 10,
                                "size_min": 0.2,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 110.48,
                            "color": "#00bcd4",
                            "opacity": 0.3,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 3,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "bounce",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": false,
                                "mode": "repulse"
                            },
                            "onclick": {
                                "enable": false,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 400,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 150,
                                "duration": 0.1
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true
                }
                particlesJS(this.particles_wrapper, json);
            }

            /* (1.9) Hero header circle-particles */
            _particles_circles_header() {
                const json = {
                    "particles": {
                        "number": {
                            "value": 180
                        },
                        "color": {
                            "value": "#eee"
                        },
                        "shape": {
                            "type": "circle"
                        },
                        "opacity": {
                            "value": 0.5,
                            "random": true,
                            "anim": {
                                "enable": false
                            }
                        },
                        "size": {
                            "value": 15,
                            "random": true,
                            "anim": {
                                "enable": false,
                            }
                        },
                        "line_linked": {
                            "enable": false
                        },
                        "move": {
                            "enable": true,
                            "speed": 4,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "out"
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": {
                                "enable": false
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "push": {
                                "particles_nb": 10
                            }
                        }
                    },
                    "retina_detect": true
                }
                particlesJS(this.particles_wrapper, json);
            }

            /* (2) Hero header connect-particles */
            _particles_connect_header() {
                let points;
                let animateHeader = true;
                let width = this.canvas_width;
                let height = this.canvas_height;
                let target = {x: width / 2, y: height / 2};
                let canvas = this.canvas;
                let ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                initHeader();
                initAnimation();
                addListeners();

                function initHeader() {
                    points = [];
                    for (let x = 0; x < width; x = x + width / 20) {
                        for (let y = 0; y < height; y = y + height / 20) {
                            let px = x + Math.random() * width / 20;
                            let py = y + Math.random() * height / 20;
                            let p = {x: px, originX: px, y: py, originY: py};
                            points.push(p);
                        }
                    }
                    for (let i = 0; i < points.length; i++) {
                        let closest = [];
                        let p1 = points[i];
                        for (let j = 0; j < points.length; j++) {
                            let p2 = points[j]
                            if (!(p1 === p2)) {
                                let placed = false;
                                for (let k = 0; k < 5; k++) {
                                    if (!placed) {
                                        if (closest[k] === undefined) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }

                                for (let k = 0; k < 5; k++) {
                                    if (!placed) {
                                        if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }
                            }
                        }
                        p1.closest = closest;
                    }
                    for (let i in points) {
                        let c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
                        points[i].circle = c;
                    }
                }

                function addListeners() {
                    if (!('ontouchstart' in COMMON.win)) {
                        COMMON.win.addEventListener('mousemove', mouseMove);
                    }
                    COMMON.win.addEventListener('scroll', scrollCheck);
                    COMMON.win.addEventListener('resize', resize);
                }

                function mouseMove(e) {
                    let posx = 0;
                    let posy = 0;
                    if (e.pageX || e.pageY) {
                        posx = e.pageX;
                        posy = e.pageY;
                    }
                    else if (e.clientX || e.clientY) {
                        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }
                    target.x = posx;
                    target.y = posy;
                }

                function scrollCheck() {
                    if (document.body.scrollTop > height) animateHeader = false;
                    else animateHeader = true;
                }

                function resize() {
                    width = COMMON.win.innerWidth;
                    height = COMMON.win.innerHeight;
                    canvas.width = width;
                    canvas.height = height;
                }

                function initAnimation() {
                    animate();
                    for (let i in points) {
                        shiftPoint(points[i]);
                    }
                }

                function animate() {
                    if (animateHeader) {
                        ctx.clearRect(0, 0, width, height);
                        for (let i in points) {
                            if (Math.abs(getDistance(target, points[i])) < 4000) {
                                points[i].active = 0.3;
                                points[i].circle.active = 0.6;
                            } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                                points[i].active = 0.1;
                                points[i].circle.active = 0.3;
                            } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                                points[i].active = 0.02;
                                points[i].circle.active = 0.1;
                            } else {
                                points[i].active = 0;
                                points[i].circle.active = 0;
                            }

                            drawLines(points[i]);
                            points[i].circle.draw();
                        }
                    }
                    requestAnimationFrame(animate);
                }

                function shiftPoint(p) {
                    TweenLite.to(p, 1 + 1 * Math.random(), {
                        x: p.originX - 50 + Math.random() * 100,
                        y: p.originY - 50 + Math.random() * 100, ease: Circ.easeInOut,
                        onComplete: function () {
                            shiftPoint(p);
                        }
                    });
                }

                function drawLines(p) {
                    if (!p.active) return;
                    for (let i in p.closest) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p.closest[i].x, p.closest[i].y);
                        ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
                        ctx.stroke();
                    }
                }

                function Circle(pos, rad, color) {
                    let _this = this;

                    (function () {
                        _this.pos = pos || null;
                        _this.radius = rad || null;
                        _this.color = color || null;
                    })();

                    this.draw = function () {
                        if (!_this.active) return;
                        ctx.beginPath();
                        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = 'rgba(230,217,249,' + _this.active + ')';
                        ctx.fill();
                    };
                }

                function getDistance(p1, p2) {
                    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
                }
            }

            /* (2.1) Hero header moving-particles */
            _particles_moving_header() {
                function Star(id, x, y) {
                    this.id = id;
                    this.x = x;
                    this.y = y;
                    this.r = Math.floor(Math.random() * 2) + 1;
                    let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
                    this.color = "rgba(255,255,255," + alpha + ")";
                }

                Star.prototype.draw = function () {
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = this.r * 2;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                };
                Star.prototype.move = function () {
                    this.y -= .15 + params.backgroundSpeed / 100;
                    if (this.y <= -10) this.y = height + 10;
                    this.draw();
                };

                function Dot(id, x, y, r) {
                    this.id = id;
                    this.x = x;
                    this.y = y;
                    this.r = Math.floor(Math.random() * 5) + 1;
                    this.maxLinks = 2;
                    this.speed = .5;
                    this.a = .7;
                    this.aReduction = .005;
                    this.color = "rgba(200,200,255," + this.a + ")";
                    this.linkColor = "rgba(200,200,255," + this.a / 4 + ")";

                    this.dir = Math.floor(Math.random() * 140) + 200;
                }

                Dot.prototype.draw = function () {
                    ctx.fillStyle = this.color;
                    ctx.shadowBlur = this.r * 2;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.fill();
                };
                Dot.prototype.link = function () {
                    if (this.id === 0) return;
                    let previousDot1 = getPreviousDot(this.id, 1);
                    let previousDot2 = getPreviousDot(this.id, 2);
                    let previousDot3 = getPreviousDot(this.id, 3);
                    if (!previousDot1) return;
                    ctx.strokeStyle = this.linkColor;
                    ctx.moveTo(previousDot1.x, previousDot1.y);
                    ctx.beginPath();
                    ctx.lineTo(this.x, this.y);
                    if (previousDot2 !== false) ctx.lineTo(previousDot2.x, previousDot2.y);
                    if (previousDot3 !== false) ctx.lineTo(previousDot3.x, previousDot3.y);
                    ctx.stroke();
                    ctx.closePath();
                };

                function getPreviousDot(id, stepback) {
                    if (id === 0 || id - stepback < 0) return false;
                    if (typeof dots[id - stepback] !== "undefined") return dots[id - stepback];
                    else return false;
                }

                Dot.prototype.move = function () {
                    this.a -= this.aReduction;
                    if (this.a <= 0) {
                        this.die();
                        return
                    }
                    this.color = "rgba(200,200,255," + this.a + ")";
                    this.linkColor = "rgba(200,200,255," + this.a / 4 + ")";
                    this.x = this.x + Math.cos(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100),
                        this.y = this.y + Math.sin(degToRad(this.dir)) * (this.speed + params.dotsSpeed / 100);

                    this.draw();
                    this.link();
                };
                Dot.prototype.die = function () {
                    dots[this.id] = null;
                    delete dots[this.id];
                };
                let canvas = this.canvas;
                let ctx = canvas.getContext('2d');
                let width = this.canvas_width;
                let height = this.canvas_height;
                let mouseMoving = false;
                let mouseMoveChecker;
                let mouseX;
                let mouseY;
                let stars = [];
                let initStarsPopulation = 80;
                let dots = [];
                let dotsMinDist = 2;
                let params = {
                    maxDistFromCursor: 50,
                    dotsSpeed: 0,
                    backgroundSpeed: 0
                };
                setCanvasSize();
                init();

                function setCanvasSize() {
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                }

                function init() {
                    ctx.strokeStyle = "#00bcd4";
                    ctx.shadowColor = "#00bcd4";
                    for (let i = 0; i < initStarsPopulation; i++) {
                        stars[i] = new Star(i, Math.floor(Math.random() * width), Math.floor(Math.random() * height));
                        stars[i].draw();
                    }
                    ctx.shadowBlur = 0;
                    animate();
                }

                function animate() {
                    ctx.clearRect(0, 0, width, height);

                    for (let i in stars) {
                        stars[i].move();
                    }
                    for (let i in dots) {
                        dots[i].move();
                    }
                    drawIfMouseMoving();
                    requestAnimationFrame(animate);
                }

                COMMON.win.onmousemove = function (e) {
                    mouseMoving = true;
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                    clearInterval(mouseMoveChecker);
                    mouseMoveChecker = setTimeout(function () {
                        mouseMoving = false;
                    }, 100);
                };

                function drawIfMouseMoving() {
                    if (!mouseMoving) return;
                    if (dots.length === 0) {
                        dots[0] = new Dot(0, mouseX, mouseY);
                        dots[0].draw();
                        return;
                    }
                    let previousDot = getPreviousDot(dots.length, 1);
                    let prevX = previousDot.x;
                    let prevY = previousDot.y;
                    let diffX = Math.abs(prevX - mouseX);
                    let diffY = Math.abs(prevY - mouseY);
                    if (diffX < dotsMinDist || diffY < dotsMinDist) return;
                    let xVariation = Math.random() > .5 ? -1 : 1;
                    xVariation = xVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
                    let yVariation = Math.random() > .5 ? -1 : 1;
                    yVariation = yVariation * Math.floor(Math.random() * params.maxDistFromCursor) + 1;
                    dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
                    dots[dots.length - 1].draw();
                    dots[dots.length - 1].link();
                }

                function degToRad(deg) {
                    return deg * (Math.PI / 180);
                }

            }

            /* (2.2) Hero header confetti-particles */
            _particles_confetti_header() {
                let NUM_CONFETTI = 350;
                let COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];
                let PI_2 = 2 * Math.PI;
                let canvas = this.canvas;
                let context = canvas.getContext("2d");
                COMMON.win.w = 0;
                COMMON.win.h = 0;
                let resizeWindow = function () {
                    COMMON.win.w = canvas.width = COMMON.win.innerWidth;
                    return COMMON.win.h = canvas.height = COMMON.win.innerHeight;
                };
                COMMON.win.addEventListener('resize', resizeWindow, false);
                COMMON.win.onload = function () {
                    return setTimeout(resizeWindow, 0);
                };
                let range = function (a, b) {
                    return (b - a) * Math.random() + a;
                };
                let drawCircle = function (x, y, r, style) {
                    context.beginPath();
                    context.arc(x, y, r, 0, PI_2, false);
                    context.fillStyle = style;
                    return context.fill();
                };
                let xpos = 0.5;
                document.onmousemove = function (e) {
                    return xpos = e.pageX / w;
                };

                let Confetti = class Confetti {
                    constructor() {
                        this.style = COLORS[~~range(0, 5)];
                        this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
                        this.r = ~~range(2, 6);
                        this.r2 = 2 * this.r;
                        this.replace();
                    }

                    replace() {
                        this.opacity = 0;
                        this.dop = 0.03 * range(1, 4);
                        this.x = range(-this.r2, w - this.r2);
                        this.y = range(-20, h - this.r2);
                        this.xmax = w - this.r;
                        this.ymax = h - this.r;
                        this.vx = range(0, 2) + 8 * xpos - 5;
                        return this.vy = 0.7 * this.r + range(-1, 1);
                    }

                    draw() {
                        let ref;
                        this.x += this.vx;
                        this.y += this.vy;
                        this.opacity += this.dop;
                        if (this.opacity > 1) {
                            this.opacity = 1;
                            this.dop *= -1;
                        }
                        if (this.opacity < 0 || this.y > this.ymax) {
                            this.replace();
                        }
                        if (!((0 < (ref = this.x) && ref < this.xmax))) {
                            this.x = (this.x + this.xmax) % this.xmax;
                        }
                        return drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
                    }

                };
                let confetti = (function () {
                    let j, ref, results;
                    results = [];
                    for (let i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
                        results.push(new Confetti);
                    }
                    return results;
                })();
                COMMON.win.step = function () {
                    let c;
                    let len;
                    let results;
                    requestAnimationFrame(step);
                    context.clearRect(0, 0, w, h);
                    results = [];
                    for (let j = 0, len = confetti.length; j < len; j++) {
                        c = confetti[j];
                        results.push(c.draw());
                    }
                    return results;
                };
                step();
            }

            /* (2.3) Hero header youtube background */
            _youtube_header() {
                $(this.youtube_wrapper).YTPlayer({
                    fitToBackground: false,
                    videoId: 'AYmZaEVOIIs'
                });
            }

            /* (2.4) Hero header swiper default */
            _swiper_default_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 600,
                    pagination: {
                        el: '.swiper-pagination-bullets-default',
                        type: 'bullets',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-default',
                        prevEl: '.swiper-button-prev-default',
                    }
                });
            }

            /* (2.5) Hero header swiper vertical */
            _swiper_vertical_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    direction: 'vertical',
                    loop: true,
                    speed: 600,
                    pagination: {
                        el: '.swiper-pagination-bullets-vertical',
                        type: 'bullets',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-vertical',
                        prevEl: '.swiper-button-prev-vertical',
                    }
                });
            }

            /* (2.6) Hero header swiper cube */
            _swiper_cube_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 600,
                    effect: 'cube',
                    cubeEffect: {
                        shadow: true,
                        slideShadows: false,
                    },
                    pagination: {
                        el: '.swiper-pagination-bullets-default',
                        type: 'bullets',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-default',
                        prevEl: '.swiper-button-prev-default',
                    }
                });
            }

            /* (2.7) Hero header swiper fade */
            _swiper_fade_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 600,
                    effect: 'fade',
                    cubeEffect: {
                        shadow: true,
                        slideShadows: false,
                    },
                    pagination: {
                        el: '.swiper-pagination-bullets-default',
                        type: 'bullets',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-default',
                        prevEl: '.swiper-button-prev-default',
                    }
                });
            }

            /* (2.8) Hero header swiper coverflow */
            _swiper_coverflow_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 600,
                    effect: 'coverflow',
                    centeredSlides: true,
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    },
                    pagination: {
                        el: '.swiper-pagination-bullets-default',
                        type: 'bullets',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-default',
                        prevEl: '.swiper-button-prev-default',
                    }
                });
            }

            /* (2.9) Hero header swiper flip */
            _swiper_flip_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    speed: 600,
                    loop: true,
                    effect: 'flip',
                    flipEffect: {
                        rotate: 30,
                        slideShadows: false,
                    },
                    pagination: {
                        el: '.swiper-pagination-bullets-default',
                        type: 'bullets',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-default',
                        prevEl: '.swiper-button-prev-default',
                    }
                });
            }

            /* (3) Hero header swiper parallax */
            _swiper_parallax_header() {
                let swiper = new Swiper(this.wrapper_slider, {
                    loop: true,
                    speed: 1500,
                    parallax: true,
                    pagination: {
                        el: '.swiper-pagination-bullets-default',
                        type: 'bullets',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-default',
                        prevEl: '.swiper-button-prev-default',
                    },
                    breakpoints: {
                        767: {
                            parallax: false,
                        },
                    }
                });
            }

            /* (3.1) Hero header init */
            INIT(hero_type) {
                switch (hero_type) {
                    case 'canvas_circles' :
                        this._particles_snow_header();
                        break;
                    case 'canvas_color_particles' :
                        this._particles_color_header();
                        break;
                    case 'canvas_default_particles' :
                        this._particles_default_header();
                        break;
                    case 'canvas_circles_particles' :
                        this._particles_circles_header();
                        break;
                    case 'canvas_gravity_particles' :
                        this._particles_gravity_header();
                        break;
                    case 'canvas_3d_particles' :
                        this._particles_3d_header();
                        break;
                    case 'canvas_wave_particles' :
                        this._particles_wave_header();
                        break;
                    case 'canvas_connect_particles' :
                        this._particles_connect_header();
                        break;
                    case 'canvas_confetti_particles' :
                        this._particles_confetti_header();
                        break;
                    case 'canvas_moving_particles' :
                        this._particles_moving_header();
                        break;
                    case 'youtube_video' :
                        this._youtube_header();
                        break;
                    case 'slider_default' :
                        this._swiper_default_header();
                        break;
                    case 'slider_vertical' :
                        this._swiper_vertical_header();
                        break;
                    case 'slider_cube' :
                        this._swiper_cube_header();
                        break;
                    case 'slider_fade' :
                        this._swiper_fade_header();
                        break;
                    case 'slider_coverflow' :
                        this._swiper_coverflow_header();
                        break;
                    case 'slider_flip' :
                        this._swiper_flip_header();
                        break;
                    case 'slider_parallax' :
                        this._swiper_parallax_header();
                        break;
                }
                this._arrow_down();
            }
        }

        /* [4] Navbar general */
        class NAV {
            /* (1) Constructor */
            constructor() {
                this.root = COMMON.doc.querySelector(':root');
                this.navbar = $('.navbar');
                this.navbar_toggle = this.navbar.find('.hamburger');
                this.menu = this.navbar.find('.navbar-menu');
                this.menu_list = this.menu.find('.navbar-menu-list');
                this.navbar_search = $('.navbar-search');
                this.navbar_search_form = $('.search-form');
                this.navbar_search_button = $('.search-input');
                this.social_side = $('.navbar-additional');
                /* OPTIONAL(DEMO ONLY) START */
                this.toolbar = $('.toolbar');
                this.toolbar_toggle = $('.toolbar-toggle');
                this.navbar_type = $('.header-type');
                this.footer_type = $('.footer__type');
                this.hamburger_type = $('.hamburger__type');
                this.logo_position = $('.logo-position');
                this.color_theme_option = $('.color_scheme');
                this.footer = $('footer');
                /* OPTIONAL(DEMO ONLY) END */
            }

            /* (1.1) Mobile test */
            _mobile_check() {
                if (VIEWPORT.w < mobile_point) {
                    this.navbar.addClass('mobile-menu');
                    this.navbar.removeClass('desktop-menu');
                } else if (VIEWPORT.w >= mobile_point) {
                    this.navbar.removeClass('mobile-menu');
                    this.navbar.addClass('desktop-menu');
                }
            }

            /* (1.2) Mobile menu */
            _mobile_menu() {
                let primary_items = this.menu.find('.menu-primary-item');
                let mobile_items = this.menu.find('.mobile-menu-toggle');
                let item_count = primary_items.length;
                this._mobile_check();
                $(COMMON.win).resize(() => {
                    this._mobile_check();
                });
                this.navbar_toggle.on('click', () => {
                    this.menu.slideToggle(250);
                    let sub_menus = this.menu.find('.sub-menu');
                    let megamenu = this.menu.find('.megamenu');
                    this.navbar_toggle.toggleClass('is-active');
                    if (!this.navbar_toggle.hasClass('is-active')) {
                        sub_menus.slideUp('fast');
                        megamenu.slideUp('fast');
                        sub_menus.removeClass('active-sub-menu-toggle');
                        megamenu.removeClass('active-sub-menu-toggle');
                        mobile_items.removeClass('active-mobile-menu-toggle');
                    } else {
                        let item_height = $('.menu-primary-item').height();
                        let menu_height = item_height * item_count + item_count;
                        this.menu.css({
                            'max-height': menu_height
                        });
                    }
                    /* OPTIONAL(DEMO ONLY) START */
                    this.toolbar.removeClass('active_toolbar');
                    this.toolbar_toggle.removeClass('active_toolbar_toggle');
                    /* OPTIONAL(DEMO ONLY) END */
                });
            }

            /* (1.3) Sub menus */
            _sub_menus() {
                let items_has_children = this.menu.find('.menu-item-has-children');
                let mobile_items = this.menu.find('.mobile-menu-toggle');
                if ($(COMMON.win).innerWidth() > 992) {
                    items_has_children.hover(function () {
                        let sub_menus = $(this).find('.sub-menu');
                        $(sub_menus[0]).toggleClass('active-sub-menu');
                    }, function () {
                        let sub_menus = $(this).find('.sub-menu');
                        $(sub_menus[0]).toggleClass('active-sub-menu');
                    });
                } else {
                    mobile_items.on('click', function () {
                        let sub_menus = $(this).parent().find('.sub-menu');
                        let mega_menus = $(this).parent().find('.megamenu');
                        let inside_items = $(this).parent().parent().find('.mobile-menu-toggle');
                        if (!$(this).hasClass('active-mobile-menu-toggle')) {
                            let active_sub_menus = $(this).parent().parent().find('.active-sub-menu-toggle');
                            $(inside_items).removeClass('active-mobile-menu-toggle');
                            $(active_sub_menus).slideUp('fast');
                            $(this).addClass('active-mobile-menu-toggle');
                            $(sub_menus[0]).slideDown('fast');
                            $(sub_menus[0]).addClass('active-sub-menu-toggle');
                            $(mega_menus[0]).slideDown('fast');
                            $(mega_menus[0]).addClass('active-sub-menu-toggle');
                        } else {
                            $(this).parent().find('.sub-menu').slideUp('fast');
                            $(this).parent().find('.megamenu').slideUp('fast');
                            $(this).removeClass('active-mobile-menu-toggle');
                            $(sub_menus).removeClass('active-sub-menu-toggle');
                            $(mega_menus).removeClass('active-sub-menu-toggle');
                        }
                    });
                }
            }

            /* (1.4) Navbar search */
            _navbar_search() {
                let input = this.navbar_search_form.find('input');
                let icon_on = this.navbar_search_button.find('.search-icon');
                let icon_off = this.navbar_search_button.find('.search-times');
                let social_width;
                let width;
                if (this.social_side.length) {
                    social_width = this.social_side.outerWidth(true);
                }

                this.navbar_search_button.on('click', () => {

                    /* OPTIONAL(DEMO ONLY) START */
                    this.social_side.css({
                        'transition': 'all .3s ease-in-out'
                    });
                    this.navbar_search.css({
                        'transition': 'all .3s ease-in-out'
                    });
                    /* OPTIONAL(DEMO ONLY) END */

                    input.toggleClass('active-form');
                    icon_on.toggleClass('icon-off');
                    icon_off.toggleClass('times-active');
                    this.navbar.toggleClass('navbar-additional-disable');
                    width = social_width || 180;
                    if (input.hasClass('active-form')) {
                        if (logo_position === 'logo-left') {
                            input.css({
                                'width': width + 'px',
                                'margin-right': '-' + width + 'px'
                            });
                            this.navbar_search.css({
                                'transform': 'translateX(-' + width + 'px)'
                            });
                            if (!this.social_side.length) {
                                this.menu_list.css({
                                    'margin-right': '200px'
                                });
                            }
                        } else if (logo_position === 'logo-right') {
                            input.css({
                                'width': width + 'px',
                                'margin-left': '-' + (width + 50) + 'px'
                            });
                            this.navbar_search.css({
                                'transform': 'translateX(' + width + 'px)'
                            });
                            if (!this.social_side.length) {
                                this.menu_list.css({
                                    'margin-left': '200px'
                                });
                            }
                        }
                    } else if (!input.hasClass('active-form')) {
                        if (logo_position === 'logo-left') {
                            input.css({
                                'width': '0',
                                'margin-right': '0'
                            });
                            this.navbar_search.css({
                                'transform': 'translateX(0px)'
                            });
                            if (!this.social_side.length) {
                                this.menu_list.css({
                                    'margin-right': '20px'
                                });
                            }
                        } else if (logo_position === 'logo-right') {
                            input.css({
                                'width': '0',
                                'margin-left': '0'
                            });
                            this.navbar_search.css({
                                'transform': 'translateX(0px)'
                            });
                            if (!this.social_side.length) {
                                this.menu_list.css({
                                    'margin-left': '20px'
                                });
                            }
                        }
                    }
                });
            }

            /* (1.5) Navbar type */
            // To make the navbar solid in some pages and transparent in some pages
            _navbar_type() {
                if (VIEWPORT.w >= mobile_point) {
                    var check_navbar_y = document.getElementById('nav-head').classList;
                    if ($(COMMON.win).scrollTop() >= 100) {
                        if(!check_navbar_y.contains("navbar-fill")){
                            this.navbar.addClass(navbar_type);
                        }
                        logo_light.css({
                            'display': 'none'
                        });
                        logo_dark.css({
                            'display': 'block'
                        });
                    } else if ($(COMMON.win).scrollTop() < 100) {
                        if(check_navbar_y.contains("navbar-fill")&&check_navbar_y.contains("navbar-additional")){
                            this.navbar.removeClass(navbar_type);
                        }
                        logo_light.css({
                            'display': 'block'
                        });
                        logo_dark.css({
                            'display': 'none'
                        });
                    }
                }
            }

            /* OPTIONAL(DEMO ONLY) START */
            _toolbar() {
                this.toolbar_toggle.on('click', () => {
                    this.toolbar.toggleClass('active_toolbar');
                    this.toolbar_toggle.toggleClass('active_toolbar_toggle');
                });

            }

            _btn_toggle(parent) {
                let btn = parent.find('.option_btn');
                btn.on('click', function () {
                    btn.removeClass('option_btn_active');
                    btn.addClass('option_btn_off');
                    $(this).toggleClass('option_btn_off');
                    $(this).toggleClass('option_btn_active');
                });
            }

            _btn_small_toggle(parent) {
                let btn = parent.find('.option_btn_small');
                btn.on('click', function () {
                    btn.removeClass('option_btn_small_active');
                    btn.addClass('option_btn_small_off');
                    $(this).toggleClass('option_btn_small_off');
                    $(this).toggleClass('option_btn_small_active');
                });
            }

            _header_type_option() {
                this._btn_toggle(this.navbar_type);
                let btn = this.navbar_type.find('.option_btn');
                let navbar = this.navbar;
                btn.on('click', function () {
                    navbar_type = $(this).data('header-type');
                    navbar.removeClass('navbar-fade navbar-small navbar-scroll');
                });
                btn.on('click', () => {
                    this._navbar_type();
                });
            }

            _logo_position_option() {
                this._btn_toggle(this.logo_position);
                let btn = this.logo_position.find('.option_btn');
                let navbar = this.navbar;
                let social = this.social_side;
                let navbar_search = this.navbar_search;
                let input = this.navbar_search_form.find('input');
                let icon_on = this.navbar_search_button.find('.search-icon');
                let icon_off = this.navbar_search_button.find('.search-times');
                btn.on('click', function () {
                    input.removeClass('active-form');
                    icon_on.removeClass('icon-off');
                    icon_off.removeClass('times-active');
                    navbar.removeClass('navbar-additional-disable');
                    input.css({
                        'width': '0',
                        'margin-left': '0',
                        'margin-right': '0',
                    });
                    navbar_search.css({
                        'transform': 'translateX(0px)'
                    });
                    social.css({
                        'transition': 'none'
                    });
                    navbar_search.css({
                        'transition': 'none'
                    });
                    logo_position = $(this).data('logo-position');
                    navbar.removeClass('logo-left logo-right');
                    navbar.addClass(logo_position);
                });
            }

            _footer_type_option() {
                this._btn_toggle(this.footer_type);
                let btn = this.footer_type.find('.option_btn');
                let footer = this.footer;
                btn.on('click', function () {
                    let footer_type = $(this).data('footer-type');
                    footer.removeClass('footer-light footer-dark');
                    $(footer).addClass(footer_type);
                });
            }

            _hamburger_type() {
                this._btn_small_toggle(this.hamburger_type);
                let btn = this.hamburger_type.find('.option_btn_small');
                let toggle = this.navbar_toggle;
                btn.on('click', function () {
                    let type = $(this).data('hamburger');
                    toggle.removeClass();
                    toggle.addClass('hamburger justify-content-center align-items-center');
                    toggle.addClass(type);
                });
            }

            _color_scheme() {
                let color_button = this.color_theme_option.find('div');
                let root = this.root;
                for (let i = 0; i < color_button.length; i++) {
                    let bg_button = $(color_button[i]).data('color-scheme');
                    $(color_button[i]).css({
                        'background-color': bg_button
                    });
                }
                color_button.on('click', function () {
                    color_scheme_color = $(this).data('color-scheme');
                    root.style.setProperty('--primary_color', color_scheme_color);
                    let svg = $('.skills-wrapper svg');
                    let path = $(svg).find('path:eq(-1)');
                    path.attr('stroke', color_scheme_color);
                });
            }

            /* OPTIONAL(DEMO ONLY) END */

            /* Navbar init */
            INIT() {
                this.navbar.addClass(logo_position);
                this._navbar_type();
                $(COMMON.win).scroll(() => {
                    this._navbar_type();
                });
                this._mobile_check();
                this._mobile_menu();
                this._sub_menus();
                this._navbar_search();
                /* OPTIONAL(DEMO ONLY) START */
                this._toolbar();
                this._color_scheme();
                this._logo_position_option();
                this._header_type_option();
                this._footer_type_option();
                this._hamburger_type();
                /* OPTIONAL(DEMO ONLY) END */
            }
        }        

        /* [5] Declaration of constants for main classes */
        const HERO_HEADER = new HERO();
        const NAVIGATION = new NAV();

        /* [6] Init main classes */
        HERO_HEADER.INIT(hero_type);
        NAVIGATION.INIT();

        /* [7] Images Loaded */
        $(COMMON.body).imagesLoaded({background: '.bg_img'}, function () {
            isotope_grid_init(isotope_grid, button_group);
            loader.addClass('off_loader');
            wrapper.addClass('on_wrapper');
            AOS.init();
            /* [8] Sizes flip cards init */
            sizes_flip_cards(flip_section);

            /* [9] Sizes flip cards reinit */
            $(COMMON.win).resize(function () {
                sizes_flip_cards(flip_section);
            });
        });

        /* [10] Tabs init */
        if (tabs_wrapper.length) {
            for (let i = 0; i < tabs_wrapper.length; i++) {
                tabs_init(tabs_wrapper[i]);
            }
        }

        /* [11] Accordions init */
        if (accordions_wrapper.length) {
            for (let i = 0; i < accordions_wrapper.length; i++) {
                accordion_init(accordions_wrapper[i], 'fast');
            }
        }

        /* [12] Counters init */
        if (counters_wrapper.length) {
            for (let i = 0; i < counters_wrapper.length; i++) {
                let count = $(counters_wrapper[i]).find('.counter-box').length;
                counters_init(counters_wrapper[i], count);
            }
        }

        /* [13] Progress bars init */
        $(progress_bar).waypoint(() => {
            if (progress_check) {
                progress_check = false;
                if (progress_bar_count > 0) {
                    for (let i = 1; i < progress_bar_count + 1; i++) {
                        let progress = $(progress_bar + i).data('progress');
                        progress_bars_init(progress_bar + i, progress);
                    }
                }
            }
        }, {offset: '100%'});

        /* [14] Footer type init */
        footer.addClass(footer_type);

        /* [15] Color scheme */
        root.style.setProperty('--primary_color', color_scheme_color);

        /* [16] Map toggle init */
        map_toggle_init(map, map_toggle, 400);

        /* [17] Parallax init */
        parallax_init(parallax_background);

        /* [18] Gallery init */
        gallery_init(gallery);

        /* [19] Image modal init */
        image_modal_init(image_modal);

        /* [20] Video modal init */
        video_modal_init(video_modal);

        /* [21] Swiper init */
        swiper_init();

        /* [22] 3d-hover for elements init */
        if (VIEWPORT.w >= mobile_point) {
            if (hover3d.length) {
                $(hover3d).hover3d({
                    selector: ".hover3d-child"
                });
            }
        }

        /* [23] Ajax contact form init */
        ajax_contact_init();

        //DEMO
        $(".anchor-link").on("click", function (event) {
            event.preventDefault();

            let id = $(this).attr('href'),

                top = $(id).offset().top;

            $('body,html').animate({scrollTop: top}, 1500);
        });

    });

})();
