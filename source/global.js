/* radiobuttons */
$(document).on('change', '.__radiobuttons input', function () {
    if ($(this).is(':checked')) {
        $(this).closest('.__radiobuttons').find('.input_wrap > label').removeClass('__checked')
        $(this).parent().addClass('__checked');
    }
});
$('.__radiobuttons input:checked').parent().addClass('__checked');

/* checkboxes */
$(document).on('change', '.__checkboxes input', function () {
    if ($(this).is(':checked')) {
        $(this).parent().addClass('__checked');
    } else {
        $(this).parent().removeClass('__checked');
    }
});
$('.__checkboxes input:checked').parent().addClass('__checked');

$('.bannerslider-slide').focus(
    function () {
        $('.bannerslider').addClass('__focussed');
    }).blur(
        function () {
            $('.bannerslider').removeClass('__focussed');
        });

/* tabpanel */
$(function () {
    var tab = $('.tabpanel-tab');
    var panel = $('.tabpanel-panel');

    tab.eq(0).addClass('__active');
    tab.eq(0).attr('aria-selected', true);
    panel.eq(0).addClass('__active');
    panel.eq(0).attr('aria-expanded', true);

    tab.click(function (event) {
        event.preventDefault();
        tab.removeClass('__active');
        tab.attr('aria-selected', false);
        $(this).addClass('__active');
        $(this).attr('aria-selected', true);
        var data_set = $(this).data('set');
        panel.removeClass('__active');
        panel.attr('aria-expanded', false);
        panel.filter('[data-set="' + data_set + '"]').addClass('__active');
        panel.filter('[data-set="' + data_set + '"]').attr('aria-expanded', true);
    });
});

/* accordion */
$(function () {
    $('.accordion').each(function (i, accordion) {
        var accordionTrigger = '.accordion-head';
        var accordionContent = '.accordion-content';
        var findAccordionTrigger = $(this).find(accordionTrigger);
        var findAccordionContent = $(this).find(accordionContent);

        // Apply ARIA and display values on load
        if ($(this).hasClass('__active')) {
            findAccordionTrigger.attr('aria-expanded', true);
            findAccordionContent.show();
            findAccordionContent.attr('aria-hidden', false);
        } else {
            findAccordionTrigger.attr('aria-expanded', false);
            findAccordionContent.hide();
            findAccordionContent.attr('aria-hidden', true);
        }

        // On click of accordion trigger
        findAccordionTrigger.click(function (e) {
            e.preventDefault();
            /* close an open accordion */
            if ($(this).parents('.accordion').hasClass('__active')) {
                $(this).attr('aria-expanded', false);
                $(this).parents('.accordion').removeClass('__active');
                findAccordionContent.slideUp(200);
                findAccordionContent.attr('aria-hidden', true);
            } /* open a closed accordion */ else {
                $(this).attr('aria-expanded', true);
                $(this).parents('.accordion').addClass('__active');
                findAccordionContent.slideDown(200);
                findAccordionContent.attr('aria-hidden', false);
            }
        });
    });
});


/* modal */
$(function () {
    var trigger = $('.ModalTrigger');
    var modal = $('.modalblock');
    var close = modal.find('.modalblock-close');

    trigger.click(function (event) {
        event.preventDefault();
        var modal_id = $(this).data('modal')
        modal.filter('[data-modal="' + modal_id + '"]').addClass('__active');
    });

    close.click(function () {
        modal.removeClass('__active');
    });

    $(window).click(function (event) {
        if (event.target.className == "modalblock __active") {
            modal.removeClass('__active');
        }
    });
});

/* searchtoggle */
$(function () {
    var search_toggle = $('.searchtoggle');
    var wrapper = $('.wrapper');

    search_toggle.click(function (event) {
        event.preventDefault();
        $(this).toggleClass('__active');
        wrapper.toggleClass('__searchactive');
        $('#SearchInput')[0].focus();
    });
});

