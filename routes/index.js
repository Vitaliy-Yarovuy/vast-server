
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: ' - advertisement VAST 2.0 test server' });
};