
function getNextId(prefix){
    var keys = Object.keys(BaseModel.collections).map(function(key){
        return key.indexOf(prefix) === 0;
    });
    return prefix + keys.length;
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
    return this.id;
};

BaseModel.prototype.toJSON = function(){
    var obj = JSON.parse(JSON.stringify(this));

    this.constructor.links.forEach(function(key){
        var link = BaseModel.collections[obj[key]];
        if(link.toJSON){
            link = link.toJSON();
        }else{
            link = JSON.parse(JSON.stringify(link));
        }
        obj[key] = link;
    });

    return JSON.stringify(obj);

};

BaseModel.links = [];
BaseModel.collections = {};

exports.BaseModel = BaseModel;