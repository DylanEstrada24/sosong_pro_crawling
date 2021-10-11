const express = require('express');
const router = express.Router();

const {validateToken} = require("../../../config/security/JwtTokenProvider");
const {ApiResponse} = require('../../../common/model/ApiResponse');
const {ErrorCode} = require("../../../common/model/ErrorCode");

const UserTodoService = require('../service/UserTodoService');
// const UserCaseService = require("../service/UserCaseService");


router.get('/v1/user/case/todo/caseIdx/:caseIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        caseIdx: req.params.caseIdx,
    }

    UserTodoService.getCaseTodoByUserIdxAndCaseIdx(inputData).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2201));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            return res.send(result);
        }
    })
})

router.put('/v1/user/case/todo/favorite/:caseIdx/:todoIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        todoIdx: req.params.todoIdx,
        caseIdx: req.params.caseIdx,
    }

    UserTodoService.getCaseTodoByTodoIdxAndCaseIdx(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else if (result[0] != null) {

            console.log(result[0]);

            if(result[0].favorite === "true"){
                UserTodoService.toggleUserTodoFavorite(inputData, false).then((result) => {})
            }else if(result[0].favorite === "false"){
                UserTodoService.toggleUserTodoFavorite(inputData, true).then((result) => {})
            }

            return res.send(ApiResponse(true, "success"));
        }
    })
})

router.put('/v1/user/case/todo/isCheck/:caseIdx/:todoIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        todoIdx: req.params.todoIdx,
        caseIdx: req.params.caseIdx,
    }

    UserTodoService.getCaseTodoByTodoIdxAndCaseIdx(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else if (result[0] != null) {

            if(result[0].isCheck === "true"){
                UserTodoService.toggleUserTodoisCheck(inputData, false).then((result) => {})
            }else if(result[0].isCheck === "false"){
                UserTodoService.toggleUserTodoisCheck(inputData, true).then((result) => {})
            }

            return res.send(ApiResponse(true, "success"));
        }
    })
})

// 개인 사건별 todo 들고오기
router.get('/v1/user/case/todo/userIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
    }

    UserTodoService.getUserCaseByUserIdx(inputData).then((result_userCase) => {
        if (result_userCase[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2201));
        } else if (result_userCase.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result_userCase[0] != null) {
            UserTodoService.getCaseTodoByUserIdx(inputData).then((result_caseTodo) => {
                if (result_caseTodo[0] == null) {
                    return res.send(ApiResponse(ErrorCode.CODE_2201));
                } else if (result_caseTodo.code) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                } else if (result_caseTodo[0] != null) {

                    let data = []
                    let userTodoTmp = [];
                    for (let i = 0; i < result_userCase.length; i++) {
                        let userCase = {
                            title : result_userCase[i].title,
                            caseIdx : result_userCase[i].idx
                        };
                        for(let j=0; j < result_caseTodo.length; j++) {
                            if(result_userCase[i].idx === result_caseTodo[j].userCase_idx){
                                let userTodo = {
                                    todoIdx : result_caseTodo[j].idx,
                                    title: result_caseTodo[j].title,
                                    updateAt : result_caseTodo[j].updateAt,
                                    settingAt: result_caseTodo[j].settingAt,
                                    favorite: result_caseTodo[j].favorite,
                                    isCheck: result_caseTodo[j].isCheck,
                                    content: result_caseTodo[j].content,
                                    caseIdx : result_caseTodo[j].userCase_idx
                                }
                                userTodoTmp.push(userTodo);
                            }
                        }
                            data.push({
                                userCase : userCase,
                                userTodo : userTodoTmp
                            });
                            userTodoTmp = [];
                    }
                    return res.send(ApiResponse(true, "success", data));
                }
            })
        }
    })
})


router.post('/v1/user/case/usertodo', validateToken, (req, res) => {

    let date = new Date();
    // date = date.setHours(date.getHours()+9);
    // date = date.toString();
    // console.log(date);
    let inputData = {
        title : req.body.title,
        updateAt: date,
        content: req.body.content,
        settingAt: req.body.settingAt,
        userIdx: req.userIdx,
        caseIdx: req.body.caseIdx,
    }

    UserTodoService.insertUserTodoInCase(inputData).then((result) => {
        if (result.affectedRows === 0) {
            return res.send(ApiResponse(ErrorCode.CODE_403))
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if (result.affectedRows !== 0) {
            return res.send(ApiResponse(true, 'success'))
        }
    })
})

router.get('/v1/user/case/usertodo/date/:date', validateToken, (req, res)=>{

    let inputData = {
        userIdx: req.userIdx,
        updateAt: req.params.date,
    }

        UserTodoService.getUserCaseByUserIdx(inputData).then((result_userCase) => {
            if (result_userCase[0] == null) {
                return res.send(ApiResponse(ErrorCode.CODE_2201));
            } else if (result_userCase.code) {
                return res.send(ApiResponse(ErrorCode.CODE_500));
            } else if (result_userCase[0] != null) {
                UserTodoService.getTodoCaseByTodoDate(inputData).then((result_caseTodo) => {
                    if (result_caseTodo[0] == null) {
                        return res.send(ApiResponse(ErrorCode.CODE_2201));
                    } else if (result_caseTodo.code) {
                        return res.send(ApiResponse(ErrorCode.CODE_500));
                    } else if (result_caseTodo[0] != null) {

                        let data = []
                        let userTodoTmp = [];
                        for (let i = 0; i < result_userCase.length; i++) {
                            let userCase = {
                                title : result_userCase[i].title,
                                caseIdx : result_userCase[i].idx
                            };
                            for(let j=0; j < result_caseTodo.length; j++) {
                                if(result_userCase[i].idx === result_caseTodo[j].userCase_idx){
                                    let userTodo = {
                                        todoIdx : result_caseTodo[j].idx,
                                        title: result_caseTodo[j].title,
                                        updateAt : result_caseTodo[j].updateAt,
                                        settingAt: result_caseTodo[j].settingAt,
                                        favorite: result_caseTodo[j].favorite,
                                        isCheck: result_caseTodo[j].isCheck,
                                        content: result_caseTodo[j].content,
                                        caseIdx : result_caseTodo[j].userCase_idx
                                    }
                                    userTodoTmp.push(userTodo);
                                }
                            }
                            if(userTodoTmp.length !== 0){
                                data.push({
                                    userCase : userCase,
                                    userTodo : userTodoTmp
                                });
                                userTodoTmp = [];
                            }

                        }
                        return res.send(ApiResponse(true, "success", data));
                    }
                })
            }
        })
})


router.delete('/v1/user/case/usertodo/todoIdx/:todoIdx', validateToken, (req, res) =>{

    let inputData = {
        userIdx: req.userIdx,
        todoIdx: req.params.todoIdx
    }

    UserTodoService.deleteUserTodoByTodoIdx(inputData).then((result) => {
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

})


router.put('/v1/user/case/usertodo/:todoIdx/:content', validateToken, (req, res) =>{

    let date = new Date();
    // date = date.setHours(date.getHours()+9);

    console.log(date);
    let inputData = {
        userIdx: req.userIdx,
        todoIdx: req.params.todoIdx,
        content: req.params.content,
        updateAt : date
    }

    UserTodoService.updateUserTodoByTodoIdx(inputData).then((result) => {
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

})

module.exports = router;
