var _ = require("lodash");


function getNextId(prefix){
    var keys = Object.keys(BaseModel.collections).map(function(key){
        return key.indexOf(prefix) === 0;
    });
    return prefix + keys.length;
}

function getJSON(obj){
    return obj.toJSON?  obj.toJSON() : _.clone(obj);
}


function BaseModel(id){
    if(!id){
        id = getNextId(this.idPrefix);
    }
    this.id = id;
    BaseModel.collections[id] = this;
}
BaseModel.prototype.constructor = BaseModel;
BaseModel.prototype.idPrefix = "base_";
BaseModel.prototype.getId = function(){
    if(!this.id){
        throw new Error("not id set on " + this.toJSON()  + " object");
    }
    return this.id;
};

BaseModel.prototype.toJSON = function(){
    var obj = _.clone(this);
    this.constructor.links.forEach(function(key){
        var link = obj[key];
        if(link){
            if( link instanceof Array ){
                obj[key] = link.map(function(item){
                    item = BaseModel.collections[item];
                    return getJSON(item);
                });
            }else{
                link = BaseModel.collections[link];
                obj[key] = getJSON(link);
            }
        }
    });
    return obj;
};

BaseModel.links = [];
BaseModel.collections = {};

exports.BaseModel = BaseModel;