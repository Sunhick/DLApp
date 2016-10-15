/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var path = require("path");
var Users = require("../models/users")

module.exports = function(router) {

    router.use('/partials/:page', function(req, res, next) {
        res.render(path.join('partials',req.params.page));
    });

    router.post('/login/register', function(req, res, next) {
        var data = req.body;
        console.log("register clicked " + data.email + data.password);

        var regUser = new Users({email:data.email, password: data.password});
        regUser.save(function(error) {
            var status;
            if (error) {
                console.log("Error saving !" + error);
                status = error;
            }
            else {
                console.log("User registered!");
                status = "User registered!";
            }

            res.send(status);
        });
    });

    router.post('/login/auth', function(req, res, next) {
        var data = req.body;
        console.log("Auth data: " + data.email + data.password);

        Users.findOne({email: data.email, password: data.password}, function(error, user) {
            if (error) {
                console.log("unable to query mongodb!");
                res.send({type:"error", reason:error});
            } else if(user == null || user == undefined) {
                console.log("emtpy object")
                res.send({type:"error", reason:"Invalid email id or password"});
            } else {
                console.log(user);
                console.log("Authenticated!");
                res.send({type:"success"})
            }
        })
    });
    // module.exports = router;
}