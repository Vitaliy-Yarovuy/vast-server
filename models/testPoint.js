var vast20 = require("./vast20");
var vast20statistic = require("./vast20statistic");

function generateBaseCreative(){
    var creative = new vast20.Creative(null,{});
    var linear = new vast20.Linear(null,{
        Duration: "00:00:00",
        AdParameters: ""
    });
    creative.setLinear(linear);
    var trackingEvents = new vast20.TrackingEvents(null,{});
    linear.setTrackingEvents(trackingEvents);
    var videoClicks = new vast20.VideoClicks(null,{});
    linear.setVideoClicks(videoClicks);
    linear.addMediaFile(new vast20.MediaFile(null,{}));
    return creative;
}


function generateBaseInLine(id){
    var vast = new vast20.Vast(null,{
        id: "321633-"+id
    });
    var inLine = new vast20.InLine(null,{
        AdSystem: "AdFox.Ru",
        AdTitle: "GPMD"
    });
    vast.setInLine(inLine);
    inLine.addCreative(generateBaseCreative());
    return vast;
}

function TestPoint(id){
    this.id = id;
    this.vasts = {};
    this.vastStatistics = {};
    this.init();
}

TestPoint.prototype.init = function(){
    this.vasts.inline_1 = generateBaseInLine('inline_1');
    this.vasts.inline_2 = generateBaseInLine('inline_2');
    this.vastStatistics.inline_1 = new vast20statistic.VastStatistic(null, this.vasts.inline_1);
    this.vastStatistics.inline_2 = new vast20statistic.VastStatistic(null, this.vasts.inline_2);
};

exports.TestPoint = TestPoint;