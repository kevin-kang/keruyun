define(function(){function e(){1==$(this).index()&&(a.toggleClass("anim"),i.toggleClass("anim"),!$(this).hasClass("cur")&&$(this).toggleClass("cur"))}function n(){a.hasClass("anim")&&(a.removeClass("anim"),i.removeClass("anim"),console.log(1!=l),1!=l&&o.find("li").eq(1).removeClass("cur"))}var s=($(document),$(window),$(".header")),o=$(".nav"),a=$(".sub-nav-bg"),i=$(".warper"),l=o.find(".cur").index();console.log(l),o.on("click","li",e),o.on("mouseenter","li:not(:eq(1))",n),s.on("mouseleave",n)});