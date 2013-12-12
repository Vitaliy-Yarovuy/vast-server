


var InLine = function(){
  this.settings = {
      AdSystem: "",
      AdTitle: "",
      Description: "",
      Survey: ""
  };
  this.creatives = [];
};


var Wrapper = function(){

};


var Creative = function(){
    this.linear = new Linear();
};

var Linear = function(){
    this.settings = {
        Duration: 0,
        isTracking: true,
        AdParameters: ""
    };
    this.videoClicks = new VideoClicks();
}

var VideoClicks = function(){
    this.settings = {
        ClickThrough: true,
        ClickTracking: true,
        CustomClick: true
    };
}

var MediaFile = function(){
    this.settings = {
        delivery: ["streaming","progressive"],
        type: ["video/ogg","video/mp4","video/webm"],
        bitrate: "",
        width: 640,
        height: 360,
        scalable: true,
        maintainAspectRatio: "",
        apiFramework: ""
    };
}
