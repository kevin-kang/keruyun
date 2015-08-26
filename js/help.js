require(['js/module/util'], function(util){
    var $doc = $(document),
        $win = $(window),
        $contactusBnr = $('.contactus-bnr'),
        idx = 0,time = null;

    function autoShowTips(){
        var len = $contactusBnr.find('li').size();

        if(idx + 1 > len){
            idx =0;
        }
        $contactusBnr.find('li').eq(idx++).addClass('cur').siblings().removeClass('cur');
        time = setTimeout(autoShowTips, 3500);
    }

    $contactusBnr.find('li').on('mouseenter', function(){
        idx = $(this).index();
        clearTimeout(time);
        $(this).addClass('cur').siblings().removeClass('cur');
    }).on('mouseleave', function(){
        $(this).removeClass('cur');
        autoShowTips();
    });

    autoShowTips();

    util.tab('.tab-btn', 'li', '.tab-box', 'ul', 'click');
    util.tab('.contactus-cont-tab-btn', 'span', '.contactus-cont-tab-box', '.contactus-cont-tab-cont', 'click');
});