
/**
 * Module dependencies.
 */

// like express
var feathers = require('feathers');
var _ = require('lodash');
var vidStreamer = require("vid-streamer");
var routes = require('./routes');

var vast20 = require("./models/vast20");
var vast20statistic = require("./models/vast20statistic");
var services =  require('./services');

var http = require('http');
var path = require('path');
var port = process.env.PORT || 3000;
var app = feathers();

// all environments
app.set('port', port);
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

app.locals.mediaFileHelper = require('./helpers/mediafile').mediaFileHelper;
app.locals.vastUrlHelper = require('./helpers/vastUrl').vastUrlHelper;

app.use('/testpoints', services.testPointService);
console.log('create service on url' ,'/testpoints');

_.each(vast20,function(Model,key){
    if(key != "BaseModel"){
        app.use('/vast20/'+key.toLowerCase(), services.serviceFactory.build(Model));
        console.log('create service on url' ,'/vast20/'+key.toLowerCase());
    }
});
app.use('/vast20statistic', services.serviceFactory.build(vast20statistic.VastStatistic));
console.log('create service on url' ,'/vast20statistic ');



app.get('/', routes.index);
app.get('/point/:id', routes.point.index);
app.get('/point/:id/vast/:vast_id/vast.xml', routes.point.vast);

app.get('/point/:id/statistic/:vast_id/event/:event_id', routes.point.vast_statistic);
app.get('/point/:id/statistic/:vast_id/creative/:creative_id/tracking_event/:event_id', routes.point.tracking_statistic);
app.get('/point/:id/statistic/:vast_id/creative/:creative_id/click_event/:event_id', routes.point.click_statistic);

app.get("/videos/", vidStreamer.settings({
    "mode": "development",
    "forceDownload": false,
    "random": false,
    "rootFolder": path.join(__dirname, 'public/video-stream'),
    "rootPath": "",
    "server": "VidStreamer.js/0.1.4"
}));

// development only
if ('development' == app.get('env')) {
    app.use(feathers.errorHandler());
}


app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});

