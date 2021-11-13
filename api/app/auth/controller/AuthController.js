const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
require('dotenv').config();

const {validateToken} = require("../../../config/security/JwtTokenProvider");
const jwt = require("../../../config/security/JwtTokenProvider");

const {ApiResponse} = require('../../../common/model/ApiResponse');
const AuthService = require('../service/AuthService');
const {ErrorCode} = require("../../../common/model/ErrorCode");
const smtpTransport = require('./email');


// 유저 로그인
router.post('/v1/auth/signin', (req, res) => {

    let inputData = {
        email: req.body.email,
        fbToken: req.body.fbToken,
    }

    AuthService.AuthSignIn(inputData).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_1113))
        } else if (result[0].code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if (result[0] != null) {
            if (!bcrypt.compareSync(req.body.password.toString(), result[0].password)) {
                return res.send(ApiResponse(ErrorCode.CODE_1124))
            }

            AuthService.AuthSignInUpdateFbToken(inputData).then((result2) => {
                if (result2.affectedRows === 0) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                } else if (result2.code) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                }

                let data = {
                    idx: result[0].idx,
                    email: result[0].email,
                    nickName: result[0].nickName,
                    name: result[0].name,
                    gender: result[0].gender,
                    phoneNumber: result[0].phoneNumber,
                    status: result[0].status,
                    userType: result[0].userType,
                    push: result[0].push,
                    joinAt: result[0].joinAt,
                    modifyAt: result[0].modifyAt,
                    maxCase: result[0].maxCase,
                    token: jwt.createUserAccessToken(result[0].idx),
                    webToken: result[0].webToken
                }
                return res.send(ApiResponse(true, "success", data));
            })
        }
    })
})

// 유저 회원가입
router.post('/v1/auth/signup', (req, res) => {

    let inputData = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS)),
        name: req.body.name,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
    }

    AuthService.AuthSignUp(inputData).then((result) => {
        if (result.affectedRows === 0) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_1115))
        } else if (result.affectedRows !== 0) {
            return res.send(ApiResponse(true, '회원가입 완료'));
        }
    });
})

// 유저 탈퇴
router.delete('/v1/auth/withdrawal', validateToken, (req, res) => {

    AuthService.AuthWithdrawal(req.userIdx).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_1115))
        } else if (result.affectedRows !== 0) {
            return res.send(ApiResponse(true, '탈퇴완료'));
        } else if (result.affectedRows === 0) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

// 변경
router.put('/v1/auth/update/:email/:gender/:phoneNumber', validateToken, (req, res) => {

    const inputData = {
        userIdx: req.userIdx,
        email: req.params.email,
        gender: req.params.gender,
        phoneNumber: req.params.phoneNumber,
        nickName: req.params.nickName
    }

    AuthService.AuthUpdate(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_1115))
        } else if (result.affectedRows !== 0) {
            return res.send(ApiResponse(true, 'update 완료'));
        } else if (result.affectedRows === 0) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    });
})

// 유저 비밀번호 수정
router.post('/v1/auth/update/pwd', validateToken, (req, res) => {

    const inputData = {
        userIdx: req.userIdx,
        newPassword: bcrypt.hashSync(req.body.newPassword, parseInt(process.env.SALT_ROUNDS))
    }

    AuthService.AuthUserCheck(inputData).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_1113))
        } else if (result[0].code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if (result[0] != null) {
            if (!bcrypt.compareSync(req.body.password.toString(), result[0].password)) {
                return res.send(ApiResponse(ErrorCode.CODE_1124))
            }
            AuthService.AuthUpdatePassword(inputData).then((result) => {
                if (result.code) {
                    return res.send(ApiResponse(ErrorCode.CODE_1115))
                } else if (result.affectedRows !== 0) {
                    return res.send(ApiResponse(true, 'update 완료'));
                } else if (result.affectedRows === 0) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                }
            });
        }
    })
})

router.post('/v1/auth/findpw', (req, res) => {

    const inputData = {
        userEmail: req.body.userEmail,
    }

    AuthService.findUserFromEmail(inputData).then((result) => {
        console.log('inputData', inputData)
        console.log('result', result)
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_1113)) //need to init error code ... dk
        } else {
            //here make random password
            var upperChar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            var lowerChar = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var numericChar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
            var emoteChar = ['!', '#', '.']

            //ramdom mix
            var tempNewPassword = '';

            for (var i = 1; i < 3; i++) {
                tempNewPassword += lowerChar[Math.floor(Math.random() * lowerChar.length)]
                tempNewPassword += upperChar[Math.floor(Math.random() * upperChar.length)]
                if (i == Math.floor(Math.random() * 2)) {
                    tempNewPassword += lowerChar[Math.floor(Math.random() * lowerChar.length)]
                }
                tempNewPassword += lowerChar[Math.floor(Math.random() * lowerChar.length)]
                tempNewPassword += emoteChar[Math.floor(Math.random() * emoteChar.length)]
                if (i == Math.floor(Math.random() * 2)) {
                    tempNewPassword += numericChar[Math.floor(Math.random() * numericChar.length)]
                }
            }

            console.log('result[0]', result[0])
            console.log('reuslt[0].idx', result[0].idx)
            var innerInputData = {
                userIdx: result[0].idx,
                newPassword: bcrypt.hashSync(tempNewPassword, parseInt(process.env.SALT_ROUNDS))
            }

            console.log('inner', innerInputData)
            AuthService.AuthUpdatePassword(innerInputData).then(async (result) => {
                console.log(result)
                if (result.code) {
                    return res.send(ApiResponse(ErrorCode.CODE_3000))
                } else if (result.affectedRows !== 0) {
                    //here add send email logic ... dk

                    const emailOption = {
                        from: "sosongproservice@gmail.com",
                        to: inputData.userEmail,
                        subject: "소송프로 비밀번호 찾기안내 메일입니다.",
                        text: "내 손안의 소송비서 소송프로 입니다. 새 비밀번호를 안내드립니다. \n 비밀번호 : " + tempNewPassword
                    }

                    console.log('email option', emailOption)
                    // 에러 처리
                    let flag = 0;
                    await smtpTransport.sendMail(emailOption, (err, flag) => {
                        console.log('flag', flag)
                        if (err) {
                            console.log('err', err)
                            flag = 1 // 에러
                        } else {
                            console.log('ok', ok)
                            flag = 0; // 정상
                        }
                    });

                    if (flag == 1) {
                        smtpTransport.close();
                        return res.send(ApiResponse(true, 'fail'));
                    } else {
                        smtpTransport.close();
                        return res.send(ApiResponse(true, 'success'));
                    }
                } else if (result.affectedRows === 0) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                }
            });
        }
    })


})

module.exports = router;
