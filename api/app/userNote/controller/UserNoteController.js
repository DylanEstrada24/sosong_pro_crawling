const express = require('express');
const router = express.Router();

const {validateToken} = require("../../../config/security/JwtTokenProvider");
const {ApiResponse} = require('../../../common/model/ApiResponse');
const {ErrorCode} = require("../../../common/model/ErrorCode");

const UserNoteService = require('../service/UserNoteService');

router.get('/v1/user/case/usernote/:caseIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        caseIdx: req.params.caseIdx,
    }

    UserNoteService.getCaseUserNoteByUserIdxAndCaseIdx(inputData).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2301));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            return res.send(result);
        }
    })
})

router.post('/v1/user/case/usernote', validateToken, (req, res) => {

    let date = new Date();
    // date = date.setHours(date.getHours()+9);
    // console.log(date);

    let inputData = {
        title: req.body.title,
        updateAt: date,
        content: req.body.content,
        settingAt: req.body.settingAt,
        userIdx: req.userIdx,
        caseIdx: req.body.caseIdx,
    }

    UserNoteService.insertUserNoteInCase(inputData).then((result) => {
        if (result.affectedRows === 0) {
            return res.send(ApiResponse(ErrorCode.CODE_403))
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if (result.affectedRows !== 0) {
            return res.send(ApiResponse(true, 'success'))
        }

    })
})

router.get('/v1/user/case/note/userIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
    }

    UserNoteService.getUserCaseByUserIdx(inputData).then((result_userCase) => {
        if (result_userCase[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2201));
        } else if (result_userCase.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result_userCase[0] != null) {
            UserNoteService.getCaseNoteByUserIdx(inputData).then((result_caseNote) => {
                if (result_caseNote[0] == null) {
                    return res.send(ApiResponse(ErrorCode.CODE_2201));
                } else if (result_caseNote.code) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                } else if (result_caseNote[0] != null) {

                    let data = []
                    let userNoteTmp = [];
                    for (let i = 0; i < result_userCase.length; i++) {
                        let userCase = {
                            title : result_userCase[i].title,
                            caseIdx : result_userCase[i].idx
                        };
                        for(let j=0; j < result_caseNote.length; j++) {
                            if(result_userCase[i].idx === result_caseNote[j].userCase_idx){
                                let userTodo = {
                                    todoIdx : result_caseNote[j].idx,
                                    title: result_caseNote[j].title,
                                    updateAt : result_caseNote[j].updateAt,
                                    settingAt: result_caseNote[j].settingAt,
                                    favorite: result_caseNote[j].favorite,
                                    isCheck: result_caseNote[j].isCheck,
                                    content: result_caseNote[j].content,
                                    caseIdx : result_caseNote[j].userCase_idx
                                }
                                userNoteTmp.push(userTodo);
                            }
                        }
                        data.push({
                            userCase : userCase,
                            userNote : userNoteTmp
                        });
                        userNoteTmp = [];
                    }
                    return res.send(ApiResponse(true, "success", data));
                }
            })

        }
    })
})

router.get('/v1/user/case/note/date/:date', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        updateAt: req.params.date,
    }

    UserNoteService.getUserCaseByUserIdx(inputData).then((result_userCase) => {
        if (result_userCase[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2201));
        } else if (result_userCase.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result_userCase[0] != null) {
            UserNoteService.getCaseNoteByDate(inputData).then((result_caseNote) => {
                if (result_caseNote[0] == null) {
                    return res.send(ApiResponse(ErrorCode.CODE_2201));
                } else if (result_caseNote.code) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                } else if (result_caseNote[0] != null) {

                    let data = []
                    let userNoteTmp = [];
                    for (let i = 0; i < result_userCase.length; i++) {
                        let userCase = {
                            title : result_userCase[i].title,
                            caseIdx : result_userCase[i].idx
                        };
                        for(let j=0; j < result_caseNote.length; j++) {
                            if(result_userCase[i].idx === result_caseNote[j].userCase_idx){
                                let userTodo = {
                                    todoIdx : result_caseNote[j].idx,
                                    title: result_caseNote[j].title,
                                    updateAt : result_caseNote[j].updateAt,
                                    settingAt: result_caseNote[j].settingAt,
                                    favorite: result_caseNote[j].favorite,
                                    isCheck: result_caseNote[j].isCheck,
                                    content: result_caseNote[j].content,
                                    caseIdx : result_caseNote[j].userCase_idx
                                }
                                userNoteTmp.push(userTodo);
                            }
                        }
                        if(userNoteTmp.length !== 0) {
                            data.push({
                                userCase: userCase,
                                userNote: userNoteTmp
                            });
                            userNoteTmp = [];
                        }
                    }
                    return res.send(ApiResponse(true, "success", data));
                }
            })

        }
    })
})



module.exports = router;