/* Main Menu */
$(function () {
    var body = $('body');
    var burger = $('.burger');
    var nav_trigger = $('.nav').find('ul li');
    var break_point = 992;
    var browser_width = window.innerWidth;
    var nav_window = $('<div class="navwindow"></div>');
    body.append(nav_window);
    var nav_wrap = $('.navwrap');

    nav_window.click(function (event) {
        nav_reset();
    });

    //burger click
    burger.click(function (event) {
        event.preventDefault();
        $(this).toggleClass('__active');
        if (body.hasClass('__mobile')) {
            nav_reset();
        } else {
            nav_launch();
        };
    });

    /*nav reset*/
    var nav_reset = function nav_reset() {
        burger.removeClass('__active');
        nav_window.hide();
        body.removeClass('__mobile');
        nav_wrap.removeClass('__active');
        nav_wrap.find('ul').removeClass('__active');
    };

    /*nav launch*/
    var nav_launch = function nav_launch() {
        nav_window.show();
        body.addClass('__mobile');
        nav_wrap.addClass('__active');
    };

    var backMenuClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).parent('ul').removeClass('__active');
        $(this).parents('li').parent('ul').addClass('__active');

        if ($('.new-mega-nav').length != 0) {
            $(this).closest('.new-megamenu').removeClass('__active');
        }
    };

    var viewAllCick = function () {
        var parent_url = $(this).closest('ul').siblings().attr('href');
        var parent_title = $(this).closest('ul').siblings().html();
        $(this).find('a').attr('href', parent_url);
        $(this).find('a').html(parent_title);
    };

    if (browser_width < break_point) {
        nav_trigger.click(function (event) {
            event.stopPropagation();
            if (!$(event.target).hasClass('mega-nav-direct-link') && $(this).children('ul').length > 0) {
                event.preventDefault();
                $(this).parents('ul').removeClass('__active');
                $(this).children('ul').addClass('__active');
            };
        });
    };
    var navigationWithBackAndView;
    var view_button;
    var back_button;
    if ($('.dwl-mega-nav').length != 0) {
        navigationWithBackAndView = $('.has-children ul.child-nav');
        $.merge(navigationWithBackAndView, $('.has-children ul.child-nav ul.sub-child-nav'))
        back_button = $('<div class="new-nav-backto backto"><a class="back-link" href="#"></a><div class="viewall"><a class="view-all-link" href="#">View new</a></div>');

        var newBackto = $('.new-nav-backto');
        var newNext = $('.new-megamenu-sub-trigger');
        newBackto.click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parents('li').parent('ul').addClass('__active');

            if ($('.new-mega-nav').length != 0) {
                $(this).closest('.new-megamenu').removeClass('__active');
            }
        });
        newNext.click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(event.target).next().addClass('__active');

            if ($('.new-mega-nav').length != 0) {
                $(this).closest('.new-megamenu').removeClass('__active');
            }
        });
    }
    else {
        navigationWithBackAndView = $('.nav ul li > ul');
        back_button = $('<li class="backto"><a href="#">Back</a></li>');
        view_button = $('<li class="viewall"><a href="#">View</a></li>');
    }

    if (browser_width < break_point) {
        navigationWithBackAndView.prepend(view_button);
        navigationWithBackAndView.prepend(back_button);
    };

    var back_menu = $('.backto');
    back_menu.click(backMenuClick);

    var view_all = $('.viewall');
    view_all.each(viewAllCick);

    view_all.click(function (event) {
        event.stopPropagation();
    });


});

/* sidemenu */
$(function () {
    var toggle = $('.sidemenu-toggle');
    toggle.click(function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('__active');
        $(this).siblings().slideToggle();
    });
});

/* ScrollTo */
(function () {
    $.fn.scrollto = function (options) {
        var settings = $.extend({
            trigger: '#ScrollTo',
            scroll_to: '.wrapper',
            speed: 1000,
        }, options);
        $(settings.trigger).click(function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $(settings.scroll_to).offset().top,
            }, settings.speed);
        });
    }
})();
$('#ScrollTo').scrollto({
    trigger: '#ScrollTo',
    scroll_to: '.wrapper',
    speed: 300,
});

/*share*/
$(function () {
    // var share_toggle = $('.shareitem-trigger');
    var share_toggle = $('.shareitem');
    share_toggle.hover(function () {
        $(this).find('.shareitem-icons').toggleClass('__active');
    }, function () {
        $(this).find('.shareitem-icons').removeClass('__active');
    }
    );
});

/* search */
$(function () {
    $('.SearchToggle').on('click', function () {
        $('.searchicon.SearchToggle').attr('aria-expanded', function (i, attr) {
            return attr == 'false' ? 'true' : 'false'
        });
        $('.search').toggleClass('__active');
        $('.search').attr('aria-hidden', function (i, attr) {
            return attr == 'true' ? 'false' : 'true'
        });
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('.search').removeClass('__active');
            $('.search').attr('aria-hidden', 'true');
        }
    });
})

