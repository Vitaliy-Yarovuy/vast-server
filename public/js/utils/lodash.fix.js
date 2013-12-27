(function(_,undefined){
    _.busy = function(func, wait) {
        var args,
            result,
            lastCalled = 0;

        return function() {
            var now = new Date,
                remaining = wait - (now - lastCalled);
            args = arguments;
            console.log("remains",remaining);
            if (remaining <= 0) {
                lastCalled = now;
                return (result = func.apply(this, args));
            }
            return result;
        };
    };
    _.diff = function(prev, now, keys) {
        keys = keys || [];
        var changes = {};
        for (var prop in now) {
            if(prop.indexOf("$$") == 0){
                continue;
            }
            if (!prev || prev[prop] !== now[prop] || keys.indexOf(prop) != -1) {
                if (typeof now[prop] == "object" && prev) {
                    var c = _.diff(prev[prop], now[prop], keys);
                    if (! _.isEmpty(c) ) // underscore
                        changes[prop] = c;
                } else {
                    changes[prop] = _.clone( now[prop], true);
                }
            }
        }
        return changes;
    };
    _.addKeyAfterDiff  = function(diff, now, keys) {
        keys = keys || [];
        if(now){
            for (var prop in diff) {
                if(diff.hasOwnProperty(prop)){
                    if (typeof diff[prop] == "object") {
                        diff[prop] = _.addKeyAfterDiff(diff[prop], now[prop], keys);
                    }
                }
            }
            for(var i =0; i< keys.length; i++){
                var key = keys[i];
                if(now[key] != undefined){
                    diff[key] = now[key];
                }
            }
        }
        return diff;
    };

    _.cloneCleaner = function(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = _.cloneCleaner(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if(attr.indexOf("$$") == 0) continue;
                if (obj.hasOwnProperty(attr)) copy[attr] = _.cloneCleaner(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
})(_);