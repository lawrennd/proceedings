// Put your JS here

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function ($) {
    // Use this variable to set up the common and page specific functions. If you
    // rename this variable, you will also need to rename the namespace below.
    var mirai = {
        // All pages
        common: {
            init: function () {

                // Reset Nav
                function resetNav() {
                    $('body, .nav-mobile, .menu-trigger span').removeClass('mobile-menu-active');
                };

                // Functions to run on load
                $(document).ready(function () {
                });

                // Functions to run on window resize
                // Length checks to see if page has these elements before running costly JavaScript resources
                $(window).resize(function () {
                    resetNav();
                });

                // Smooth scroll to links
                $('a[href*="#"]:not([href="#"])').click(function () {
                    var offset = -0; // <-- change the value here

                    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length) {
                            $('html, body').animate({
                                scrollTop: target.offset().top + offset
                            }, 1000);
                            return false;
                        }
                    }
                });

                // Mobile Trigger to open Mobile Menu
                $('.menu-trigger').click(function () {
                    $(this).toggleClass('menu-open');
                    $('body, .nav-mobile').toggleClass('mobile-menu-active');
                });

                $('.mobile-menu-exit').click(function () {
                    $('.block__hero .menu-trigger').removeClass('menu-open');
                    $('body, .nav-mobile').removeClass('mobile-menu-active');
                });

                // Submenu Functionality
                $('.nav-primary > li').click(function () {
                    var $this = $(this),
                        $ul = $('> ul', this);

                    if (!$ul.hasClass('menu-active')) {
                        // Add class to current list item
                        $this.addClass('menu-active');

                        // Slide down used for mobiles
                        $ul.toggleClass('menu-active').slideDown();
                    } else {
                        $this.removeClass('menu-active');

                        $ul.removeClass('menu-active');
                    }
                });

                // Mobile Nav Submenu
                $('.nav-mobile li svg').click(function () {
                    $(this).closest('li').addClass('open');
                });

                $('.nav-mobile li .submenu .back').click(function () {
                    $(this).closest('li').removeClass('open');
                });

                // Hide Sub Menu when clicking outside
                $(document).click(function (e) {
                    if (document.documentElement.clientWidth > 900) {
                        e.stopPropagation();
                        var container = $('.nav-primary');

                        //check if the clicked area is dropDown or not
                        if (container.has(e.target).length === 0) {
                            $('.nav-primary li, .sub-menu').removeClass('menu-active');
                        }

                        if ($('.search-form-wrapper').hasClass('search-form-wrapper--open')) {
                            $('.search-form-wrapper').removeClass('search-form-wrapper--open');
                            $('body').removeClass('search-form-open');
                        };
                    }
                });

                // Accessible Keyboard Arrow Navigation
                var menuItemFocus = false;
                document.addEventListener('keydown', function (event) {
                    // Arrow Keys on Menu
                    if (event.keyCode == 37) {
                        if (menuItemFocus == true) {
                            jQuery.tabPrev();
                        };
                    } else if (event.keyCode == 39) {
                        if (menuItemFocus == true) {
                            jQuery.tabNext();
                        };
                    };

                    // Search bar close on escape key
                    if (event.keyCode == 27) {
                        if ($('body').hasClass('search-form-open')) {
                            jQuery.tabPrev();
                            $('.search-form-wrapper').removeClass('search-form-wrapper--open');
                            $('body').removeClass('search-form-open');
                        };
                    };

                    // Search bar close on tab key
                    if (event.keyCode == 9) {
                        if ($('body').hasClass('search-form-open')) {
                            $('.search-form-wrapper').removeClass('search-form-wrapper--open');
                            $('body').removeClass('search-form-open');
                        };
                    };
                });

                // Listen to elements that are focused
                // Get current tabbed element, check if it has a class
                // If true set global var 'menuItemFocus' to true
                document.addEventListener('focus', function () {
                    var focusedElement = document.activeElement;
                    var focusedElementParent = $(focusedElement).parent();
                    if ($(focusedElementParent).hasClass('menu-item')) {
                        menuItemFocus = true;
                    } else {
                        menuItemFocus = false;
                    };
                }, true);

                // Search Form Functionality
                $('.search-form-wrapper').click(function (e) {
                    e.stopPropagation();
                    $(this).addClass('search-form-wrapper--open');
                    $('body').addClass('search-form-open');
                    jQuery.tabNext();
                });

                $('.search-form-wrapper').keypress(function (event) {
                    if (event.keyCode === 13) {
                        $(this).addClass('search-form-wrapper--open');
                        $('body').addClass('search-form-open');
                        jQuery.tabNext();
                    };
                });

                $('.search-form-wrapper--open').click(function (e) {
                    e.stopPropagation();
                });

                $('.search-field').click(function (e) {
                    e.stopPropagation();
                });

                // Latest News/Events Toggle
                $('.latest-news-events__intro-toggle button').click(function () {
                    if (!$(this).hasClass('active')) {
                        var toggle = $(this).data('toggle');
                        $('.latest-news-events__intro-toggle button').removeClass('active');
                        $(this).addClass('active');
                        $('.latest-news-events__intro-link').removeClass('active');
                        $('.latest-news-events__intro-link-' + toggle).addClass('active');
                        $('.latest-news-events__listings').removeClass('active');
                        $('.latest-news-events__listings-' + toggle).addClass('active');
                    };
                });

                // Research Overview - Expand Summary
                $('.research-overview__short-expand button').click(function () {
                    $(this).closest('.block__research-overview').toggleClass('expanded');
                });

                // Resoruces Filter
                $('.resources__filter button').click(function () {
                    var filter = $(this).data('filter');
                    $('.resources__filter button').removeClass('active');
                    $(this).addClass('active');

                    $('.resources__resource').removeClass('active');
                    $('.resources__resource.' + filter).addClass('active');
                });

                // Intersection Observer
                if ('IntersectionObserver' in window) {
                    // Intersection Observer Callback Function
                    blockObserverCallback = function (entries, observer) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('in-view');
                                observer.unobserve(entry.target);
                            };
                        });
                    };

                    // Intersection Observer Options
                    var blockObserverOptions = {
                        root: null,
                        rootMargin: '0% 0% -30% 0%',
                        threshold: 0,
                    }

                    // Creation of Intersection Observer
                    var blockObserver = new IntersectionObserver(blockObserverCallback, blockObserverOptions);
                    // Intersection Observer Elements to observe
                    blockObserverElements = document.querySelectorAll('.block');
                    // Pass Elements to Observer
                    blockObserverElements.forEach(function (blockObserverElement) {
                        blockObserver.observe(blockObserverElement);
                    });

                } else {
                    blockObserverElements = document.querySelectorAll('.block');
                    blockObserverElements.forEach(function (blockObserverElement) {
                        blockObserverElement.classList.add('in-view');
                    });
                }

                // wrap embeds in div
                $('iframe[src^="https://www.youtube.com/embed/"]').wrap('<div class="embed"></div>');
                $('iframe[src^="https://player.vimeo.com/video"]').wrap('<div class="embed"></div>');

                // Google Map
                function new_map($el) {
                    // var
                    var $markers = $el.find('.marker');

                    // vars
                    var args = {
                        zoom: 18,
                        center: new google.maps.LatLng(0, 0),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        scrollwheel: false,
                        navigationControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        draggable: false,
                        styles: [{
                            "featureType": "all",
                            "elementType": "all",
                            "stylers": [{
                                "visibility": "on"
                            }]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "on"
                            }]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "administrative.neighborhood",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "landscape.man_made",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        {
                            "featureType": "landscape.natural",
                            "elementType": "all",
                            "stylers": [{
                                "visibility": "on"
                            }]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": [{
                                "visibility": "on"
                            }]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        },
                        ],
                    };

                    // create map
                    var map = new google.maps.Map($el[0], args);

                    // add a markers reference
                    map.markers = [];

                    // add markers
                    $markers.each(function () {
                        add_marker($(this), map);
                    });

                    // center map
                    center_map(map);

                    // return
                    return map;
                }

                function add_marker($marker, map) {
                    // var
                    var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

                    var icon = $marker.attr('data-icon');

                    // create marker
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        icon: 'https://sjcp.tlp.dev/wp-content/themes/SJCP/assets/images/map-pin.svg',
                    });

                    // add to array
                    map.markers.push(marker);

                    // if marker contains HTML, add it to an infoWindow
                    if ($marker.html()) {
                        // create info window
                        var infowindow = new google.maps.InfoWindow({
                            content: $marker.html(),
                        });

                        // show info window when marker is clicked
                        google.maps.event.addListener(marker, 'click', function () {
                            infowindow.open(map, marker);
                        });
                    }
                }

                function center_map(map) {
                    // vars
                    var bounds = new google.maps.LatLngBounds();

                    // loop through all markers and create bounds
                    $.each(map.markers, function (i, marker) {
                        var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

                        bounds.extend(latlng);
                    });

                    // only 1 marker?
                    if (map.markers.length == 1) {
                        // set center of map
                        map.setCenter(bounds.getCenter());
                        map.setZoom(18);
                    } else {
                        // fit to bounds
                        map.fitBounds(bounds);
                    }
                }

                // global var
                var map = null;

                $('.acf-map').each(function () {
                    // create map
                    map = new_map($(this));
                });
            },
            finalize: function () {
                // JavaScript to be fired on all pages, after page specific JS is fired
            },
        },
        // Home page
        home: {
            init: function () {
                // JavaScript to be fired on the home page
            },
            finalize: function () {
                // JavaScript to be fired on the home page, after the init JS
            },
        },
        // About us page, note the change from about-us to about_us.
        about_us: {
            init: function () {
                // JavaScript to be fired on the about us page
            },
        },
        contact: {
            init: function () { },
        },
    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire: function (func, funcname, args) {
            var fire;
            var namespace = mirai;
            funcname = funcname === undefined ? 'init' : funcname;
            fire = func !== '';
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === 'function';

            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function () {
            // Fire common init JS
            UTIL.fire('common');

            // Fire page-specific init JS, and then finalize JS
            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, 'finalize');
            });

            // Fire common finalize JS
            UTIL.fire('common', 'finalize');
        },
    };

    // Load Events
    $(document).ready(UTIL.loadEvents);
})(jQuery); // Fully reference jQuery after this point.