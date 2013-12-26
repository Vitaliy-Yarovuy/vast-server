var utils = require("../utils/utils");
var _ = require("lodash");

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
            },
            update: function(args){
                var id = args[0],
                    data = args[1],
                    callback = arguments[arguments.length-1],
                    model = Model.collections[id];

                utils.replaceProp(model, data);
                callback(null, model);
            }
        };
        this.services[key] = service;
    }

    return this.services[key];
};

exports.serviceFactory = new ServiceFactory();

