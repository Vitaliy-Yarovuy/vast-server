var _ = require("lodash");

function MediaFile(settings) {
    this.settings = _.merge({
        id: "",
        delivery: "streaming",
        type: "video/ogg",
        bitrate: "",
        width: 640,
        height: 360,
        scalable: true,
        maintainAspectRatio: "",
        apiFramework: "",
        value: null
    }, settings);
}

MediaFile.type = ["video/ogg","video/mp4","video/webm"];
MediaFile.delivery = ["streaming","progressive"];

exports.MediaFile = MediaFile;
