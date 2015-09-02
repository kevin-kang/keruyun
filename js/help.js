require(['js/module/util', 'js/module/applyTips'], function(util) {
    var $doc = $(document),
        $win = $(window),
        $contactusBnr = $('.contactus-bnr'),
        $applyInfoFormB = $('.apply-info-form-b'),
        $applyInfoFormU = $('.apply-info-form-u'),
        $supportftBtn = $('.support-ft').children(),
        $sqbtn = $('.sqbtn'),
        idx = 0,
        time = null;

    function autoShowTips() {
        var len = $contactusBnr.find('li').size();

        if (idx + 1 > len) {
            idx = 0;
        }
        $contactusBnr.find('li').eq(idx++).addClass('cur').siblings().removeClass('cur');
        time = setTimeout(autoShowTips, 3500);
    }

    $contactusBnr.find('li').on('mouseenter', function() {
        idx = $(this).index();
        clearTimeout(time);
        $(this).addClass('cur').siblings().removeClass('cur');
    }).on('mouseleave', function() {
        $(this).removeClass('cur');
        autoShowTips();
    });

    autoShowTips();

    function showApplyInfo() {
        var $target = $(this);

        $('.mask-layer').show();
        $('.apply-info').show();
        chooseShowApplyInof($target);
    }

    function chooseShowApplyInof(ele) {
        if (ele.is('.sqbtn')) {
            $applyInfoFormU.hide().find('input').prop({
                'disabled': true
            });
            $applyInfoFormB.show().find('input, select').prop({
                'disabled': false
            });
        } else {
            $applyInfoFormU.show().find('input').prop({
                'disabled': false
            });
            $applyInfoFormB.hide().find('input, select').prop({
                'disabled': true
            });
        }
    }

    util.tab('.tab-btn', 'li', '.tab-box', 'ul', 'click');
    util.tab('.contactus-cont-tab-btn', 'span', '.contactus-cont-tab-box', '.contactus-cont-tab-cont', 'click');

    $supportftBtn.on('click', showApplyInfo);
    $sqbtn.on('click', showApplyInfo);
});