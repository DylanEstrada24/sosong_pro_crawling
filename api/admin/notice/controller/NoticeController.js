const express = require('express');
const router = express.Router();

require('dotenv').config();

const {validateToken} = require("../../../config/security/JwtTokenProvider");

const {ApiResponse} = require('../../../common/model/ApiResponse');
const NoticeService = require('../service/NoticeService');
const {ErrorCode} = require("../../../common/model/ErrorCode");
const {checkAdmin} = require("../../../config/security/adminCheck");

router.post('/v1/admin/notice', validateToken, checkAdmin, (req, res) => {

    let date = new Date();

    console.log(date);

    let inputData = {
        title: req.body.title,
        content: req.body.content,
        createAt : date,
        updateAt : date,
    }

    NoticeService.insertNotice(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

router.get('/v1/admin/notice', (req, res) => {
    let inputData = {
        userIdx: req.userIdx,
        noticeIdx: req.params.noticeIdx,
    }

    NoticeService.getNotice(inputData).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2401));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            return res.send(ApiResponse(true, "success", result));
        }
    });
})

router.get('/v1/admin/notice/noticeIdx/:noticeIdx', validateToken,checkAdmin, (req, res) => {

    NoticeService.getNoticeByNoticeIdx(req.params.noticeIdx).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2401));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            return res.send(ApiResponse(true, "success", result));
        }

    });
})

router.put('/v1/admin/notice/:noticeIdx/:title/:content', validateToken, checkAdmin,(req, res) => {

    let date = new Date();

    let inputData = {
        noticeIdx: req.params.noticeIdx,
        title : req.params.title,
        content: req.params.content,
        createAt : date,
    }

    NoticeService.updateNotice(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

router.delete('/v1/admin/notice/:noticeIdx', validateToken, checkAdmin,(req, res) => {
    let inputData = {
        noticeIdx: req.params.noticeIdx,
    }

    NoticeService.deleteNotice(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})


module.exports = router;
