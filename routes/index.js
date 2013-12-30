

module.exports = function(data){
    return {
        /*
         * GET home page.
         */
        index: function(req, res){
            res.render('index', { title: ' - advertisement VAST 2.0 test server' });
        },
        point: require("./point")(data)
    };
};
