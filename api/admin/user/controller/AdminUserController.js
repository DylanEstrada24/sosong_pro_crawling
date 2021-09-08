const express = require('express');
const router = express.Router();
require('dotenv').config();

const {ErrorCode} = require("../../../common/model/ErrorCode");
const AdminUserService = require('../service/AdminUserService');
const {validateToken} = require("../../../config/security/JwtTokenProvider");
const {ApiResponse} = require("../../../common/model/ApiResponse");
const {checkAdmin} = require("../../../config/security/adminCheck");

router.get('/v1/admin/user', validateToken, checkAdmin, (req, res) => {

    AdminUserService.AdminGetUser().then((result) => {
        return res.send(ApiResponse(true, "success",result));
    })
})

router.post('/v1/admin/update/user/status', validateToken, (req, res)=>{
    let inputData = {
        userIdx: req.body.userIdx,
        status: req.body.status,
    }
    AdminUserService.AdminUpdateUserStatus(inputData).then((result) => {
        if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, "success"));
        }
    })
})

router.post('/v1/admin/update/user/type', validateToken, /*checkAdmin,*/ (req, res)=>{
    let inputData = {
        userIdx: req.body.userIdx,
        userType: req.body.userType,
    }
    AdminUserService.AdminUpdateUserType(inputData).then((result) => {
        if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, "success"));
        }
    })
})



module.exports = router;
