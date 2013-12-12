
/*
 * GET users listing.
 */

exports.point = function(req, res){
    var id = req.params.id;
    res.render('point', {
        id: id,
        title: 'test point "'+id+'" '
    });
};