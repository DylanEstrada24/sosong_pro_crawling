const express = require('express');
const router = express.Router();

require('dotenv').config();

const {ApiResponse} = require('../../../common/model/ApiResponse');
const NoticeService = require('../service/NoticeService');
const {ErrorCode} = require("../../../common/model/ErrorCode");

router.get('/v1/user/notice', (req, res) => {
    let inputData = {
        userIdx: req.userIdx,
        noticeIdx: req.params.noticeIdx,
    }
    NoticeService.getNotice(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, "success", result));
        } else if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})



module.exports = router;
