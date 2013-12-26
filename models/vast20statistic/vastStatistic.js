var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./../baseModel").BaseModel;
var StatisticPoint = require("./statisticPoint").StatisticPoint;
var vast20 = require("./../vast20");

function setExistOrCreate(newObj, key, obj){
    if(obj[key]){
        newObj[key] = obj[key];
    }else{
        newObj[key] = new StatisticPoint(key);
    }
    return newObj[key];
}


function VastStatistic(id, vast){
    if(!id){
        id = "statistic_" + vast.id;
    }
    BaseModel.call(this,id);
    this.vast = vast;
    this.points = {};
    this.creatives = {};
    this.updateStatisticPoints();
}

utils.extend(VastStatistic, BaseModel);
VastStatistic.prototype.idPrefix = "statistic_vast_";

VastStatistic.prototype.updateStatisticPoints = function(){
    var newPoints = {},
        completeVast = this.vast.toJSON(),
        childVast = completeVast.inLine || completeVast.wrapper;

    setExistOrCreate(newPoints, "load", this.points);
    setExistOrCreate(newPoints, "impression", this.points);
    setExistOrCreate(newPoints, "error", this.points);
    if(this.vast.inLine){
        setExistOrCreate(newPoints, "survey", this.points);
    }
    this.points = newPoints;

    childVast.creatives.forEach(function(creative){
        var id_creative = creative.id,
            newTrackingPoints = {},
            trackingPoints = this.creatives[id_creative] && this.creatives[id_creative].trackingPoints || {},
            newClickPoints = {},
            clickPoints = this.creatives[id_creative] && this.creatives[id_creative].clickPoints || {},
            linear = creative.linear,
            mediaFilesStatistic,
            newMediaFilesStatistic = {},
            mediaFiles,
            trackingEvents, videoClicks;

        if(!this.creatives[id_creative]){
            this.creatives[id_creative] = {};
        }

        if(linear){

            // trackingEvents
            trackingEvents = linear.trackingEvents;
            if(trackingEvents){
                _.forEach(trackingEvents.settings, function(value, key){
                    setExistOrCreate(newTrackingPoints, key , trackingPoints);
                },this);
            }

            // videoClicks
            videoClicks = linear.videoClicks;
            if(trackingEvents){
                _.forEach(videoClicks.settings, function(value, key){
                    setExistOrCreate(newClickPoints, key , clickPoints);
                },this);
            }

            // mediaFiles
            mediaFiles = linear.mediaFiles;
            mediaFilesStatistic = this.creatives[id_creative].mediaFiles;
            mediaFiles.forEach(function(mediaFile){
                var id_mediaFile = mediaFile.id,
                    types = mediaFile.types;
                types.forEach(function(type){
                    var id_type = type.replace("video/",""),
                        key = id_mediaFile + "_" + id_type;
                    newMediaFilesStatistic[key] =  mediaFilesStatistic[key] || {
                        points:{
                            load: new StatisticPoint("load")
                        }
                    };
                })
            },this);
        }
        this.creatives[id_creative].trackingPoints = newTrackingPoints;
        this.creatives[id_creative].clickPoints = newClickPoints;
        this.creatives[id_creative].mediaFiles = newMediaFilesStatistic;

    },this);

};


VastStatistic.prototype.trackEvent = function(event, data){
    this.points[event].track(data);
};

VastStatistic.prototype.trackCreativeEvent = function(id_creative, event, data){
    this.creatives[id_creative].trackingPoints[event].track(data);
};

VastStatistic.prototype.trackCreativeClickEvent = function(id_creative, event, data){
    this.creatives[id_creative].clickPoints[event].track(data);
};





exports.VastStatistic = VastStatistic;