define(function(){$.fn.navfixed=function(){return this.each(function(){var n=$(this);n.css({position:"fixed"})})},$.fn.removenavfixed=function(){return this.each(function(){var n=$(this);n.css({position:"relative"})})}});