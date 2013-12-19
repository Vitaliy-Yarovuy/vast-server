'use strict';

app.factory('videoHelper',function ($rootScope){
    return {
        getSize: function(video){
            return video.files.reduce(function(total, item){
                var size = item.streams.filter(function(stream){
                    return stream.height || stream.width;
                }).map(function(stream){
                        return [ stream.width||0,stream.height||0];
                })[0];
                if(size){
                    _.some(total, function(item){
                        return !_.difference(item,size).length;
                    }) || total.push(size);
                }
                return total;
            },[]);
        },
        getFormat: function(video){
            return video.files.reduce(function(total, item){
                var format = item.format.format_name;
                if(format){
                    if(format.indexOf("webm") != -1){
                        format = "video/webm";
                    }else if(format.indexOf("mp4") != -1){
                        format = "video/mp4";
                    }else if(format.indexOf("ogg") != -1){
                        format = "video/ogg";
                    }else if(format.indexOf("flv") != -1){
                        format = "video/flv";
                    }
                    if(total.indexOf(format) == -1){
                        total.push(format);
                    }
                }
                return total;
            },[]);
        },
        getBitRate: function(video){
            return video.files.reduce(function(total, item){
                var bit_rate = item.format.bit_rate;
                if(bit_rate && total.indexOf(bit_rate) == -1){
                    total.push(bit_rate);
                }
                return total;
            },[]);
        },
        getDuration: function(video){
            return video.files.reduce(function(total, item){
                var duration = item.format.duration;
                duration = Math.floor(duration*10)/10;
                if(duration && total.indexOf(duration) == -1){
                    total.push(duration);
                }
                return total;
            },[]);
        },
        getMp4PlayLink: function (video){
            var file = video.files.filter(function(item){
                var format = item.format.format_name;
                return format && format.indexOf("mp4") != -1;
            })[0];
            var link = file.file.split("/public/")[1];
            return "/" + link;
        }
    };
});