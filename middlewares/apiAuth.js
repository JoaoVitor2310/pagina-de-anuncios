const jwt = require('jsonwebtoken');

apiAuth = (req,res,next) => {
    const authToken = req.headers['authorization'];
    if((authToken != undefined) && (authToken != null)){
        const bearer = authToken.split(' ');
        const JWTSecret = 'asodihaihfduhsfdgiu';
        let token = bearer[1];
        jwt.verify(token, JWTSecret, (err, data) => {
            if(err){
                res.status(401);
                res.json({error: "Token inválido"});
            }else{
                res.status(200);
                req.id = data.id;
                next();
            }
        })
    }else{
        res.status(401);
        res.json({error: "Cadastre-se"});
    }
}

module.exports = apiAuth;