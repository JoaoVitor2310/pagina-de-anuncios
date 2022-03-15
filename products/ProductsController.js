const express = require('express');
const router = express.Router();

router.get('/products', (req,res) => {
    res.send('Rota de produtos');
});


module.exports = router;