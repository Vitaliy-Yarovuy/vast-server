
exports.extend = function(Child, Parent){
    //переносим статические методи
    for(var key in Parent){
        if(Parent.hasOwnProperty(key) && !Child.hasOwnProperty(key)){
            Child[key] = Parent[key];
        }
    }
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
};

exports.replaceProp = function(to, from){
    for(var key in from){
        if(from.hasOwnProperty(key)){
            to[key] = from[key];
        }
    }
};


var nameFromToStringRegex = /^function\s?([^\s(]*)/;
function className(object, defaultName) {
    var result = "";
    if (typeof object === 'function') {
        result = object.name || object.toString().match(nameFromToStringRegex)[1];
    } else if (typeof object.constructor === 'function') {
        result = className(object.constructor, defaultName);
    }
    return result || defaultName;
}

exports.className = className;
