const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
require('dotenv').config();

const {validateToken} = require("../../../config/security/JwtTokenProvider");
const jwt = require("../../../config/security/JwtTokenProvider");

const {ApiResponse} = require('../../../common/model/ApiResponse');
const AuthService = require('../service/AuthService');
const {ErrorCode} = require("../../../common/model/ErrorCode");

// 유저 로그인
router.post('/v1/auth/signin', (req,res) => {

    let inputData = {
        email : req.body.email,
        fbToken: req.body.fbToken,
    }

    AuthService.AuthSignIn(inputData).then((result) => {
        console.log(result);
        if(result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_1113))
        } else if(result[0].code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if(result[0] != null) {
            if(!bcrypt.compareSync(req.body.password.toString(), result[0].password)){
                return res.send(ApiResponse(ErrorCode.CODE_1124))
            }

            // if(inputData.password != result[0].password){
            //     return res.send(ApiResponse(ErrorCode.CODE_1124));
            // }

            // inputData.token = jwt.createUserAccessToken(result[0].idx);


            AuthService.AuthSignInUpdateFbToken(inputData).then((result2) => {
                if(result2.affectedRows === 0){
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                } else if(result2.code){
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                }

                let data = {
                    idx: result[0].idx,
                    email: result[0].email,
                    nickName : result[0].nickName,
                    name: result[0].name,
                    gender : result[0].gender,
                    phoneNumber: result[0].phoneNumber,
                    status : result[0].status,
                    userType: result[0].userType,
                    push : result[0].push,
                    joinAt : result[0].joinAt,
                    modifyAt : result[0].modifyAt,
                    maxCase : result[0].maxCase,
                    token : jwt.createUserAccessToken(result[0].idx),
                    webToken : result[0].webToken
                }
                return res.send(ApiResponse(true, "success", data));
            })
        }
    })
})

// 유저 회원가입
router.post('/v1/auth/signup', (req, res) => {

    let inputData = {
        // 패스워드 암호화 /*
        // bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS)),*/

        email: req.body.email,
        password : bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS)),
        name: req.body.name,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,

    }

    AuthService.AuthSignUp(inputData).then((result) => {
        console.log(result);
        if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_1115))
        }else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, '회원가입 완료'));
        }
    });
})

// 유저 탈퇴
router.delete('/v1/auth/withdrawal', validateToken, (req, res) => {

    AuthService.AuthWithdrawal(req.userIdx).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_1115))
        }else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, '탈퇴완료'));
        } else if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

// 변경
router.put('/v1/auth/update/:email/:gender/:phoneNumber', validateToken, (req, res) => {

    const inputData = {
        userIdx : req.userIdx,
        email: req.params.email,
        gender: req.params.gender,
        phoneNumber: req.params.phoneNumber,
        nickName : req.params.nickName
    }

    AuthService.AuthUpdate(inputData).then((result) => {
        if(result.code){
            return res.send(ApiResponse(ErrorCode.CODE_1115))
        }else if(result.affectedRows !== 0){
            return res.send(ApiResponse(true, 'update 완료'));
        } else if(result.affectedRows === 0){
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

// 유저 비밀번호 수정
router.post('/v1/auth/update/pwd', validateToken, (req, res) => {

    const inputData = {
        userIdx : req.userIdx,
        newPassword : bcrypt.hashSync(req.body.newPassword, parseInt(process.env.SALT_ROUNDS))
    }

    AuthService.AuthUserCheck(inputData).then((result) => {
        if(result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_1113))
        } else if(result[0].code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if(result[0] != null) {
            if(!bcrypt.compareSync(req.body.password.toString(), result[0].password)){
                return res.send(ApiResponse(ErrorCode.CODE_1124))
            }
            AuthService.AuthUpdatePassword(inputData).then((result) => {
                if(result.code){
                    return res.send(ApiResponse(ErrorCode.CODE_1115))
                }else if(result.affectedRows !== 0){
                    return res.send(ApiResponse(true, 'update 완료'));
                } else if(result.affectedRows === 0){
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                }
            });
        }
    })
})

//
router.get('/v1/google/calendar/callback', (req, res) => {

    return res.send(true);

})

module.exports = router;
