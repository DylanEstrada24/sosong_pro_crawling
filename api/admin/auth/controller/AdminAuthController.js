const express = require('express');
const router = express.Router();
require('dotenv').config();

const bcrypt = require("bcrypt");

const {ErrorCode} = require("../../../common/model/ErrorCode");
const AdminAuthService = require('../service/AdminAuthService');
const jwt = require("../../../config/security/JwtTokenProvider");
const {ApiResponse} = require("../../../common/model/ApiResponse");

router.post('/v1/admin/auth/signin', (req, res)=>{
    let inputData = {
        email: req.body.email,
    }

    AdminAuthService.adminSignin(inputData).then((result) => {
        if(result[0] == null){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result[0] != null){
            if (!bcrypt.compareSync(req.body.password.toString(), result[0].password)) {
                return res.send(ApiResponse(ErrorCode.CODE_403));
            }
            let data = {
                email: result[0].email,
                token : jwt.createAdminAccessToken(result[0].idx),
            }

            return res.send(ApiResponse(true, "success", data));
        }
    })
})

module.exports = router;
