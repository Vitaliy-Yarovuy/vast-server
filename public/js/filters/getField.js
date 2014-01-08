/**
 * angular filter that checks on entering into an array
 */
app.filter('getField', function() {
    return function( items, field, value ) {
        if(field == 'key'){
            return _.keys(items);
        } else{
            return _.map(items, function(item, key) {
                return item[field];
            });
        }
    };
});