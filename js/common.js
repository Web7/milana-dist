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

	var initLeftSideMenu = function() {
		var $body = $(document.body);
		var $milOffCanvasBtn = $('.mil-offcanvas-btn');
		var $dataTarget = $($milOffCanvasBtn.attr('data-target') || null);

		if ($dataTarget.exists()) {
			if (window.outerWidth > 1200) {
				$dataTarget.addClass('show');
			} else {
				$dataTarget.removeClass('show');
			}
			$body.removeClass('off-canvas-backdrop').css('overflow', 'auto');
		}
	};

	$(function () {
		var $dropdownScrollbar = $('.dropdown-scrollbar');
		var $milScrollBar = $('.mil-scroll-bar');
		var $offCanvas = $('.off-canvas');
		var $milMainCarousel = $('.mil-main-carousel');
		var $milProductCarouselSlick = $('.mil-product-carousel-slick');
		var $milMainCenterCarouselSlick = $('.mil-main-center-carousel-slick');

		var sticky = new Sticky('.sticky-container');

		initLeftSideMenu();

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
			$milProductCarouselSlick.each(function() {
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

		// dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
		// dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
		// 	return new Dropdown(dropdownToggleEl);
		// });
		// console.log(dropdownList);
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
		if (window.outerWidth > 1200) {
			return;
		}
		$this.toggleClass('open');
		$dataTarget.toggleClass('show');//.css('visibility', $dataTarget[0].style.visibility === 'hidden' ? 'visible' : 'hidden');
		$(document.body).toggleClass('off-canvas-backdrop').css('overflow', !$dataTarget.hasClass('show') ? 'auto' : 'hidden');

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	var closeDropdown = function() {
		var $dropdownToggle = $('.dropdown-toggle.show');
		var $dropdownMenu = $('.dropdown-menu.show');

		if (!$dropdownToggle.exists() && !$dropdownMenu.exists()) {
			return;
		}

		$dropdownToggle.removeClass('show');
		$dropdownMenu.removeClass('show');
	};

	$(document).on('click', '.dropdown-toggle', function (e) {
		// var $this = $(this);
		// var $dropdown = $this.closest('.dropdown');
		// var $dropdownMenu = $dropdown.find('.dropdown-menu');
		//
		// if (!$dropdownMenu.hasClass('show')) {
		// 	closeDropdown();
		// }
		//
		// $this.toggleClass('show');
		// $dropdownMenu.toggleClass('show');

		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	$(document).on('click', function(e){
		var target = e.target || e.srcElement;
		var $this = $(target);
		var $dropdownMenu = $this.hasClass('dropdown-menu') ? $this : $this.closest('.dropdown-menu');
		if ($dropdownMenu.exists()) {
			return;
		}
		closeDropdown();
	});

	$(window).on('resize', function () {
		initLeftSideMenu();
	});

}, window.jQuery, window.Zepto));
