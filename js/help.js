require(['js/module/util'], function(util){
    var $doc = $(document),
        $win = $(window);

    util.tab('.tab-btn', 'li', '.tab-box', 'ul', 'click');
});