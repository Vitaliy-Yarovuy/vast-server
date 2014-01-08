(function(undefined){

    var utils = {
        modelLinks: window.modelLinks || {},
        restoreLink: function(modelName, obj){
            var lObj = _.cloneDeep(obj),
                links = this.modelLinks[modelName] || [];
            links.forEach(function(link){
                var data = lObj[link];
                if(!data || _.isString(data)){
                    return ;
                }
                if(_.isArray(data)){
                    lObj[link] = data.map(function(item){ return item.id});
                }else{
                    lObj[link] = data.id;
                }
            });
            return lObj;
        }
    };

    window.utils = utils;
})();