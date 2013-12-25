'use strict';

app.factory('feathersClient',function ($rootScope, socket){
    var clients = {};

    return {
        getClient: function (modelName, listeners){
            if(listeners){
                listeners.created && socket.on(modelName + " created",listeners.created);
                listeners.updated && socket.on(modelName + " updated",listeners.updated);
                listeners.removed && socket.on(modelName + " removed",listeners.removed);
            }
            if(!clients[modelName]){
                clients[modelName] = {
                    find:function(params, callback){
                        var method = modelName+'::find';
                        socket.emit.apply(socket, [method].concat([].slice.call(arguments)));
                    },
                    get:function(id, params, callback){
                        var method = modelName+'::get';
                        socket.emit.apply(socket, [method].concat([].slice.call(arguments)));
                    },
                    create:function(data, params, callback){
                        var method = modelName+'::create';
                        socket.emit.apply(socket, [method].concat([].slice.call(arguments)));
                    },
                    update:function(id, data, params, callback){
                        var method = modelName+'::update';
                        socket.emit.apply(socket, [method].concat([].slice.call(arguments)));
                    },
                    remove:function(id, params, callback){
                        var method = modelName+'::remove';
                        socket.emit.apply(socket, [method].concat([].slice.call(arguments)));
                    }
                }
            }
            return clients[modelName];
        }
    };
});