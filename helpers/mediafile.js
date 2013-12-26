var _ = require("lodash");
var video = require('../models/video');
var vast20 = require("../models/vast20");

var mediaFileHelper = {
    getDelivery: function(value){
        return vast20.MediaFile.delivery[value] || vast20.MediaFile.delivery[0];
    },
    getMediaDataFromVideo: function(id_video, types){
        var videoItem = video.lists[id_video];
        if(!videoItem){
            return [];
        }
        var mediaDates =  videoItem.getMediaData();
        return types.map(function(index){
            return mediaDates[index];
        });
    },
    getUrl: function(mediaData, delivery,vast){
        var src = mediaData.src;
        if(delivery == "streaming"){
            src = src.replace("/video/","/video-stream/");
        }
        src += "?vast=" + vast.id;
        return src;
    }
};

exports.mediaFileHelper = mediaFileHelper;
