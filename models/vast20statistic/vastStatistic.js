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
    this.sessions = [];
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
                    setExistOrCreate(newTrackingPoints, key.toLowerCase() , trackingPoints);
                },this);
            }

            // videoClicks
            videoClicks = linear.videoClicks;
            if(trackingEvents){
                _.forEach(videoClicks.settings, function(value, key){
                    setExistOrCreate(newClickPoints, key.toLowerCase() , clickPoints);
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


VastStatistic.prototype.eventProcessing = function(item){
    var sessionID = item.data.sessionID;
    if(this.sessions.indexOf(sessionID)  == -1){
        this.sessions.push(sessionID);
    }
};

VastStatistic.prototype.trackEvent = function(event, item){
    this.eventProcessing(item);
    this.points[event].track(item);
};

VastStatistic.prototype.trackCreativeEvent = function(id_creative, event, item){
    this.eventProcessing(item);
    this.creatives[id_creative].trackingPoints[event].track(item);
};

VastStatistic.prototype.trackCreativeClickEvent = function(id_creative, event, item){
    this.eventProcessing(item);
    this.creatives[id_creative].clickPoints[event].track(item);
};

VastStatistic.prototype.clear = function(){
    _.each(this.points,function(point){
        point.clear();
    });
    _.each(this.creatives,function(creative){
        _.each(creative.clickPoints,function(point){
            point.clear();
        });
        _.each(creative.trackingPoints,function(point){
            point.clear();
        });
    });
};

exports.VastStatistic = VastStatistic;