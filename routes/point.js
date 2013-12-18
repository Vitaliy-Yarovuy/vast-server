var video = require('../models/video');
var path = require('path');


video.findAllVideo(path.join(__dirname, '../public/video/'));

exports.point = function(req, res){
    var id = req.params.id;
    res.render('point', {
        id: id,
        title: 'test point "'+id+'" ',
        videoLists: video.lists
    });
};