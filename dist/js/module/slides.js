"use strict";!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){$.fn.slides=function(e){var e=$.extend({preload:!1,cusControl:!1,height:350,width:560,control:"pagination",current:"current",preloadImage:"http://p4.qhimg.com/d/inn/b2799be7/loading.gif",container:"slide_cont",nextBtn:"next",prevBtn:"prev",fadeSpeed:350,fadeEasing:"",slideSpeed:350,slideEasing:"",start:1,direction:"next",effect:"slide",eventType:"mouseover",autoPlay:!0,time:3e3,callback:function(){}},e);return $(this).each(function(){function n(){var e=document.body||document.documentElement,n=e.style,t=(void 0!==n.transition||void 0!==n.WebkitTransition||void 0!==n.MozTransition||void 0!==n.MsTransition||void 0!==n.OTransition)&&(navigator.userAgent.toLowerCase().match(/applewebkit\/([\d.]+)/)?"1"!==navigator.userAgent.toLowerCase().match(/applewebkit\/([\d.]+)/)[1].split(".")[1]:"");return t}function t(t,i){function o(){v=!1,b=!1,y=!1,l.removeAttr("style"),l.children().removeAttr("style").eq(s).show(),e.callback()}function a(){v=!1,b=!1,y=!1,l.css(u[t]).children().removeAttr("style").eq(s).show(),e.callback()}var r={left:{left:i},top:{top:i}};if(l.children().eq(s).css(r[t]).show(),n()){var c={transition:e.slideSpeed+"ms"},d={left:{transform:"translate3d("+-i+"px, 0 ,0)"},top:{transform:"translate3d(0, "+-i+"px, 0)"}},f={transition:"none"},u={left:{transform:"none"},top:{transform:"none"}};$.extend(!0,d[t],c),$.extend(!0,u[t],f),l.css(d[t]).on("transitionend",a)}else{var p={left:{"margin-left":-i},top:{"margin-top":-i}};l.animate(p[t],e.slideSpeed,e.slideEasing,o)}}function i(){n()?l.children().eq(s).css({opacity:0}).show(10,function(){$(this).css({opacity:1,transition:"opacity "+e.fadeSpeed+"ms ease"}).on("transitionend",function(){v=!1,b=!1,y=!1,$(this).removeAttr("style").show(),e.callback()}).siblings().css({opacity:0,transition:"opacity "+e.fadeSpeed+"ms ease"}).on("transitionend",function(){l.children().eq(s).siblings().removeAttr("style"),e.callback()})}):l.children().eq(s).fadeIn(e.fadeSpeed,e.fadeEasing,function(){e.callback(),v=!1,b=!1,y=!1}).siblings().fadeOut(e.fadeSpeed,e.fadeEasing,function(){$(this).removeAttr("style"),e.callback()})}function o(n,o){if(!v&&g)if(v=!0,y&&(s-=2),b&&(s=q-1),s=(s+1)%d,$("."+e.control,c).children().removeClass(e.current).eq(s).addClass(e.current),"fade"==o)i();else{var a={next:function(){t("left",f)},prev:function(){t("left",-f)},top:function(){t("top",u)},bottom:function(){t("top",-u)}};a[n]()}}function a(){o(p,h)}function r(){y=!0,"fade"==h&&o(p,h)||"top"==p&&o("bottom",h)||o("prev",h)}var c=$(this),s=e.start-1,l=$("."+e.container,c),d=l.children().length,f=e.width,u=e.height,p=e.direction,h=e.effect,m=e.eventType,v=!1,g=!1,b=!1,y=!1,w=[],k=null,q=0;if(2>d)return l.children().fadeIn(e.fadeSpeed,e.fadeEasing,function(){g=!0,e.callback()}),$("."+e.nextBtn+", ."+e.prevBtn,c).hide(),$("."+e.control,c).hide(),!1;if(!e.cusControl){for(var x=1;d+1>x;x+=1)w.push('<li><a href="#nogo" hideFocus>'+x+"</a></li>");$("<ul class="+e.control+" />").html(w.join("")).appendTo(c)}if($("."+e.control,c).children().eq(s).addClass(e.current),e.preload&&$("img",l).eq(s).length){l.css({background:"url("+e.preloadImage+") no-repeat 50% 50%"});var S=$("img",l).eq(s).attr("src");$("img",l).eq(s).attr("src",S).load(function(){l.children().eq(s).fadeIn(e.fadeSpeed,e.fadeEasing,function(){l.removeAttr("style"),g=!0,e.callback()})})}else l.children().eq(s).fadeIn(e.fadeSpeed,e.fadeEasing,function(){g=!0,e.callback()});if($("."+e.control,c).children().each(function(n,t){$(this).on(m,function(){var t=$("."+e.current,c).index();q=n,b=!0,clearInterval(k),n!=t&&("fade"===h?o(p,h):"top"==p?t>n?o("bottom",h):o("top",h):t>n?o("prev",h):o("next",h),$(this).blur())})}),"ontouchend"in document){var A=$("img",c),E=new Swipe(A);"next"==p||"fade"==h?E.on("swipeleft",a).on("swiperight",r):"top"==p&&E.on("swipeup",a).on("swipedown",r)}$("."+e.nextBtn,c).on("click",function(){return a(),$(this).blur(),!1}),$("."+e.prevBtn,c).on("click",function(){return r(),$(this).blur(),!1}),e.autoPlay&&c.on("mouseenter",function(){clearInterval(k)}).on("mouseleave",function(n){k=setInterval(function(){o(p,h)},e.time)}).trigger("mouseleave")})}});