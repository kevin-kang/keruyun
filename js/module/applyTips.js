define(['js/module/util', 'js/module/validation/additional-methods'], function(util) { // apply-info 弹层
	var $doc = $(document),
		$win = $(window),
		$maskLayer = $('.mask-layer'),
		$applyInfo = $('.apply-info'),
		$clsBtn = $('.apply-cls'),
		$subBtn = $('.sub-btn'),
		$sqbtn = $('.sqbtn'),
		$input = $applyInfo.find('input[type="text"], input[type="password"], input[type="hidde"], select').not('.ignore'),
		$form = $('#form') || $('form'),
		validator = $form.validate({
			submitHandler: function(form) {
				$.ajax({
					url: '', //提交的url
					type: 'POST',
					dataType: 'json',
					data: $form.serialize()
				}).done(function(data) {
					// if () { //成功
					// 	clsApplyPop
					// }
				});
				return false;
			},
			ignore: '.ignore',
			errorClass: 'err-tips',
			errorElement: 'div',
			rules: {
				dealer: {
					required: true
				},
				username: {
					required: true
				},
				area: {
					required: true
				},
				region: {
					required: true
				},
				phone: {
					required: true,
					verifPhone: true
				},
				contacter: {
					required: true
				},
				adds: {
					required: true
				}
			},
			messages: {
				dealer: {
					required: $(this).attr('errorMsg') || '*商户名称不能空'
				},
				username: {
					required: $(this).attr('errorMsg') || '*输入正确的姓名'
				},
				area: {
					required: '*输入正确的所在地区'
				},
				region: {
					required: '*输入正确的代理区域'
				},
				phone: {
					required: '*输入正确的电话'
				},
				contacter: {
					required: '*联系人不能空'
				},
				adds: {
					required: '*商户所在地址不能空'
				}
			},
			errorPlacement: function(error, element) {
				$(element).after(error);
			}
		});

	$.validator.addMethod('verifPhone', function(value, element, param) {
		return param == true && /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/g.test(value); //增加手机号吗验证
	}, '*输入正确的电话');

	function resetform() { //重置表单为初始状态
		validator.resetForm();
		$.each($form.find('input, select'), function() {
			if ($(this).attr('type') == ('checkbox' || 'radio')) {
				$(this).prop('checked', false);
			}
			if ($(this).attr('type') == 'text' || $(this).attr('type') == 'password') {
				$(this).val('');
			}
			if ($(this).is('select')) {
				$(this).val($(this).find('option:first').val()).change();
			}
		});
	}

	function selectExt() {
		var $target = $(this),
			$siblingsInput = $target.siblings('input'),
			targetTxt = $target.find('option:selected').text();

		$siblingsInput.val(targetTxt);
	}

	$('select').on('change', selectExt).change();

	function clsApplyPop() {
		$applyInfo.hide();
		$maskLayer.hide();
		resetform();
	}

	function setApplyInfo(){
		var winH = $win.height(),
			applyInfoH = $applyInfo.height();

		$('.apply-info').css({
			'top': (winH - applyInfoH) / 2 / winH * 100 + '%'
		});
	}

	function showApplyInfo(){
		$('.mask-layer').show();
		$('.apply-info').show();
	}

	$sqbtn.on('click', showApplyInfo);

	$win.on('resize', setApplyInfo).resize();

	$clsBtn.on('click', clsApplyPop);
});