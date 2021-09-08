const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
require('dotenv').config();

const {validateToken} = require("../../../config/security/JwtTokenProvider");

const {ApiResponse} = require('../../../common/model/ApiResponse');
const BoardService = require('../service/BoardService');
const {ErrorCode} = require("../../../common/model/ErrorCode");

router.post('/v1/board', validateToken, (req, res) => {

    let date = new Date();
    date.setHours(date.getHours()+9);

    let inputData = {
        userIdx: req.userIdx,
        title: req.body.title,
        content: req.body.content,
        createAt : date
    }

    BoardService.insertBoard(inputData).then((result) => {
        if(result.code){
          return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows != 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows == 0){
            return res.send(ApiResponse(ErrorCode.CODE_2401));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

router.get('/v1/board', (req, res) => {

    BoardService.getBoard().then((result) => {
        if(result[0] != null){
            return res.send(result);
        } else if(result[0] == null){
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
});


router.put('/v1/board/:boardIdx/:title/:content', validateToken, (req, res) => {

    let date = new Date();
    date.setHours(date.getHours()+9);

    let inputData = {
        userIdx: req.userIdx,
        boardIdx: req.params.boardIdx,
        title: req.params.title,
        content: req.params.content,
        date : date
    }

    BoardService.updateBoard(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows != 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows == 0){
            return res.send(ApiResponse(ErrorCode.CODE_2404));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

router.delete('/v1/board/:boardIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        boardIdx: req.params.boardIdx,
    }

    BoardService.deleteBoard(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows != 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows == 0){
            return res.send(ApiResponse(ErrorCode.CODE_2403));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})




router.post('/v1/board/comment', validateToken, (req, res) => {
    let inputData = {
        userIdx: req.userIdx,
        boardIdx: req.body.boardIdx,
        content: req.body.content,
        createAt: date
    }

    BoardService.insertComment(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows != 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows == 0){
            return res.send(ApiResponse(ErrorCode.CODE_2402));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

router.get('/v1/board/comment/:boardIdx', (req, res) => {

    console.log(req.params.boardIdx)
    BoardService.getCommentByBoardIdx(req.params.boardIdx).then((result) => {
        if(result[0] != null){
            return res.send(result);
        } else if(result[0] == null){
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
});

router.put('/v1/board/comment/:boardIdx/:commentIdx/:content', validateToken, (req, res) => {
    let inputData = {
        userIdx: req.userIdx,
        commentIdx: req.params.commentIdx,
        boardIdx: req.params.boardIdx,
        content: req.params.content,
    }

    BoardService.updateComment(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows != 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows == 0){
            return res.send(ApiResponse(ErrorCode.CODE_2402));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

router.delete('/v1/board/comment/:boardIdx/:commentIdx', validateToken, (req, res) => {
    let inputData = {
        userIdx: req.userIdx,
        commentIdx: req.params.commentIdx,
        boardIdx: req.params.boardIdx,
    }

    BoardService.deleteComment(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.affectedRows != 0){
            return res.send(ApiResponse(true, "success"));
        } else if(result.affectedRows == 0){
            return res.send(ApiResponse(ErrorCode.CODE_2402));
        } else{
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})






module.exports = router;
