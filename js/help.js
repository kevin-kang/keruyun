require(['js/module/util', 'js/module/applyTips', 'js/module/subNav'], function(util) {
    var $doc = $(document),
        $win = $(window),
        $contactusBnr = $('.contactus-bnr'),
        $applyInfoFormB = $('.apply-info-form-b'),
        $applyInfoFormU = $('.apply-info-form-u'),
        $supportftBtn = $('.support-ft').children(),
        $sqbtn = $('.sqbtn'),
        $bu = $('.bu'),
        $ul = $bu.find('ul'),
        $prevBtn = $bu.find('.prev'),
        $nextBtn = $bu.find('.next'),
        isSlide = 0,
        idx = 0,
        sdtime = time = null;

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

    function slide(e) {
        var slideW = $bu.find('li').eq(0).outerWidth(),
            dir = '';

        if ($(e.target).hasClass('prev')) {
            dir = '';
            $ul.prepend($bu.find('li').eq(-1)).css({
                'margin-left': -slideW
            });
            slideNucleus(dir, 0);
        }
        if ($(e.target).hasClass('next')) {
            dir = '-';
            slideNucleus(dir, slideW);
        }
    }

    function slideNucleus(dir, slideW) {
        if(!isSlide){
            isSlide = 1;
            $ul.animate({
                'margin-left': dir + slideW
            }, 600, function() {
                isSlide = 0;
                $(this).css({
                    'margin-left': 0
                });
                if (dir) {
                    $(this).append($(this).find('li').eq(0));
                }
            });
        }
    }

    function sideInit(){
        stopSlide();
        slideNucleus('-', $ul.find('li').outerWidth());
        sdtime = setTimeout(sideInit, 3000);
    }

    function stopSlide(){
        clearTimeout(sdtime);
    }

    function hoverBuLi(){
        var $target = $(this);

        setTimeout(function(){$target.removeClass('sib').addClass('cur').siblings().addClass('sib').removeClass('cur');},230);
    }

    function clearHoverBuLi(){
        $ul.find('li').removeClass('cur sib');
    }

    $bu.on('mouseenter', stopSlide).on('mouseleave', function(){
        sideInit();
        clearHoverBuLi();
    }).trigger('mouseleave');

    

    util.tab('.tab-btn', 'li', '.tab-box', 'ul', 'click');
    util.tab('.contactus-cont-tab-btn', 'span', '.contactus-cont-tab-box', '.contactus-cont-tab-cont', 'click');

    $supportftBtn.on('click', showApplyInfo);
    $sqbtn.on('click', showApplyInfo);
    $prevBtn.on('click', slide);
    $nextBtn.on('click', slide);
    $ul.on('mouseenter', 'li', hoverBuLi).on('mouseleave', 'li', clearHoverBuLi);
});