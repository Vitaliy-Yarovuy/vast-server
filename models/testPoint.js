var vast20 = require("./vast20");
var vast20statistic = require("./vast20statistic");
var TestPointItem = require("./testPoinеItem").TestPointItem;
var _ = require("lodash");

function generateBaseCreative(isInline){
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
    if(isInline){
        linear.addMediaFile(new vast20.MediaFile(null,{}));
    }
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
    inLine.setExtensions(new vast20.Extensions(null,{}));
    vast.setInLine(inLine);
    inLine.addCreative(generateBaseCreative(true));
    return vast;
}

function generateBaseWrapper(id){
    var vast = new vast20.Vast(null,{
        id: "321633-"+id
    });
    var wrapper = new vast20.Wrapper(null,{
        AdSystem: "AdFox.Ru",
        AdTitle: "GPMD"
    });
    wrapper.setExtensions(new vast20.Extensions(null,{}));
    vast.setWrapper(wrapper);
    wrapper.addCreative(generateBaseCreative(false));
    return vast;
}


function TestPoint(id){
    this.id = id;
    this.items = {};
    this.init();
}

TestPoint.prototype.init = function(){
    _.forEach({
        inline_1: generateBaseInLine('inline_1'),
        wrapper_1: generateBaseWrapper('wrapper_1'),
        wrapper_2: generateBaseWrapper('wrapper_2')
    },function(value,key){
        this.items[key] = new TestPointItem(null,value);
    },this);
};

exports.TestPoint = TestPoint;