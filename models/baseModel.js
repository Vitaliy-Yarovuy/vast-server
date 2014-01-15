var _ = require("lodash");
var utils = require("../utils/utils");


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

BaseModel.prototype.getAllLinkedId = function( links){
    var links = links || {},
        constructor = this.constructor;
    if(constructor.links){
        constructor.links.forEach(function(key){
            var link = this[key];
            var items = [];
            if(link){
                if( link instanceof Array ){
                    items = items.concat( link.map(function(item){
                        return BaseModel.collections[item];
                    }));
                }else{
                    items.push(BaseModel.collections[link]);
                }
            }
            items.forEach(function(item){
                var key = utils.className(item.constructor,"BaseModel");
                if(links[key]){
                    links[key].push(item.id);
                } else {
                    links[key] = [item.id];
                }
                item = item.getAllLinkedId(links);
            });
        },this);
    }
    return links;
};



BaseModel.links = [];
BaseModel.collections = {};

exports.BaseModel = BaseModel;