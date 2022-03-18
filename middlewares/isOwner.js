isOwner = (req,res,next) => {
    let user = req.session.user;
    if(user.id == 1){
        next();
    }else{
        res.redirect('/login');
    }
};

module.exports = isOwner;