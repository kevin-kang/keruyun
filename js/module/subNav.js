define(function(){

    var $doc = $(document),
        $win = $(window),
        $nav = $('.nav'),
        $subNavbg = $('.sub-nav-bg');
        
    function showSubNav() {
        if ($(this).find('.sub-nav').length) {
            $subNavbg.addClass('anim');
        } else {
            hideSubNav();
        }
    }

    function hideSubNav() {
        $subNavbg.removeClass('anim');
    }

    $nav.on('mouseenter', 'li', showSubNav).on('mouseleave', 'li', hideSubNav);
    $nav.on('mouseleave', hideSubNav);
});