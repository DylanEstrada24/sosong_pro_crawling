const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const {validateToken} = require("../../config/security/JwtTokenProvider");

const {ApiResponse} = require('../../common/model/ApiResponse');

const {ErrorCode} = require("../../common/model/ErrorCode");

const request = require('request');
const qs = require('querystring');
const googleApis = require('googleapis');

router.get('/v1/purchase/:token', /*validateToken*/ (req, res) => {

    // let inputData = {
    //     userIdx: req.userIdx,
    //     title: req.body.title,
    //     content: req.body.content,
    //     createAt : new Date()
    // }

    purchaseValidation(req, res);

})

function purchaseValidation(req, res){
    const _packageName = 'com.hidev.sosongpro';
    const _productId = 'com.hidev.sosongpro.ssproplusmembership';
    let _token = req.params.token;

    let url = 'https://www.googleapis.com/androidpublicsher/v3/applications/${_packageName}/purchases/products/${_productId}/tokens/${_token}';
    let reqUrl = url + '?access_token=${recently_token}';

    let logSTR = '받은토큰:' + req.query.token;
    console.log(logSTR);

    res.redirect(reqUrl);
}


module.exports = router;
