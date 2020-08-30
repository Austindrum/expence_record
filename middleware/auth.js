module.exports = {
    authenticator: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash("error_msg", "請先登入");
            res.redirect("/user/login");
        }
    }
}