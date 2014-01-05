var _ = require("lodash");
var video = require('../models/video');
var vast20 = require("../models/vast20");

var mediaFileHelper = {
    host: "/",
    setHost: function(host){
        this.host = host;
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
        return this.host + src.substr(1);
    }
};

exports.mediaFileHelper = mediaFileHelper;
