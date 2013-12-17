var vast20 = require("./vast20");

function generateBaseInLine(){
    var vast = new vast20.Vast({
        id: "321633-901135"
    });
    var inLine = new vast20.InLine({
        AdSystem: "AdFox.Ru",
        AdTitle: "GPMD"
    });
    vast.setInLine(inLine);
    var creative = new vast20.Creative({});
    inLine.addCreative(creative);
    var linear = new vast20.Linear({
        Duration: "00:00:00",
        AdParameters: ""
    });
    creative.setLinear(linear);
    vast20.Tracking.trackAll().forEach(function(trancking){
        linear.addTracking(trancking);
    });
    var videoClicks = new vast20.VideoClicks({
        ClickThrough: true,
        ClickTracking: true,
        CustomClick: true
    });
    linear.setVideoClicks(videoClicks);
    return vast;
}

function TestPoint(id){
    this.id = id;
    this.vasts = {};
    this.init();
}

TestPoint.prototype.init = function(){
    this.vasts.inline_1 = generateBaseInLine();
};

exports.TestPoint = TestPoint;