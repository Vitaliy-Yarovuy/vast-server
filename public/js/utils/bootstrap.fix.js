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
    var tabPrefix = ["settings_","views_"];

    $.fn.tab = (function (oldFunc) {
        return function(option){
            var result  = oldFunc.call(this,option);
            this.each(function () {
                var $this = $(this);
                if($this.prop("tagName") == "A"){
                    var href = $this.attr("href");
                    var prefix = tabPrefix.filter(function(pref){
                        return href.indexOf(pref) == 1;
                    })[0];
                    if(prefix){
                        tabPrefix.filter(function(pref){
                            return pref != prefix;
                        }).map(function(pref){
                            var $else = $('a[href="'+href.replace(prefix,pref)+'"]');
                                oldFunc.call($else,option);
                        });
                    }
                }
            });
            return result;
        };
    })($.fn.tab);

})(jQuery);

