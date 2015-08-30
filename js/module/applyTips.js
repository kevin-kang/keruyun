define(['js/module/util'], function(util) { // apply-info 弹层
	var $doc = $(document),
		$win = $(window),
		$maskLayer = $('.mask-layer'),
		$applyInfo = $('.apply-info'),
		$clsBtn = $('.apply-cls'),
		$subBtn = $('.sub-btn'),
		$input = $applyInfo.find('input[type="text"], input[type="password"], input[type="hidde"]'),
		errorTips = '<div class="err-tips"></div>',
		len = $input.length,
		weights = 0;

	function verifyinput() {
		var $target = $(this),
			errorMsg = $target.attr('errorMsg');

		if (util.isNull($target.val())) {
			($target.data('isverify') && weights > 0) && weights--;
			!$target.next('.err-tips').length && $target.after(errorTips).addClass('error');
			$target.data('isverify', 0).focus().next('.err-tips').html(errorMsg);
		} else if (!util.isNull($target.val())) {
			(!$target.data('isverify') && weights < len) && weights++;
			$target.removeClass('error').data('isverify', 1).next('.err-tips').remove();

		}
		showSubBtn();
	}

	function removeErrotips() {
		var $target = $(this);

		if (util.isNull($target.val())) {
			errorTips = $target.next('.err-tips').detach();
		}
	}

	function showSubBtn() {
		if (len == weights) {
			$subBtn.removeClass('gray').prop('disabled', false);
		} else {
			$subBtn.addClass('gray').prop('disabled', true);
		}
	}

	function clsApplyPop() {
		var $target = $(this);

		$maskLayer.hide();
		$applyInfo.hide().find('input[type="text"], input[type="password"], input[type="hidde"]').each(resetform);
	}

	function resetform() {
		$(this).val('');
		$('input[type="submit"]').prop('disabled', true).addClass('gray');
	};

	$applyInfo.find('input').on('keyup', verifyinput).on('focusout', removeErrotips);
	$clsBtn.on('click', clsApplyPop);
});