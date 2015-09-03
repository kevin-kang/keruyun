define(function(){
	var $win = $(window),
		$doc = $(document),
		$body = $('body'),
		$page = $('html, body'),
		$gotopBtn = null,
		gotopBtn = '<div class="gotop-btn"><img src="images/gotopbtn.png" alt="返回顶部"></div>';

	$body.append(gotopBtn);

	$gotopBtn = $doc.find('.gotop-btn');

	function toggleGotopBtn(){
		var stop = $win.scrollTop();

		if(stop > 2000){
			$gotopBtn.fadeIn();
		}else{
			$gotopBtn.fadeOut();
		}
	}

	function gotop(){
		$page.animate({
			scrollTop: 0
		},500);
	}

	$win.on('scroll', toggleGotopBtn);
	$gotopBtn.on('click', gotop);
});