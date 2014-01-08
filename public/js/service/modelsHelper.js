'use strict';

app.factory('modelsHelper',function ($rootScope, feathersClient){

    var vastClient = feathersClient.getClient("vast20/vast"),
        inlineClient = feathersClient.getClient("vast20/inline"),
        wrapperClient = feathersClient.getClient("vast20/wrapper"),
        creativeClient = feathersClient.getClient("vast20/creative"),
        linearClient = feathersClient.getClient("vast20/linear"),
        mediaFileClient = feathersClient.getClient("vast20/mediafile"),
        trackingEventsClient = feathersClient.getClient("vast20/trackingevents"),
        videoClicksClient = feathersClient.getClient("vast20/videoclicks"),
        close;

    return {
        updateVast: function(diff, nowVast){
            var isUpdate = false;
            if(diff.inLine){
                isUpdate = isUpdate || this.updateInLine(diff.inLine,nowVast.inLine);
            }
            if(diff.wrapper){
                isUpdate = isUpdate || this.updateWrapper(diff.wrapper,nowVast.wrapper);
            }
            if(diff.settings || (!isUpdate && (diff.inLine || diff.wrapper))){
                var vast = utils.restoreLink("Vast", nowVast);
                vastClient.update([vast.id,vast],function(err, vast){
                    console.log("vast update",vast);
                });
                isUpdate = true;
            }
            return isUpdate;
        },
        updateInLine: function(diff, nowInLine){
            var isUpdate = false;
            if(diff.creatives){
                isUpdate = isUpdate || !!_.filter(diff.creatives,function(creative,index){
                    return this.updateCreative(creative, nowInLine.creatives[index]);
                },this).length;
            }
            if(diff.settings || (!isUpdate && diff.creatives)){
                var inLine = utils.restoreLink("InLine", nowInLine);
                inlineClient.update([inLine.id,inLine],function(err, inLine){
                    console.log("inLine update",inLine);
                });
                isUpdate = true;
            }
            return isUpdate;
        },
        updateWrapper: function(diff, nowWrapper){
            var isUpdate = false;
            if(diff.creatives){
                isUpdate = isUpdate || !!_.filter(diff.creatives,function(creative,index){
                    return this.updateCreative(creative, nowWrapper.creatives[index]);
                },this).length;
            }
            if(diff.settings || diff.innerVast){
                var wrapper = utils.restoreLink("Wrapper", nowWrapper);
                wrapperClient.update([wrapper.id,wrapper],function(err, wrapper){
                    console.log("wrapper update", wrapper);
                });
                isUpdate = true;
            }
            return isUpdate;
        },
        updateCreative: function(diff, nowCreative){
            var isUpdate = false;
            if(diff.linear){
                isUpdate = isUpdate || this.updateLinear(diff.linear,nowCreative.linear);
            }
            if(diff.settings || (!isUpdate && diff.linear)){
                var creative = utils.restoreLink("Creative", nowCreative);
                creativeClient.update([creative.id,creative],function(err, creative){
                    console.log("wrapper creative", creative);
                });
                isUpdate = true;
            }
            return isUpdate;
        },
        updateLinear: function(diff, nowLinear){
            var isUpdate = false;
            if(diff.mediaFiles){
                isUpdate = isUpdate || !!_.filter(diff.mediaFiles,function(mediaFile,index){
                    return this.updateMediaFile(mediaFile, nowLinear.mediaFiles[index]);
                },this).length;
            }
            if(diff.trackingEvents){
                isUpdate = isUpdate || this.updateTrackingEvents(diff.trackingEvents, nowLinear.trackingEvents);
            }
            if(diff.videoClicks){
                isUpdate = isUpdate || this.updateVideoClicks(diff.videoClicks, nowLinear.videoClicks);
            }
            if(diff.settings){
                var linear = utils.restoreLink("Linear", nowLinear);
                linearClient.update([linear.id,linear],function(err, linear){
                    console.log("linear update", linear);
                });
                isUpdate = true;
            }
            return isUpdate;
        },
        updateMediaFile: function(diff, nowMediaFile){
            var isUpdate = false;
            if(diff.settings || diff.types || diff.video ){
                var mediaFile = utils.restoreLink("MediaFile", nowMediaFile);
                mediaFileClient.update([mediaFile.id,mediaFile],function(err, mediaFile){
                    console.log("mediaFile update", mediaFile);
                });
                isUpdate = true;
            }
            return isUpdate;
        },
        updateTrackingEvents: function(diff, nowTrackingEvents){
            var isUpdate = false;
            if(diff.settings){
                var trackingEvents = utils.restoreLink("TrackingEvents", nowTrackingEvents);
                trackingEventsClient.update([trackingEvents.id,trackingEvents],function(err, trackingEvents){
                    console.log("trackingEvents update", trackingEvents);
                });
                isUpdate = true;
            }
            return isUpdate;
        },
        updateVideoClicks: function(diff, nowVideoClicks){
            var isUpdate = false;
            if(diff.settings){
                var videoClicks = utils.restoreLink("VideoClicks", nowVideoClicks);
                videoClicksClient.update([videoClicks.id,videoClicks],function(err, videoClicks){
                    console.log("videoClicks update", videoClicks);
                });
                isUpdate = true;
            }
            return isUpdate;
        }
    };
});