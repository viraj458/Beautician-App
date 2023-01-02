const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('welcome to api')
});

require('./AuthRoutes')(router);
// require('./BeauticianRoutes')(router);
// require('./CustomerRoutes')(router);

module.exports.router = router;