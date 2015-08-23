require(['js/module/util'],function(util){
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
		x = 0,
		liW = 0,
		isSlide = 0,
		animated = 0;


	function autoSetImageW(){
		var winW = $win.width(),
			imagesW = winW / 5,
			maxW = imagesW * $useSaller.find('li').size();

		$ul.show().find('li').css({
			width: imagesW
		});
	}

	function slide(e){
		var slideW = $useSaller.find('li').eq(0).width(),
			dir = '';

		if($(e.target).hasClass('prev') && !isSlide){
			isSlide = 1;
			dir = '';
			$ul.prepend($ul.find('li').eq(-1)).css({
				'margin-left': -slideW
			});
			slideNucleus(dir, 0);
		}
		if($(e.target).hasClass('next') && !isSlide){
			
			isSlide = 1;
			dir = '-';
			slideNucleus(dir, slideW);
		}
		
	}

	function slideNucleus(dir, slideW){
		$ul.animate({
			'margin-left': dir + slideW
			},
			600, function() {
			isSlide = 0;
			$(this).css({
				'margin-left': 0
			});
			if(dir){
				$(this).append($(this).find('li').eq(0));
			}
		});
	}

	function manageCover(x){
		$manageCoverMask.css({
			width: x,
			'animation' : 'none'
		});
		$manageScollHightLight.css({
			width: x,
			'animation' : 'none'
		});
	}

	$ul.on('mouseenter', 'li', function(){
		var $target = $(this),
			time = null;
		liW = $(this).width();

		var addW = liW * .5,
			everyAddW = addW / ($ul.find('li').size() - 1);

		$target.width(liW + addW).siblings().width(liW - everyAddW);
			$target.children().show();
	}).on('mouseleave', 'li', function(){
		$ul.find('li').width(liW);
		$(this).children().hide();
	});

	$win.on('scroll', function(){
		var thisScrollTopVal = $(this).scrollTop();

		if(thisScrollTopVal > 1000 && !$ytList.hasClass('anim')){
			$ytList.addClass('anim');
		}

		if(thisScrollTopVal > 3900 && !$manageCover.hasClass('anim')){
			$manageCover.addClass('anim');
		}
	}).scroll().on('resize', autoSetImageW).resize();

	$manageCoverMask.on('webkitAnimationEnd', function(){
		animated = 1;
	});
	$manageCover.on('mousemove', function(e){
		var x = e.offsetX;

		if(animated){
			manageCover(x);
		}		
	});

	$prevBtn.on('click', slide);
	$nextBtn.on('click', slide);
});