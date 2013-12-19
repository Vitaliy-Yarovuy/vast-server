

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