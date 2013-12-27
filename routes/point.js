var video = require('../models/video');
var vast20 = require('../models/vast20');
var vast20statistic = require('../models/vast20statistic');
var vastUrlHelper = require('../helpers/vastUrl').vastUrlHelper;
var path = require('path');
var services =  require('../services')
var _ = require('lodash');


video.findAllVideo(path.join(__dirname, '../public/video/'));

exports.index = function(req, res){
    var id = req.params.id;
    res.render('point/index', {
        id: id,
        title: 'test point "'+id+'" ',
        videoLists: video.lists,
        modelLinks: _.mapValues(vast20,function(model){ return model.links; }),
        modelEnums: {
            delivery: vast20.MediaFile.delivery
        }
    });
};

exports.vast = function(req, res){
    var id = req.params.id;
    var vast_id = req.params.vast_id;
    var point;
    var vast = vast20.Vast.collections[vast_id];
    services.testPointService.get(id,function(err, p){
        point = p;
    });
    var host = req.protocol + "://" + req.host;
    if( req.app.settings.port != 80){
        host += ":" + req.app.settings.port;
    }
    vastUrlHelper.setHost(host);
    res.header('Content-Type', 'application/xml');
    if(vast){
        res.render('vast20/vast', {
            point: point,
            vast: vast.toJSON()
        });
    }else{
        res.render('vast20/nobaner', {});
    }
};


exports.vast_statistic = function(req, res){
    var point_id = req.params.id,
        vast_id = req.params.vast_id,
        event_id = req.params.event_id;

    var vastStatistic = vast20statistic.VastStatistic.collections["statistic_"+vast_id];
    vastStatistic.trackEvent(event_id, {});
    res.send("tracked!!!");
};

exports.tracking_statistic = function(req, res){
    var point_id = req.params.id,
        vast_id = req.params.vast_id,
        creative_id = req.params.creative_id,
        event_id = req.params.event_id;

    var vastStatistic = vast20statistic.VastStatistic.collections["statistic_"+vast_id];
    vastStatistic.trackCreativeEvent(creative_id, event_id, {});
    res.send("tracked!!!");
};

exports.click_statistic = function(req, res){
    var point_id = req.params.id,
        vast_id = req.params.vast_id,
        creative_id = req.params.creative_id,
        event_id = req.params.event_id;

    var vastStatistic = vast20statistic.VastStatistic.collections["statistic_"+vast_id];
    vastStatistic.trackCreativeClickEvent(creative_id, event_id, {});
    res.send("tracked!!!");
};


