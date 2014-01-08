/**
 * angular filter that checks on entering into an array
 */
app.filter('excludeItems', function() {
    return function( items, field, value ) {
        var isArray = _.isArray(items),
            retValue = isArray ? [] : {};

        _.each(items, function(item, key) {
            if(field == 'key' && key != value || field != 'key' && item[field] != value ){
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