/* button effect */

$(function () {
    var taint, d, x, y;
    $(".button").mouseover(function (e) {
        var hit = false;

        if (!hit) {
            if ($(this).find(".button-hover").length == 0) {
                $(this).prepend("<div class='button-hover'></div>")
            } else {
                return;
            }
            taint = $(this).find(".button-hover");
            taint.removeClass("drop");
            if (!taint.height() && !taint.width()) {
                d = Math.max($(this).outerWidth(), $(this).outerHeight());
                taint.css({ height: d, width: d });
            }
            x = e.pageX - $(this).offset().left - taint.width() / 2;
            y = e.pageY - $(this).offset().top - taint.height() / 2;
            taint.css({ top: y + 'px', left: x + 'px' }).addClass("drop");
            hit = true;
        }
    });

    $('.button').mouseleave(function (e) {
        $(this).find('.button-hover').remove();
    })
});
$(function () {
    var taint, d, x, y;
    $(".shareblock-trigger").mouseover(function (e) {
        var hit = false;

        if (!hit) {
            if ($(this).find(".button-hover").length == 0) {
                $(this).prepend("<div class='button-hover'></div>")
            } else {
                return;
            }
            taint = $(this).find(".button-hover");
            taint.removeClass("drop");
            if (!taint.height() && !taint.width()) {
                d = Math.max($(this).outerWidth(), $(this).outerHeight());
                taint.css({ height: d, width: d });
            }
            x = e.pageX - $(this).offset().left - taint.width() / 2;
            y = e.pageY - $(this).offset().top - taint.height() / 2;
            taint.css({ top: y + 'px', left: x + 'px' }).addClass("drop");
            hit = true;
        }
    });

    $('.shareblock-trigger').mouseleave(function (e) {
        $(this).find('.button-hover').remove();
    })
});

/* Tabs */
$(function () {
    $('.Tabs').each(function () {
        var tabTriggers = $(this).find('.TabTrigger');
        var tabContents = $(this).find('.TabContent');

        var that = $(this);
        tabTriggers.click(function (e) {
            e.preventDefault();
            var index = $(this).index();
            that.find('.TabTrigger.__active').removeClass('__active');
            that.find('.TabContent.__active').removeClass('__active');
            $(this).addClass('__active');
            $(tabContents).eq(index).addClass('__active');

            if ($('.BlockSlider').length) {
                $('.BlockSlider').slick('setPosition', 0);
            }
            if ($('.IbmeSlider').length) {
                $('.IbmeSlider').slick('setPosition', 0);
            }
        });
    });
})

/* Animation toggles */
function setAnimateToggles(triggerVal) {
    var animateIn = $('.AnimateIn');
    var offsets = animateIn.map(function (i, item) {
        return $(item).offset().top;
    });

    function animateBlocks(scrollTop) {
        $(offsets).each(function (i, offset) {
            var onload = animateIn.eq(i).data('onload');

            if (onload == false) {
                if ((scrollTop + $(window).outerHeight() >= (offset + triggerVal)) && !animateIn.eq(i).hasClass('__active')) {
                    animateIn.eq(i).addClass('__active');
                }
            } else {
                if ((scrollTop + $(window).outerHeight() >= (offset + triggerVal) || $(window).outerHeight() >= offset + triggerVal) && !animateIn.eq(i).hasClass('__active')) {
                    animateIn.eq(i).addClass('__active');
                }
            }
        });
    }

    animateBlocks();

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        animateBlocks(scrollTop);
    }).scroll();
}

/* flexible content */
$(function () {
    $('.ImageGallery').slick({
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '20px',
        mobileFirst: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    centerPadding: '50px'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '100px'
                }
            },
            {
                breakpoint: 992,
                settings: {
                    centerPadding: '200px'
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: '350px'
                }
            }
        ]
    });
    $('.NewsGallery').slick({
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '20px',
        mobileFirst: true,
        nextArrow: '.imagegallery-controls-slidercontrols-next',
        prevArrow: '.imagegallery-controls-slidercontrols-prev',
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    centerPadding: '50px'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '100px'
                }
            },
            {
                breakpoint: 992,
                settings: {
                    centerPadding: '200px'
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: '350px'
                }
            }
        ]
    });
})

