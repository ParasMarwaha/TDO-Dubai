var ventic = function (){
	
	"use strict"
	/* Search Bar ============ */
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();

	var handleSelectPicker = function () {
		if (jQuery('.default-select').length > 0) {
			jQuery('.default-select').selectpicker();
		}
	}

	var handleImageSelect = function () {
		const $_SELECT_PICKER = $('.image-select');
		
		$_SELECT_PICKER.find('option').each((idx, elem) => {
			const $OPTION = $(elem);
			const IMAGE_URL = $OPTION.attr('data-thumbnail');
			if (IMAGE_URL) {
				$OPTION.attr('data-content', "<img src='%i'/> %s".replace(/%i/, IMAGE_URL).replace(/%s/, $OPTION.text()))
			}
		});
		$_SELECT_PICKER.selectpicker();
	}
	
	var handleMenuPosition = function () {
		if (screenWidth > 1024) {
			$(".metismenu  li").unbind().each(function (e) {
				if ($('ul', this).length > 0) {
					var elm = $('ul:first', this).css('display', 'block');
					var off = elm.offset();
					var l = off.left;
					var w = elm.width();
					var elm = $('ul:first', this).removeAttr('style');
					var docH = $("body").height();
					var docW = $("body").width();

					if (jQuery('html').hasClass('rtl')) {
						var isEntirelyVisible = (l + w <= docW);
					} else {
						var isEntirelyVisible = (l > 0) ? true : false;
					}

					if (!isEntirelyVisible) {
						$(this).find('ul:first').addClass('left');
					} else {
						$(this).find('ul:first').removeClass('left');
					}
				}
			});
		}
	}


	var handleTheme = function () {
		$('#preloader').fadeOut(1500);
		setTimeout(function () {
			$('#main-wrapper').addClass('show');
		}, 1500)
	}

	var handleMetisMenu = function () {
		if (jQuery('#menu').length > 0) {
			$("#menu").metisMenu();
		}
		jQuery('.metismenu > .mm-active ').each(function () {
			if (!jQuery(this).children('ul').length > 0) {
				jQuery(this).addClass('active-no-child');
			}
		});
	}

	var handleAllChecked = function () {
		$("#checkAll").on('change', function () {
			$("td input, .email-list .custom-checkbox input").prop('checked', $(this).prop("checked"));
		});

		$(".checkAllInput").on('click', function () {
			jQuery(this).closest('.ItemsCheckboxSec').find('input[type="checkbox"]').prop('checked', true);
		});
		$(".unCheckAllInput").on('click', function () {
			jQuery(this).closest('.ItemsCheckboxSec').find('input[type="checkbox"]').prop('checked', false);
		});
	}

	var handleNavigation = function () {
		const body = $('body');
		$(".nav-control").on('click', function () {
			$('#main-wrapper').toggleClass("menu-toggle");

			$(".hamburger").toggleClass("is-active");

			if (body.attr('data-sidebar-style') === 'full' && body.attr('data-layout') === 'vertical') {
				if ($('#main-wrapper').hasClass('menu-toggle')) {
					body.attr('data-sidebar-position', 'static');
				} else {
					body.attr('data-sidebar-position', 'fixed');
				}
			}

		});
	}

	var handleCurrentActive = function () {
		for (var nk = window.location,
			o = $("ul#menu a").filter(function () {

				return this.href == nk;

			})
				.addClass("mm-active")
				.parent()
				.addClass("mm-active"); ;) {

			if (!o.is("li")) break;

			o = o.parent()
				.addClass("mm-show")
				.parent()
				.addClass("mm-active");
		}
	}

	var handleMiniSidebar = function () {
		$("ul#menu>li").on('click', function () {
			const sidebarStyle = $('body').attr('data-sidebar-style');
			if (sidebarStyle === 'mini') {
				console.log($(this).find('ul'))
				$(this).find('ul').stop()
			}
		})
	}

	var handleDataAction = function () {
		$('a[data-action="collapse"]').on("click", function (i) {
			i.preventDefault(),
			$(this).closest(".card").find('[data-action="collapse"] i').toggleClass("mdi-arrow-down mdi-arrow-up"),
			$(this).closest(".card").children(".card-body").collapse("toggle");
		});

		$('a[data-action="expand"]').on("click", function (i) {
			i.preventDefault(),
			$(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-size-actual icon-size-fullscreen"),
			$(this).closest(".card").toggleClass("card-fullscreen");
		});

		$('[data-action="close"]').on("click", function () {
			$(this).closest(".card").removeClass().slideUp("fast");
		});

		$('[data-action="reload"]').on("click", function () {
			var e = $(this);
			e.parents(".card").addClass("card-load"),
				e.parents(".card").append('<div class="card-loader"><i class=" ti-reload rotate-refresh"></div>'),
				setTimeout(function () {
					e.parents(".card").children(".card-loader").remove(),
						e.parents(".card").removeClass("card-load")
				}, 2000)
		});
	}

	var handleHeaderHight = function () {
		const headerHight = $('.header').innerHeight();
		$(window).scroll(function () {
			if ($('body').attr('data-layout') === "horizontal" && $('body').attr('data-header-position') === "static" && $('body').attr('data-sidebar-position') === "fixed")
				$(this.window).scrollTop() >= headerHight ? $('.deznav').addClass('fixed') : $('.deznav').removeClass('fixed')
		});
	}
	
	var handleMenuTabs = function () {
		if (screenWidth <= 991) {
			jQuery('.menu-tabs .nav-link').on('click', function () {
				if (jQuery(this).hasClass('open')) {
					jQuery(this).removeClass('open');
					jQuery('.fixed-content-box').removeClass('active');
					jQuery('.hamburger').show();
				} else {
					jQuery('.menu-tabs .nav-link').removeClass('open');
					jQuery(this).addClass('open');
					jQuery('.fixed-content-box').addClass('active');
					jQuery('.hamburger').hide();
				}
				//jQuery('.fixed-content-box').toggleClass('active');
			});
			jQuery('.close-fixed-content').on('click', function () {
				jQuery('.fixed-content-box').removeClass('active');
				jQuery('.hamburger').removeClass('is-active');
				jQuery('#main-wrapper').removeClass('menu-toggle');
				jQuery('.hamburger').show();
			});
		}
	}

	var handleChatbox = function () {
		jQuery('.bell-link').on('click', function () {
			jQuery('.chatbox').addClass('active');
		});
		jQuery('.chatbox-close').on('click', function () {
			jQuery('.chatbox').removeClass('active');
		});
	}

	var handleBtnNumber = function () {
		$('.btn-number').on('click', function (e) {
			e.preventDefault();

			fieldName = $(this).attr('data-field');
			type = $(this).attr('data-type');
			var input = $("input[name='" + fieldName + "']");
			var currentVal = parseInt(input.val(), 10);
			if (!isNaN(currentVal)) {
				if (type == 'minus')
					input.val(currentVal - 1);
				else if (type == 'plus')
					input.val(currentVal + 1);
			} else {
				input.val(0);
			}
		});
	}

	var handleDzChatUser = function () {
		jQuery('.dz-chat-user-box .dz-chat-user').on('click', function () {
			jQuery('.dz-chat-user-box').addClass('d-none');
			jQuery('.dz-chat-history-box').removeClass('d-none');
		});

		jQuery('.dz-chat-history-back').on('click', function () {
			jQuery('.dz-chat-user-box').removeClass('d-none');
			jQuery('.dz-chat-history-box').addClass('d-none');
		});

		jQuery('.dz-fullscreen').on('click', function () {
			jQuery('.dz-fullscreen').toggleClass('active');
		});
	}

	var handleDzFullScreen = function () {
		jQuery('.dz-fullscreen').on('click', function (e) {
			if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
				/* Enter fullscreen */
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen(); /* IE/Edge */
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen(); /* Firefox */
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen(); /* Chrome, Safari & Opera */
				}
			}
			else { /* exit fullscreen */
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullscreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.msRequestFullscreen) {
					document.documentElement.msRequestFullscreen();
				}
			}
		});
	}

	var handleshowPass = function () {
		jQuery('.show-pass').on('click', function () {
			jQuery(this).toggleClass('active');
			if (jQuery('#dz-password').attr('type') == 'password') {
				jQuery('#dz-password').attr('type', 'text');
			} else if (jQuery('#dz-password').attr('type') == 'text') {
				jQuery('#dz-password').attr('type', 'password');
			}
		});
	}

	var heartBlast = function () {
		$(".heart").on("click", function () {
			$(this).toggleClass("heart-blast");
		});
	}

	var handleDzLoadMore = function () {
		$(".dz-load-more").on('click', function (e) {
			e.preventDefault();	//STOP default action
			$(this).append(' <i class="fa fa-refresh"></i>');

			var dzLoadMoreUrl = $(this).attr('rel');
			var dzLoadMoreId = $(this).attr('id');

			$.ajax({
				method: "POST",
				url: dzLoadMoreUrl,
				dataType: 'html',
				success: function (data) {
					$("#" + dzLoadMoreId + "Content").append(data);
					$('.dz-load-more i').remove();
				}
			})
		});
	}

	var handleLightgallery = function () {
		if (jQuery('#lightgallery').length > 0) {
			lightGallery(document.getElementById('lightgallery'), {
				plugins: [lgThumbnail, lgZoom],
				selector: '.lg-item',
				thumbnail: true,
				exThumbImage: 'data-src'
			});
		}
	}
	var handleCustomFileInput = function () {
		$(".custom-file-input").on("change", function () {
			var fileName = $(this).val().split("\\").pop();
			$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
		});
	}

	var vHeight = function () {
		var ch = $(window).height() - 206;
		$(".chatbox .msg_card_body").css('height', ch);
	}

	var domoPanel = function () {

		$('.dz-demo-trigger').on('click', function () {
			$('.dz-demo-panel').addClass('show');
		});
		$('.dz-demo-close, .bg-close').on('click', function () {
			$('.dz-demo-panel').removeClass('show');
		});

		$('.dz-demo-bx').on('click', function () {
			$('.dz-demo-bx').removeClass('demo-active');
			$(this).addClass('demo-active');
		});
	}

	var handleDatetimepicker = function () {
		if (jQuery("#datetimepicker1").length > 0) {
			$('#datetimepicker1').datetimepicker({
				inline: true,
			});
		}
	}

	var handleCkEditor = function () {
		if (jQuery("#ckeditor").length > 0) {
			ClassicEditor
				.create(document.querySelector('#ckeditor'), {
					// toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
				})
				.then(editor => {
					window.editor = editor;
				})
				.catch(err => {
					console.error(err.stack);
				});
		}
	}
	
	var handelBootstrapSelect = function () {
		jQuery('select').selectpicker();
	}
	
	var handleThemeMode = function () {
		if (jQuery(".dz-theme-mode").length > 0) {

			jQuery('.dz-theme-mode').on('click', function () {
				jQuery(this).toggleClass('active');

				if (jQuery(this).hasClass('active')) {
					jQuery('body').attr('data-theme-version', 'dark');
					setCookie('version', 'dark');
				} else {
					jQuery('body').attr('data-theme-version', 'light');
					setCookie('version', 'light');
				}
			});
			var version = getCookie('version');
			if (version != null) {
				jQuery('body').attr('data-theme-version', version);
			}
			jQuery('.dz-theme-mode').removeClass('active');

			jQuery(window).on('resize', function () {
				var version = getCookie('version');
				if (version != null) {
					jQuery('body').attr('data-theme-version', version);
				}
			})

			setTimeout(function () {
				if (jQuery('body').attr('data-theme-version') === "dark") {
					jQuery('.dz-theme-mode').addClass('active');
				}
			}, 1500)
		}
	}

	var handleAccordianSlider = function () {
		jQuery('.SlideToolHeader').on('click', function () {
			var el = jQuery(this).find('.handle').hasClass('expand');
			if (el) {

				jQuery(this).find('.handle').removeClass('expand').addClass('collapse');
				jQuery(this).closest('.cm-content-box').find('.cm-content-body').slideUp(300);
				jQuery(this).closest('.content-title').addClass('collapse');

			}
			else {
				jQuery(this).find('.handle').removeClass('collapse').addClass('expand');
				jQuery(this).closest('.cm-content-box').find('.cm-content-body').slideDown(300);
				jQuery(this).closest('.content-title').removeClass('collapse');
			}
		});

		$(document).ready(function () {
			$('.open').on('click', function () {
				$('.main-check').slideToggle('slow');

			});
		});

	}

	/* Function ============ */
	return {
		init: function () {
			handleMetisMenu();
			handleAllChecked();
			handleNavigation();
			handleCurrentActive();
			handleMiniSidebar();
			handleDataAction();
			handleHeaderHight();
			handleMenuTabs();
			handleChatbox();
			handleBtnNumber();
			handleDzChatUser();
			handleDzFullScreen();
			handleshowPass();
			heartBlast();
			handleDzLoadMore();
			handleLightgallery();
			handleCustomFileInput();
			vHeight();
			domoPanel();
			handleDatetimepicker();
			handleCkEditor();
			handleImageSelect();
			handleSelectPicker();
			handleThemeMode();
			handelBootstrapSelect();
			handleMenuPosition();
			handleAccordianSlider();
		},

		load: function () {
			handleTheme();

		},

		resize: function () {
			vHeight();
		},
		
		handleMenuPosition: function () {
			handleMenuPosition();
		},
	}

}();

/* Document.ready Start */
jQuery(document).ready(function () {
	$('[data-bs-toggle="popover"]').popover();
	'use strict';
	ventic.init();

});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load', function () {
	'use strict';
	ventic.load();
	setTimeout(function () {
		ventic.handleMenuPosition();
	}, 1000);

});
/*  Window Load END */

/* Window Resize START */
jQuery(window).on('resize', function () {
	'use strict';
	ventic.resize();
});
/*  Window Resize END */