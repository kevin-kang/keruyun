define(function() {

    var $doc = $(document),
        $win = $(window),
        $header = $('.header'),
        $nav = $('.nav'),
        $subNavbg = $('.sub-nav-bg'),
        $warper = $('.warper'),
        dfteq = $nav.find('.cur').index();

    function showSubNav() {
        if ($(this).index() == 1) {
            $subNavbg.toggleClass('anim');
            $warper.toggleClass('anim');
            $(this).toggleClass('cur');
        }
    }

    function hideSubNav() {
        if ($subNavbg.hasClass('anim')) {
            $subNavbg.removeClass('anim');
            $warper.removeClass('anim');
            if(dfteq !=1 ){
                $nav.find('li').eq(1).removeClass('cur');
            }
            
        }
    }


    $nav.on('click', 'li', showSubNav);
    $nav.on('mouseenter', 'li:not(:eq(1))', hideSubNav);
    $header.on('mouseleave', hideSubNav);
});