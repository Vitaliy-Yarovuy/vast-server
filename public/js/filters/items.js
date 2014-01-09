/**
 * angular filter that checks on entering into an array
 */
app.filter('items', function() {
    return function( items,  pass ) {
        var isArray = _.isArray(items),
            retValue = isArray ? [] : {};
        pass = pass || [];

        _.each(items, function(item, key) {
            if( pass.indexOf(key) != -1 ){
                if(isArray){
                    this.push(item);
                } else{
                    this[key] = item;
                }
            }
        },retValue);

        return retValue;
    };
});