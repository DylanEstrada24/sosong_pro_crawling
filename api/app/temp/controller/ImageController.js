const express = require('express');
const router = express.Router();
const fs = require("fs");
require('dotenv').config();
const path = require('path');

router.get('/v1/test/image', async (req, res) => {

    // return res.end(''+
    //     '<!DOCTYPE html>' +
    //     '<html>' +
    //     '<head>' +
    //     '</head>' +
    //     '<body>' +
    //     '<div>' +
    //     // '<img src="image2?file=sample.png"/>' +
    //     '<img src="image2?file='+ req.query.file +'"/>' +
    //     '</div>' +
    //     '</body>' +
    //     '</html>');

    console.log(path.parse('./captchaImg/' + req.query.file));

    return res.send('' +
        '<html style="height: 100%;">' +
        '<head>' +
        '<meta name="viewport" content="width=device-width, minimum-scale=0.1">' +
        '<title>captchaImg (120×40)</title>' +
        '</head>' +
        '<body style="margin: 0px; background: #0e0e0e; height: 100%">' +
        '<img style="-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="image2?file='+ req.query.file +'">' +
        '</body>' +
        '<whale-quicksearch translate="no">' +
        '</whale-quicksearch>' +
        '</html>')

})

router.get('/v1/test/image2', async (req, res) =>{
    console.log(req.query.file)
    try{
        let file =  fs.readFileSync('./captchaImg/' + req.query.file);
        res.send(file);
    } catch (e){
        res.send("404");
    }

})

module.exports = router;
