require(['js/module/util', 'js/module/applyTips', 'js/module/subNav'], function(util) {
	var $doc = $(document),
		$win = $(window),
		$ytList = $('.yt-list'),
		$useSaller = $('.use-saller'),
		$ul = $useSaller.find('ul'),
		$prevBtn = $useSaller.find('.prev'),
		$nextBtn = $useSaller.find('.next'),
		$manageCover = $('.manage-cover'),
		$manageCoverMask = $('.manage-cover-mask'),
		$manageScoll = $('.manage-scoll'),
		$manageScollHightLight = $manageScoll.find('p'),
		$scollBtn = $manageScoll.find('span'),
		$best = $('.best'),
		x = 0,
		liW = 0,
		isSlide = 0,
		animated = 0,
		isMove,
		sIdx = 0,
		sdtimes = times = null,
		arrTmp = [];


	function autoSetImageW() {
		var winW = $win.width(),
			imagesW = winW / 5,
			maxW = imagesW * $useSaller.find('li').size();

		$ul.show().find('li').css({
			width: imagesW
		}).find('img').css({
			width: imagesW
		});
		$ul.find('td').css({
			'height': $ul.find('.use-mask-box').height()
		});
	}

	function slide(e) {
		var slideW = $useSaller.find('li').eq(0).width(),
			dir = '';

		if ($(e.target).hasClass('prev') && !isSlide) {
			isSlide = 1;
			dir = '';
			$ul.prepend($ul.find('li').eq(-1)).css({
				'margin-left': -slideW
			});
			slideNucleus(dir, 0);
		}
		if ($(e.target).hasClass('next') && !isSlide) {

			isSlide = 1;
			dir = '-';
			slideNucleus(dir, slideW);
		}

	}

	function slideNucleus(dir, slideW) {
		$ul.animate({
				'margin-left': dir + slideW
			},
			600,
			function() {
				isSlide = 0;
				$(this).css({
					'margin-left': 0
				});
				if (dir) {
					$(this).append($(this).find('li').eq(0));
				}
			});
	}

	function stopSlide(){
		clearInterval(sdtimes);
	}

	function initSlide(){
		sdtimes = setInterval(function(){
			slideNucleus('-', $ul.find('li').width());
		}, 3000);
	}

	$useSaller.on('mouseenter', stopSlide).on('mouseleave', initSlide).trigger('mouseleave');

	// $win.on('resize', autoSetImageW).resize();

	$.fn.resetImgWidth = function() {
		return $(this).each(function() {
			var $target = $(this),
				targetW = $target.width();

			function resizeWin() {
				var winProportion = ($win.height() / $win.width()) > 1 ? 1 : ($win.height() / $win.width());

				$target.css({
					'width': targetW * winProportion
				});
			}

			$win.on('resize', resizeWin).resize();

		});
	};


	if (navigator.userAgent.toLowerCase().match(/applewebkit/) == 'applewebkit') {
		$('body, html').css({
			'height': '100%',
			// 'min-height': '955px',
			'overflow': 'hidden',
			'padding-top': 0
		});

		$('.warper').css({
			'height': '100%'
		});

		$('.src').css({
			'height': $doc.height(),
			'overflow': 'hidden'
		});

		$('.dot').show();


		function manageCover(x) {
			$manageCoverMask.css({
				width: x,
				'animation': 'none'
			});
			$manageScollHightLight.css({
				width: x,
				'animation': 'none'
			});
		}
		$('.warper').on('webkitTransitionEnd', function() {

			if (Math.abs(sIdx) == 1 && !$ytList.hasClass('anim')) {
				$ytList.addClass('anim');
			} else {
				$ytList.removeClass('anim');
			}

			if (Math.abs(sIdx) == 3 && !$manageCover.hasClass('anim')) {
				$manageCover.addClass('anim');
			} else {
				$manageCover.removeClass('anim');
			}

			if (Math.abs(sIdx) == 4 && !$best.hasClass('anim')) {
				$best.addClass('anim');
			} else if (Math.abs(sIdx) < 4) {
				$best.removeClass('anim');
			}
		});


		$manageCoverMask.on('webkitAnimationEnd', function() {
			animated = 1;
		});

		function animates(sIdx) {
			var target = $('.warper'),
				winH = $(this).height();

			arrTmp = [];
			if (Math.abs(sIdx) < 5) {
				$doc.find('.dot').fadeIn();
				target.css({
					'transform': 'translate3d(0, ' + winH * sIdx + 'px, 0)'
				});
			} else {
				target.css({
					'transform': 'translate3d(0, ' + (winH * (sIdx + 1) - 440) + 'px, 0)'
				});
			}

			$doc.find('.dot li').eq(Math.abs(sIdx)).addClass('cur').siblings().removeClass('cur');
			// target.find('.src').eq(Math.abs(sIdx)).show(function(){
			// 	$(this).siblings().hide();
			// });
		};

		$('html,body').on('mousewheel', function() {
			var delta = window.event.detail ? -(window.event.detail || 0) / 3 : window.event.wheelDelta / 120;
			clearTimeout(times);
			times = setTimeout(function() {
				if (delta > 0 && sIdx <= 0) {
					sIdx++;
				} else if (delta < 0 && Math.abs(sIdx) < 5) {
					sIdx--;
				}
				sIdx > 0 ? sIdx = 0 : sIdx;
				animates(sIdx);

			}, 300);

		});

		$doc.find('.dot li').on('click', function() {
			var target = $(this);
			sIdx = -target.index();
			animates(sIdx);

		});

		$win.on('resize', function() {
			var target = $('.warper'),
				winH = $win.height();
			if (Math.abs(sIdx) < 5) {
				target.css({
					'transform': 'translate3d(0, ' + winH * sIdx + 'px, 0)',
					'transition': '0'
				});
			} else {
				target.css({
					'transform': 'translate3d(0, ' + (winH * (sIdx + 1) - 440) + 'px, 0)',
					'transition': '0'
				});
			}
			$('.src').css({
				'height': $doc.height(),
				'overflow': 'hidden'
			});
		}).resize();
	} else {
		$manageScoll.hide();
		$('.part-5').find('li').css({
			'opacity': 1
		})
	}

	$manageScoll.find('span').on('mousedown', function(e) {
		isMove = 1;

		e.stopPropagation;
		$doc.on('mouseup', function() {
			isMove = 0;
		});
		$doc.on('mousemove', function(e) {
			var x = e.pageX - ($win.width() - 1000) / 2;

			if (isMove && animated && x <= $manageScoll.width() && x >= 0) {
				manageCover(x);
			}
		});
	});

	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

	$prevBtn.on('click', slide);
	$nextBtn.on('click', slide);
	
});