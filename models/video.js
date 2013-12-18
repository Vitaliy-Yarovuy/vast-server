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

function findAllVideoInDir(prefix, rootPath){
    fs.readdir(rootPath, function(err, files){
        for(var i = 0; i < files.length; i++){
            var dPath = path.join(rootPath,files[i]);
            var stats = fs.statSync(dPath);
            if(stats.isDirectory()){
                var key = prefix + '_' + files[i];
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