/* Toggle Active */
$(function () {
    $('.ToggleActive').on('click', function () {
        $(this).toggleClass('__active');
    })
})

$(".VideoModal").magnificPopup({
    removalDelay: 160,
    preloader: !1,
    fixedContentPos: !1,
    type: 'iframe'
})

$("#GallerySlider").magnificPopup({
    delegate: '.gallerywrap-img', // child items selector, by clicking on it popup will open
    type: 'image',
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    }
})
setTimeout(function () { $(".showfaq").click(); }, 1000);

/* Megamenu */
$(function () {
    $('.menu-megamenu').on('click', function (e) {
        $(e).preventDefault();
        $(this).children('.megamenu').toggleClass('__active');
    });
    $('.menu-item-has-children').focusin(function () {
        $(this).addClass('__active');
    });
    $('.menu-item-has-children').focusout(function () {
        $(this).removeClass('__active');
    });
})

/* banner slider only one slide, remove navigation and timer bar */
$(document).ready(function () {
    $('.bannerslider').each(function () {
        if ($(this).find('.bannerslider-slide').length <= 1) {
            $(this).addClass('__single-slide');
        }
    });
});

$(function () {
    objectFitImages('.teamlink-image');
    objectFitImages('.peoplelist-block .linkblock-image');
    objectFitImages('.__objectfit');
});


// Video pause play on hover/focus
$('.ibmeslider-slide')
    .mouseover(function () {
        if ($(this).find('video').length) {
            $(this)
                .find('video')
                .css('opacity', 1);
            $(this)
                .find('video')
                .get(0)
                .play();
        }
    })
    .mouseout(function () {
        if ($(this).find('video').length) {
            $(this)
                .find('video')
                .css('opacity', 0);
            $(this)
                .find('video')
                .get(0)
                .pause();
        }
    });
$('.ibmeslider-slide')
    .focusin(function () {
        if ($(this).find('video').length) {
            $(this)
                .find('video')
                .css('opacity', 1);
            $(this)
                .find('video')
                .get(0)
                .play();
        }
    })
    .focusout(function () {
        if ($(this).find('video').length) {
            $(this)
                .find('video')
                .css('opacity', 0);
            $(this)
                .find('video')
                .get(0)
                .pause();
        }
    });


/* interactive tour flex block */
$('.interactivetour-slides-item-content-toggle').on('click', function () {
    $(this).next('.interactivetour-slides-item-content-more').slideToggle();
    $(this).toggleClass('__active');
    if ($(this).attr('aria-expanded') != 'true') {
        $(this).attr('aria-expanded', 'true');
        $(this).text("Read less");
    } else {
        $(this).attr('aria-expanded', 'false');
        $(this).text("Read more");
    }
});

/* interactive tour main sliders */
$('.interactivetour-slides').each(function (i, item) {
    var carouselId = "tourcarousel" + i;
    this.id = carouselId;
    var tourClassFor = '#' + carouselId + 'nav';
    $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: false,
        draggable: false,
        swipe: false,
        asNavFor: tourClassFor
    });
});

$('.interactivetour-nav').each(function (i, item) {
    var carouselId = "tourcarousel" + i;
    this.id = carouselId + 'nav';
    var tourClass = '#' + carouselId;
    $(this).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        focusOnSelect: true,
        asNavFor: tourClass,
        centerMode: true,
        centerPadding: '300px',
        prevArrow: $(this).closest('.interactivetour ').find('.sliderPrevButton'),
        nextArrow: $(this).closest('.interactivetour ').find('.sliderNextButton'),
        responsive: [
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 6,
                    centerPadding: '0px',
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    centerPadding: '0px',
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '0px',
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '0px',
                }
            }
        ]
    });
});

/* interactive tour media sliders */
$('.interactivetour .slide-media').each(function (i, item) {
    var carouselId = "carousel" + i;
    this.id = carouselId;
    var mediaClassFor = '#' + carouselId + 'nav';
    $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: false,
        asNavFor: mediaClassFor
    });
});

$('.interactivetour .slide-media-nav').each(function (i, item) {
    var carouselId = "carousel" + i;
    this.id = carouselId + 'nav';
    var mediaClass = '#' + carouselId;
    $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: true,
        vertical: true,
        focusOnSelect: true,
        asNavFor: mediaClass
    });
});
