var fs = require("fs");
var path = require("path");
var probe = require("node-ffprobe");

var lists = {};

function Video(name, path){
    this.name = name;
    this.path = path;
    this.files = [];
    this.init();
}

Video.prototype.init = function(){
    var that = this;
    fs.readdir(that.path, function(err, files){
        for(var i = 0; i < files.length; i++){
            var fPath = path.join(that.path,files[i]);
            var stats = fs.statSync(fPath);
            if(stats.isFile()){
                probe(fPath,function(err, info){
                    if(err){
                        return ;
                    }
                    that.files.push(info);
                })
            }
        }
    });
};

Video.prototype.getMediaData = function(){
    if(!this.mediaData || !this.mediaData.length){
        this.mediaData = this.files.map(function(file){

            var videoStream = file.streams.filter(function(stream){
                    return stream.height || stream.width;
                })[0],
                format = file.format.format_name;

            if(format.indexOf("webm") != -1){
                format = "video/webm";
            }else if(format.indexOf("mp4") != -1){
                format = "video/mp4";
            }else if(format.indexOf("ogg") != -1){
                format = "video/ogg";
            }else if(format.indexOf("flv") != -1){
                format = "video/flv";
            }

            return {
                type: format,
                bit_rate: file.format.bit_rate,
                width: videoStream.width,
                height: videoStream.height,
                src: "/" + file.file.split("/public/")[1]
            };
        });
    }
    return this.mediaData;
};


function findAllVideoInDir(prefix, rootPath){
    fs.readdir(rootPath, function(err, files){
        for(var i = 0; i < files.length; i++){
            var dPath = path.join(rootPath,files[i]);
            var stats = fs.statSync(dPath);
            if(stats.isDirectory()){
                var key = "d_" + prefix + '_' + files[i];
                lists[key] = new Video(key, dPath);
            }
        }
    });
}

function findAllVideo(rootPath){
    fs.readdir(rootPath, function(err, files){
        for(var i = 0; i < files.length; i++){
            var dPath = path.join(rootPath,files[i]);
            var stats = fs.statSync(dPath);
            if(stats.isDirectory()){
                findAllVideoInDir(files[i],dPath);
            }
        }
    });
}


exports.Video = Video;
exports.lists = lists;
exports.findAllVideo = findAllVideo;