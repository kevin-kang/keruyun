require(['js/module/util', 'js/module/navfixed', 'js/module/roundabout' , 'js/module/roundaboutshapes', 'js/module/subNav'], function(util) {
	var $doc = $(document),
		$win = $(window),
		$subNav = $('.subnav'),
		defaultOffsetTop = $subNav.offset().top;


	function addFixed() {
		var scrollTopVal = $win.scrollTop();

		if (defaultOffsetTop <= scrollTopVal) {
			$subNav.navfixed();
		}
		if (defaultOffsetTop > scrollTopVal) {
			$subNav.removenavfixed();
		}
	}

	$win.on('scroll', addFixed).trigger('scroll');

	function addDot(){
		var len = $('.scroll-pic ul').find('li').size(),
			spanTmp = '<span></span>'
			$dot = $('.dot'),
			tmpArr= [],
			i = 0;

		for(; i< len; i++){
			tmpArr.push(spanTmp);
		}
		$dot.html(tmpArr.join(''));
		$dot.find('span').eq(0).addClass('cur');
	}

	addDot();

	function autoAddDot(){
		var curIdx = $(this).find('.roundabout-in-focus').index();

		$dot.find('span').eq(curIdx).addClass('cur').siblings().removeClass('cur');
	}

	$('.scroll-pic ul').roundabout({
		shape: 'tickingClock',
		minOpacity: 1,
		minScale: .3,
		autoplay: true,
		autoplayDuration: 5000,
		autoplayPauseOnHover: true,
		clickToFocusCallback: autoAddDot,
		autoplayCallback: autoAddDot
	});
});