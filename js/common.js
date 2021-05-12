(function (factory, jQuery, Zepto) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object' && typeof Meteor === 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery || Zepto);
	}
}(function ($) {
	'use strict';

	$.fn.exists = function () {
		return this.length !== 0;
	};

	var dropdownElementList;
	var dropdownList;
	var scrollBars = {};
	var dropdownScrollbars = {};
	var $offcanvasScrollBar;
	var $navTabsPersonalArea, navTabsPersonalAreaScrollbar, navTabsPersonalAreaSlick;
	var stickyPersonalAreaNavTabs;

	var initLeftSideMenu = function () {
		var $body = $(document.body);
		var $milOffCanvasBtn = $('.mil-offcanvas-btn');
		var $dataTarget = $($milOffCanvasBtn.attr('data-target') || null);

		if ($dataTarget.exists()) {
			if (window.outerWidth >= 1200) {
				$dataTarget.addClass('show');
			} else {
				$dataTarget.removeClass('show');
			}
			$body.removeClass('off-canvas-backdrop').css('overflow', 'auto');
		}
	};

	var initNavTabsPersonalArea = function () {
		if (!$navTabsPersonalArea.exists()) {
			return;
		}

		if (window.outerWidth >= 768) {
			if (navTabsPersonalAreaSlick) {
				$navTabsPersonalArea.slick('unslick');
			}
			navTabsPersonalAreaScrollbar = new PerfectScrollbar($navTabsPersonalArea[0], {
				wheelPropagation: false
			});
		} else {
			if (navTabsPersonalAreaScrollbar) {
				navTabsPersonalAreaScrollbar.destroy();
			}

			navTabsPersonalAreaSlick = $navTabsPersonalArea.slick({
				focusOnSelect: true,
				dots: false,
				slidesToShow: 1,
				arrows: true,
				fade: true
			});
			var $active = $navTabsPersonalArea.find('.active');
			var $slickSlide = $active.closest('.slick-slide');
			$navTabsPersonalArea.slick('slickGoTo', parseInt($slickSlide.index()));
		}
	};

	var initStickyPersonalAreaNavTabs = function () {
		var options = {
			marginTop: 82
		};

		if (!$('.sticky-container').exists()) {
			return;
		}

		var outerWidth = window.outerWidth;
		if (stickyPersonalAreaNavTabs) {
			stickyPersonalAreaNavTabs.destroy();
		}

		if (outerWidth >= 768 && outerWidth < 1200) {
			options.marginTop = 91;
		}
		if (outerWidth >= 1200) {
			options.marginTop = 75;
		}

		stickyPersonalAreaNavTabs = new Sticky('.sticky-container', options);

	};

	var init = function () {
		initLeftSideMenu();
		initNavTabsPersonalArea();
		initStickyPersonalAreaNavTabs();
	};

	$(function () {
		var $dropdownScrollbar = $('.dropdown-scrollbar');
		var $milScrollBar = $('.mil-scroll-bar');
		var $milMainCarousel = $('.mil-main-carousel');
		var $offCanvas = $('.off-canvas');
		var $milProductCarouselSlick = $('.mil-product-carousel-slick');
		var $milMainCenterCarouselSlick = $('.mil-main-center-carousel-slick');
		var $dataMask = $('[data-mask]');
		var $offCanvasEnd = $('.offcanvas-end');
		var $dropdownToggle = $('.dropdown-toggle');

		$navTabsPersonalArea = $('.nav-tabs-personal-area');

		init();

		if ($offCanvas.exists()) {
			$offCanvas.css('visibility', 'visible')
		}

		if ($milMainCenterCarouselSlick.exists()) {
			$milMainCenterCarouselSlick.slick({
				dots: true,
				infinite: true,
				arrows: false,
				fade: true,
				cssEase: 'linear',
				autoplay: 7000
			})
		}

		if ($milProductCarouselSlick.exists()) {
			$milProductCarouselSlick.each(function () {
				var $this = $(this);
				$this.slick({
					dots: false,
					infinite: true,
					slidesToShow: 1,
					variableWidth: true,
					appendArrows: '.mil-product-carousel-position-' + $this.attr('data-type') + ' .mil-carousel-arrows'
				});
			});
		}

		if ($milScrollBar.exists()) {
			scrollBars = {};
			$milScrollBar.each(function () {
				var dataScrollIndex = this.getAttribute('data-scroll-index');
				scrollBars[dataScrollIndex] = new PerfectScrollbar(this, {
					wheelPropagation: false
				});
			});
		}

		if ($dropdownScrollbar.exists()) {
			dropdownScrollbars = {};
			$dropdownScrollbar.each(function () {
				var dataScrollIndex = this.getAttribute('data-scroll-index');
				dropdownScrollbars[dataScrollIndex] = new PerfectScrollbar(this, {
					wheelPropagation: false
				});
			});
		}

		if ($milMainCarousel.exists()) {
			$milMainCarousel.slick({
				dots: true,
				infinite: true,
				appendArrows: '.mil-carousel .mil-carousel-arrows',
				fade: true,
				cssEase: 'linear'
			})
		}

		if ($dataMask.exists()) {
			$dataMask.each(function () {
				var $this = $(this);
				$this.mask($this.attr('data-mask'), {});
			});

		}

		$offCanvasEnd = document.querySelector('.offcanvas-end');
		if ($offCanvasEnd) {
			$offCanvasEnd.addEventListener('show.bs.offcanvas', function () {
				$offcanvasScrollBar = new PerfectScrollbar('.offcanvas-scroll-bar', {
					wheelPropagation: false
				});
				$('body').css('overflow', 'hidden');
			});
			$offCanvasEnd.addEventListener('hide.bs.offcanvas', function () {
				$offcanvasScrollBar.destroy();
				$('body').css('overflow', 'auto');
			})
		}

		if ($dropdownToggle.exists()) {
			$dropdownToggle.each(function () {
				var dropdown = new Dropdown(this, {
					popperConfig: {
						placement: 'auto'
					}
				})
			});
		}
	});

	$(document).on('click', '.nav-sub-item > .nav-link', function (e) {
		var $this = $(this);
		var $navSubItem = $this.closest('.nav-sub-item');
		var $milScrollBar = $this.closest('.mil-scroll-bar');
		var dataScrollIndex = $milScrollBar.attr('data-scroll-index');
		$navSubItem.toggleClass('active');
		scrollBars[dataScrollIndex].update();

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(document).on('click', '.mil-offcanvas-btn', function (e) {
		var $this = $(this);
		var $dataTarget = $($this.attr('data-target') || null);
		if (!$dataTarget.exists()) {
			return;
		}
		if (window.outerWidth >= 1200) {
			return;
		}
		$this.toggleClass('open');
		$dataTarget.toggleClass('show');
		$(document.body).toggleClass('off-canvas-backdrop').css('overflow', !$dataTarget.hasClass('show') ? 'auto' : 'hidden');

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(window).on('resize', function () {
		init();
	});

}, window.jQuery, window.Zepto));
