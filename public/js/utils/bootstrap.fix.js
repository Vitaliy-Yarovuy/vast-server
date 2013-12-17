/*!
 * Bootstrap v3.0.3 (http://getbootstrap.com)
 * Copyright 2013 Twitter, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 */

if (typeof jQuery === "undefined") {
    throw new Error("Bootstrap.fix requires jQuery")
}


(function ($) {
    "use strict";

    $.fn.tab = (function (oldFunc) {
        return function(option){
            var result  = oldFunc.call(this,option);
            this.each(function () {
                var $this = $(this);
                if($this.prop("tagName") == "A"){
                    var $else = $('a[href="'+$this.attr("href")+'"]').not($this);
                    oldFunc.call($else,option);
                }
            });
            return result;
        };
    })($.fn.tab);

})(jQuery);

