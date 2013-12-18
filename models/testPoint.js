var vast20 = require("./vast20");

function generateBaseCreative(){
    var creative = new vast20.Creative({});
    var linear = new vast20.Linear({
        Duration: "00:00:00",
        AdParameters: ""
    });
    creative.setLinear(linear);
    var trackingEvents = new vast20.TrackingEvents({});
    linear.setTrackingEvents(trackingEvents);
    var videoClicks = new vast20.VideoClicks({});
    linear.setVideoClicks(videoClicks);
    linear.addMediaFile(new vast20.MediaFile({}));
    linear.addMediaFile(new vast20.MediaFile({}));
    linear.addMediaFile(new vast20.MediaFile({}));
    return creative;
}


function generateBaseInLine(id){
    var vast = new vast20.Vast({
        id: "321633-"+id
    });
    var inLine = new vast20.InLine({
        AdSystem: "AdFox.Ru",
        AdTitle: "GPMD"
    });
    vast.setInLine(inLine);
    inLine.addCreative(generateBaseCreative());
    inLine.addCreative(generateBaseCreative());
    return vast;
}

function TestPoint(id){
    this.id = id;
    this.vasts = {};
    this.init();
}

TestPoint.prototype.init = function(){
    this.vasts.inline_1 = generateBaseInLine('inline_1');
    this.vasts.inline_2 = generateBaseInLine('inline_2');
};

exports.TestPoint = TestPoint;