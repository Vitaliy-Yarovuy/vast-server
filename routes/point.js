var video = require('../models/video');
var vast20 = require('../models/vast20');
var path = require('path');


video.findAllVideo(path.join(__dirname, '../public/video/'));

exports.point = function(req, res){
    var id = req.params.id;
    res.render('point/index', {
        id: id,
        title: 'test point "'+id+'" ',
        videoLists: video.lists
    });
};

exports.vast = function(req, res){
    var vast_id = req.params.vast_id;
    var vast = vast20.Vast.collections[vast_id];
    res.header('Content-Type', 'application/xml');
    if(vast){
//        res.send('hello world');
        res.render('vast20/vast', {
            locals:{},
            vast: vast.toJSON()
        });
    }else{
        res.render('vast20/nobaner', {});
    }

};

