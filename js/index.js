require(['js/module/util'],function(util){
	var $doc = $(document),
		$win = $(window),
		$ytList = $('.yt-list'),
		$useSaller = $('.use-saller'),
		$ul = $useSaller.find('ul'),
		$prevBtn = $useSaller.find('.prev'),
		$nextBtn = $useSaller.find('.next'),
		isSlide = 0;


	function autoSetImageW(){
		var winW = $win.width(),
			imagesW = winW / 5,
			maxW = imagesW * $useSaller.find('li').size(),
			imagesH = $useSaller.find('li').eq(0).height();

		$ul.css({
			width: maxW,
			height: imagesH
		}).find('li').css({
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


	$win.on('scroll', function(){
		var thisScrollTopVal = $(this).scrollTop();

		if(thisScrollTopVal > 1000 && !$ytList.hasClass('anim')){
			$ytList.addClass('anim');
		}
	}).scroll().on('resize', autoSetImageW).resize();

	$prevBtn.on('click', slide);
	$nextBtn.on('click', slide);
});