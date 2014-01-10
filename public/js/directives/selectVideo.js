app.directive('ngSelectVideo', function ($compile, $timeout, videoHelper, scopeHelper) {


    function getVideoView(video){
        var size = videoHelper.getSize(video).map(function(size){
            return (size[0] || "--") + "x" + (size[1] || "--");
        }).join(", ");
        var format = videoHelper.getFormat(video).join(", ");
        var duration = videoHelper.getDuration(video).join(", ");
        var link = videoHelper.getMp4PlayLink(video);

        var result ="<h4 class='pos-r'>"+video.name+ "<a class='btn btn-xs btn-primary pos-a tr-5' href='"+link+"' target='_blank'><i class='glyphicon glyphicon-play-circle'</i></a></h4>";
        result += "<table class='table table-bordered'>";
        result += "<tr><th>size:</th><th>format:</th><th>duration:</th></tr>";
        result += "<tr>";
        result += "<td>"+size+"</td>";
        result += "<td>"+format+"</td>";
        result += "<td>"+duration+"</td>";
        result += "<tr>";
        result += "</table>";
        return result;
    }

    return {
        scope: false,
        link: function (scope, $element, attrs) {
            var videoKey = scope.$eval(attrs.ngSelectVideo),
                videoLists = scope.$eval(attrs.ngSelectVideoLists),
                $btn = $element.find("[ng-select-video-btn]"),
                $videoItems = $([]);

            scope.$watch(attrs.ngSelectVideo,function(newVideoKey){
                $btn.html(newVideoKey?newVideoKey:"select video !!!");
                $btn.parents(".btn").toggleClass("btn-success",!!newVideoKey);
                $btn.parents(".btn").toggleClass("btn-warning",!newVideoKey);
            });

            $timeout(function(){
                $videoItems = $element.find("[ng-select-video-item]");
                $videoItems.each(function(index){
                    var $item = $(this),
                        itemScope = angular.element($item).scope(),
                        key = itemScope.$eval($item.attr("ng-select-video-item")),
                        video = videoLists[key];

                    $item.html(getVideoView(video));
                    $item.on("click",function(e){
                        if( ["A","I"].indexOf(e.target.tagName) != -1 && e.target != this){
                            return true;
                        }
                        e.preventDefault();
                        scopeHelper.setData(scope,attrs.ngSelectVideo,key);
                    });
                });
            },0);

        }
    };
});