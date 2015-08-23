define(function(){
	$.fn.navfixed = function(){
		return this.each(function(){
			var $target = $(this);

			$target.css({
				position: 'fixed'
			});
		});
	};

	$.fn.removenavfixed = function(){
		return this.each(function(){
			var $target = $(this);

			$target.css({
				position: 'relative'
			});
		});
	};
});