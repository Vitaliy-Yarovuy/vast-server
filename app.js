
/**
 * Module dependencies.
 */

//var express = require('express');

var feathers = require('feathers');
var routes = {
    index: require('./routes/index').index,
    point: require('./routes/point').point
};

var services = {
    testPointService: require('./services/testPointService').testPointService
};
//var controllers = {
//    index: require('./socet.io.controllers/index').index,
//    point: require('./socet.io.controllers/point').point
//};
var http = require('http');
var path = require('path');

var app = feathers();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(feathers.favicon());
app.use(feathers.logger('dev'));
app.use(feathers.json());
app.use(feathers.urlencoded());
app.use(feathers.methodOverride());
app.use(feathers.cookieParser('your secret here'));
app.use(feathers.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(feathers.static(path.join(__dirname, 'public')));

app.configure(feathers.socketio());
app.use('/testPoints', services.testPointService);


app.get('/', routes.index);
app.get('/point/:id', routes.point);


// development only
if ('development' == app.get('env')) {
    app.use(feathers.errorHandler());
}


app.listen(3000);





//server.listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

//io.sockets.on('connection', function (socket) {
//    controllers.index(socket);
//    controllers.point(socket);
//});