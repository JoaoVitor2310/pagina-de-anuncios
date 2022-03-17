adminAuth = (req,res,next) => {
    let user = req.session.user;
    if(user != undefined){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = adminAuth;