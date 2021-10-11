const express = require('express');
const router = express.Router();

const {validateToken} = require("../../../config/security/JwtTokenProvider");
const {ApiResponse} = require('../../../common/model/ApiResponse');
const {ErrorCode} = require("../../../common/model/ErrorCode");

const UserService = require('../service/UserService');

router.get('/v1/user/info', validateToken, (req, res) => {

    UserService.getUserInfoByUserIdx(parseInt(req.userIdx)).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_403))
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if (result[0] != null) {
            return res.send(result);
        }
    })
})

router.put('/v1/user/pushSetting/:time', validateToken, (req, res)=>{

    let inputData = {
        userIdx: req.userIdx,
        time: req.params.time,
    }

    UserService.updateUserAlarmSetting(inputData).then((result)=>{
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows != 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows == 0){
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    })
});




module.exports = router;
