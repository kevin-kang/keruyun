require(['js/module/util', 'js/module/navfixed', 'js/module/roundabout' , 'js/module/roundaboutshapes', 'js/module/subNav', 'js/module/slides'], function(util) {
	var $doc = $(document),
		$win = $(window),
		$subNav = $('.subnav'),
		$slides = $('#slides'),
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

	$slides.slides({
		width: 1000,
		height: 400
	});
});