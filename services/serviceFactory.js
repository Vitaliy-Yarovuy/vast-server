var util = require("util");

function ServiceFactory() {
    this.services = {};
}

ServiceFactory.prototype.build = function (Model) {
    var key = Model.prototype.constructor,service;

    if(!this.services[key]){
        service = {
            create:function(data){
                var callback = arguments[arguments.length-1];
                var model = new Model(null, data.settings);
                callback(null, model);
            },
            get: function(id){
                var callback = arguments[arguments.length-1];
                var model = Model.collections[id];
                callback(null, model);
            },
            find:function(params){
                var callback = arguments[arguments.length-1];
                var models = [];
                _.each(Model.collections,function(model,key){
                    this.push(model);
                },models);
                callback(null, models);
            }
        };
        this.services[key] = service;
    }

    return this.services[key];
};

exports.serviceFactory = new ServiceFactory();

