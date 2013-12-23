var _ = require("lodash");
var utils = require("../../utils/utils");
var BaseModel = require("./baseModel").BaseModel;

function MediaFile(settings) {
    BaseModel.call(this);
    this.settings = _.merge({
        id: "",
        delivery: "streaming",
        //type: "video/ogg",
        //bitrate: "",
        //width: 640,
        //height: 360,
        scalable: true,
        maintainAspectRatio: "",
        apiFramework: ""
    }, settings);
    this.video = null;
    this.types = [];

}
utils.extend(MediaFile, BaseModel);
MediaFile.links = [];
MediaFile.prototype.idPrefix = "mediafile_";

MediaFile.type = ["video/ogg","video/mp4","video/webm"];
MediaFile.delivery = ["streaming","progressive"];

exports.MediaFile = MediaFile;
