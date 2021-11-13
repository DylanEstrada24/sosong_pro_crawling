const express = require('express');
const router = express.Router();

const {validateToken} = require("../../../config/security/JwtTokenProvider");
const {ApiResponse} = require('../../../common/model/ApiResponse');
const {ErrorCode} = require("../../../common/model/ErrorCode");
const Crawler = require('../../../common/crawler/Crawler');

const UserCaseService = require('../service/UserCaseService');
const {todoSubscribe} = require("../../../batch/scheduler/Scheduler");
const pool = require("../../../config/DbPool");
const {raw} = require("express");
const {getUserCaseByCaseIdx} = require("../service/UserCaseService");

// 사건불러오기 타이틀 기준
router.get('/v1/user/case/userIdx/title/ASC/:page', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        page: req.params.page ? req.params.page : 0
    }

    UserCaseService.getCaseByUserIdxByTitleASC(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else if (result[0] != null) {

            let data = [];
            let partyTmp = [];
            let representativeTmp = [];

            for (let i = 0; i < result[0].length; i++) {
                let userCase = {
                    caseIdx: result[0][i].caseIdx,
                    title: result[0][i].title,
                    court: result[0][i].court,
                    caseNumber: result[0][i].caseNumber,
                }
                for (let j = 0; j < result[1].length; j++) {
                    if (result[1][j].caseNumber === result[0][i].caseNumber) {
                        let party = {
                            Classification: result[1][j].classification,
                            name: result[1][j].name
                        }
                        partyTmp.push(party);
                    }
                }

                for (let k = 0; k < result[2].length; k++) {
                    if (result[2][k].caseNumber === result[0][i].caseNumber) {
                        let representative = {
                            Classification: result[2][k].classification,
                            name: result[2][k].name
                        }
                        representativeTmp.push(representative);
                    }
                }
                data.push({
                    userCase: userCase,
                    party: partyTmp,
                    representative: representativeTmp
                })

                partyTmp = [];
                representativeTmp = [];
            }
            return res.send(data);
        }
    });
});

// 사건 불러오기 타이틀 기준
router.get('/v1/user/case/userIdx/title/DESC/:page', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        page: req.params.page ? req.params.page : 0
    }

    UserCaseService.getCaseByUserIdxByTitleDESC(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else if (result[0] != null) {

            let data = [];
            let partyTmp = [];
            let representativeTmp = [];

            for (let i = 0; i < result[0].length; i++) {
                let userCase = {
                    caseIdx: result[0][i].caseIdx,
                    title: result[0][i].title,
                    court: result[0][i].court,
                    caseNumber: result[0][i].caseNumber,
                }
                for (let j = 0; j < result[1].length; j++) {
                    if (result[1][j].caseNumber === result[0][i].caseNumber) {
                        let party = {
                            Classification: result[1][j].classification,
                            name: result[1][j].name
                        }
                        partyTmp.push(party);
                    }
                }

                for (let k = 0; k < result[2].length; k++) {
                    if (result[2][k].caseNumber === result[0][i].caseNumber) {
                        let representative = {
                            Classification: result[2][k].classification,
                            name: result[2][k].name
                        }
                        representativeTmp.push(representative);
                    }
                }
                data.push({
                    userCase: userCase,
                    party: partyTmp,
                    representative: representativeTmp
                })

                partyTmp = [];
                representativeTmp = [];
            }
            return res.send(data);
        }
    });
});

// 사건 불러오기 Todo날짜 기준
router.get('/v1/user/case/userIdx/todo/DESC/:page', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        page: req.params.page ? req.params.page : 0
    }

    UserCaseService.getCaseByUserIdxByTodoDESC(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else if (result[0] != null) {

            let data = [];
            let partyTmp = [];
            let representativeTmp = [];

            for (let i = 0; i < result[0].length; i++) {
                let userCase = {
                    caseIdx: result[0][i].caseIdx,
                    title: result[0][i].title,
                    court: result[0][i].court,
                    caseNumber: result[0][i].caseNumber,
                }
                for (let j = 0; j < result[1].length; j++) {
                    if (result[1][j].caseNumber === result[0][i].caseNumber) {
                        let party = {
                            Classification: result[1][j].classification,
                            name: result[1][j].name
                        }
                        partyTmp.push(party);
                    }
                }

                for (let k = 0; k < result[2].length; k++) {
                    if (result[2][k].caseNumber === result[0][i].caseNumber) {
                        let representative = {
                            Classification: result[2][k].classification,
                            name: result[2][k].name
                        }
                        representativeTmp.push(representative);
                    }
                }
                data.push({
                    userCase: userCase,
                    party: partyTmp,
                    representative: representativeTmp
                })

                partyTmp = [];
                representativeTmp = [];
            }
            return res.send(data);
        }
    });
});


router.get('/v1/user/case/userIdx/userCaseIdx/ASC/:page', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        page: req.params.page ? req.params.page : 0
    }

    UserCaseService.getCaseByUserIdxByUserCaseIdxASC(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else if (result[0] != null) {

            let data = [];
            let partyTmp = [];
            let representativeTmp = [];

            for (let i = 0; i < result[0].length; i++) {
                let userCase = {
                    caseIdx: result[0][i].caseIdx,
                    title: result[0][i].title,
                    court: result[0][i].court,
                    caseNumber: result[0][i].caseNumber,
                }
                for (let j = 0; j < result[1].length; j++) {
                    if (result[1][j].caseNumber === result[0][i].caseNumber) {
                        let party = {
                            Classification: result[1][j].classification,
                            name: result[1][j].name
                        }
                        partyTmp.push(party);
                    }
                }

                for (let k = 0; k < result[2].length; k++) {
                    if (result[2][k].caseNumber === result[0][i].caseNumber) {
                        let representative = {
                            Classification: result[2][k].classification,
                            name: result[2][k].name
                        }
                        representativeTmp.push(representative);
                    }
                }
                data.push({
                    userCase: userCase,
                    party: partyTmp,
                    representative: representativeTmp
                })

                partyTmp = [];
                representativeTmp = [];
            }
            return res.send(data);
        }
    });
});

// 사건불러오기 case idx
router.get('/v1/user/case/all', validateToken, (req, res) => {

    UserCaseService.getUserCase_new(req.userIdx).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101))
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if (result[0] != null) {
            return res.send(result);
        }
    });
})

// 사건불러오기 case idx
router.get('/v1/user/case/caseIdx/:caseIdx', validateToken, (req, res) => {

    UserCaseService.getUserCaseByCaseIdx_new(req.params.caseIdx).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101))
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500))
        } else if (result[0] != null) {
            return res.send(result);
        }
    });
})


// 사건 입력 (대법원 사건검색 크롤링)
router.post('/v1/user/case', validateToken, async (req, res) => {

    let inputData = {
        title: "",
        court: req.body.court,
        caseNumber: req.body.caseNumber,
        name: req.body.name,
        userIdx: req.userIdx,
    }


	console.log('zzit',inputData)
    UserCaseService.getCourtCaseByCaseNumber(inputData).then(async (result) => {
        if (result[0] == null) {
            let courtData = await Crawler.sanoCrawler(inputData.court, inputData.caseNumber, inputData.name);
            if (courtData == "1") {
                return res.send(ApiResponse(ErrorCode.CODE_2103));
            } else if (courtData == "2") {
                return res.send(ApiResponse(ErrorCode.CODE_2105));
            } else if (courtData == "100") {
                return res.send(ApiResponse(false, "해당케이스는 반영할 수 없습니다.(1)"));
            } else if (courtData) {
                inputData.content = courtData.courtCase.content;
                inputData.title = (req.body.title == null) ? courtData.courtCase.caseName : req.body.title;
                UserCaseService.insertCourtCase_new(inputData, courtData).then(async (result) => {
                    UserCaseService.getCaseProgressByCaseNumberLast(inputData.caseNumber).then(async (result) => {
                        if (result[0] == null) {

                        } else if (result[0] != null) {

                            UserCaseService.getUserName(inputData.userIdx).then(async (result_name)=>{
                                if(result_name[0] != null){
                                    let progressData = {};

                                    progressData.userName = result_name[0].name;
                                    progressData.userIdx = inputData.userIdx;
                                    progressData.date = result[0].date;
                                    progressData.content = result[0].content;
                                    progressData.result = result[0].result;
                                    progressData.disclosure = result[0].disclosure;
                                    progressData.type = result[0].type;
                                    progressData.caseNumber = inputData.caseNumber;
                                    progressData.court = inputData.court;

                                    try {
                                        await todoSubscribe(progressData, inputData.userIdx);
                                    } catch (e) {

                                    }
                                }
                            })
                        }
                    })

                    if (result.affectedRows === 0) {
                        return res.send(ApiResponse(ErrorCode.CODE_403));
                    } else if (result.code) {
                        return res.send(ApiResponse(ErrorCode.CODE_500));
                    } else if (result.affectedRows !== 0) {
                        if (result.toString().includes("TypeError")) {
                            return res.send(ApiResponse(ErrorCode.CODE_500));
                        } else {
                            return res.send(ApiResponse(true, "success"));
                        }
                    }
                })
            } else if (!courtData) {
                return res.send(ApiResponse(ErrorCode.CODE_2104));
            }
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {

            await UserCaseService.getCaseByUserIdxAndCaseNumber(inputData).then(async (result_UserCase) => {
                if (result_UserCase[0].length === 0) {
                    await UserCaseService.getCourtCaseByCaseNumber(inputData).then(async (result) => {
                        if (result[0] != null) {
                            inputData.title = result[0].caseName;
                        }
                    })

                    await UserCaseService.insertUserCase(inputData).then((result2) => {
                        if (result2.affectedRows === 0) {
                            return res.send(ApiResponse(ErrorCode.CODE_403));
                        } else if (result2.code) {
                            return res.send(ApiResponse(ErrorCode.CODE_500));
                        } else if (result2.affectedRows !== 0) {

                            UserCaseService.getCaseProgressByCaseNumberLast(inputData.caseNumber).then(async (result) => {
                                if (result[0] == null) {

                                } else if (result[0] != null) {
                                    console.log(";;qq");

                                    UserCaseService.getUserName(inputData.userIdx).then(async (result_name)=>{
                                        if(result_name[0] != null){
                                            let progressData = {};

                                            progressData.userName = result_name[0].name;
                                            progressData.userIdx = inputData.userIdx;
                                            progressData.date = result[0].date;
                                            progressData.content = result[0].content;
                                            progressData.result = result[0].result;
                                            progressData.disclosure = result[0].disclosure;
                                            progressData.type = result[0].type;
                                            progressData.caseNumber = inputData.caseNumber;
                                            progressData.court = inputData.court;

                                            //console.log(progressData);
                                            try {
                                                await todoSubscribe(progressData, inputData.userIdx);
                                            } catch (e) {

                                            }
                                        }
                                    })
                                }
                            })

                            return res.send(ApiResponse(true, "success"));
                        }
                    });
                } else if (result_UserCase.code) {
                    return res.send(ApiResponse(ErrorCode.CODE_500))
                } else if (result_UserCase[0] != null) {
                    return res.send(ApiResponse(ErrorCode.CODE_2102))
                }
            })
        }
    })
    // return res.send(ApiResponse(false,"테스트 중"))
})


// 사건 디테일 가져오기
router.get('/v1/user/case/progress/caseNumber/:caseNumber', validateToken, (req, res) => {

    let inputData = {
        caseNumber: req.params.caseNumber,
    }
    UserCaseService.getCourtCaseByCaseNumber(inputData).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(false, "해당 사건이 없습니다"));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            UserCaseService.getCaseProgressByCaseNumber(req.params.caseNumber).then((result) => {
                if (result[0] == null) {
                    return res.send(ApiResponse(false, "진행사항이 없습니다."));
                } else if (result.code) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                } else if (result[0] != null) {
                    return res.send(result);
                }
            })
        }
    })


});

// 사건 디테일 가져오기 (사용자의 user case 중 progress 의 업데이트가 true 인것만)
router.get('/v1/user/case/progress/isUpdate', validateToken, (req, res) => {

    UserCaseService.getCaseProgressByCaseNumberByIsUpdateTrue(req.userIdx).then((result) => {

        if (result[0] == null) {
            return res.send(ApiResponse(false, "업데이트 된 것이 없습니다."));
        } else if (result.code) {

            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            return res.send(result);
        }
    })
});

// 사건수정
router.put('/v1/user/case/title/:title/:caseIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        title: req.params.title,
        caseIdx: req.params.caseIdx
    }

    UserCaseService.updateUserCaseTitle(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result.affectedRows != 0) {
            return res.send(ApiResponse(true, "success"));
        } else if (result.affectedRows == 0) {
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    })
});

// progress
router.get('/v1/user/case/progress/date/:date', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        date: req.params.date,
    }

    UserCaseService.getCaseProgressByDate(inputData).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            return res.send(result);
        }
    })
});

// progress 사건별 타입별 불러오기
router.get('/v1/user/case/progress/content', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,

    }

    UserCaseService.getCaseProgressByType(inputData).then((result) => {
        console.log(result[0]);
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            console.log(result);
            return res.send(result);
        }
    })
});

// 사건 삭제
router.delete('/v1/user/case/caseIdx/:caseIdx', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        caseIdx: req.params.caseIdx
    }


    UserCaseService.deleteUserCaseByCaseIdx(inputData).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result.affectedRows != 0) {
            return res.send(ApiResponse(true, "success"));
        } else if (result.affectedRows == 0) {
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    })

})

// 전자소송 크롤링
router.post('/v1/user/case/test', validateToken, async (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        id: req.body.id,
        pw: req.body.pw
    }

    let courtData = await Crawler.crawlTest(inputData.id, inputData.pw);
    if (courtData != null) {
        if (courtData === 1) {
            return res.send(ApiResponse(ErrorCode.CODE_2106));
        } else if (courtData === 100) {
            return res.send(ApiResponse(ErrorCode.CODE_1124));
        }
        try {
            console.log("CourtData length : " + courtData.length);
            for (let i = 0; i < courtData.length; i++) {

                if (courtData[i].idx) {
                    inputData.caseNumber = await courtData[i].caseNumber
                    await UserCaseService.getUserCaseByCaseNumber(inputData).then(async (result) => {
                        if (result[0] == null) {
                            await UserCaseService.getCourtCaseByCaseNumber(inputData).then(async (result) => {
                                if (result[0] != null) {
                                    inputData.court = await result[0].court;
                                }
                            })
                            await UserCaseService.insertUserCase(inputData).then(async (result2) => {
                                if (result2.affectedRows === 0) {
                                } else if (result2.code) {
                                } else if (result2.affectedRows !== 0) {

                                    await UserCaseService.getCaseProgressByCaseNumberLast(inputData.caseNumber).then(async (result) => {
                                        console.log(await result[0]);
                                        if (result[0] == null) {

                                        } else if (result[0] != null) {

                                            UserCaseService.getUserName(inputData.userIdx).then(async (result_name)=>{
                                                if(result_name[0] != null){
                                                    let progressData = {};

                                                    progressData.userName = await result_name[0].name;
                                                    progressData.court = await inputData.court;
                                                    progressData.date = await result[0].date;
                                                    progressData.content = await result[0].content;
                                                    progressData.result = await result[0].result;
                                                    progressData.disclosure = await result[0].disclosure;
                                                    progressData.type = await result[0].type;
                                                    progressData.caseNumber = await inputData.caseNumber;

                                                    //console.log(progressData);
                                                    try {
                                                        await todoSubscribe(progressData, inputData.userIdx);
                                                    } catch (e) {

                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                            });
                        }
                    })
                } else {
                    inputData.title = await courtData[i].courtCase.caseName;
                    inputData.court = await courtData[i].courtCase.court;
                    inputData.caseNumber = await courtData[i].courtCase.caseNumber;
                    inputData.name = await courtData[i].courtCase.name;
                    inputData.content = courtData[i].courtCase.content;

                    await UserCaseService.getUserCaseByCaseNumber(inputData).then(async (result) => {
                        if (result[0] == null) {
                            await UserCaseService.insertCourtCase_new(inputData, courtData[i]).then(async (result) => {
                                if (result.affectedRows === 0) {
                                    throw "error";
                                } else if (result.code) {
                                    throw result.code;
                                }

                                await UserCaseService.getCaseProgressByCaseNumberLast(inputData.caseNumber).then(async (result) => {
                                    // console.log(await result[0]);
                                    if (result[0] == null) {

                                    } else if (result[0] != null) {
                                        UserCaseService.getUserName(inputData.userIdx).then(async (result_name)=>{
                                            if(result_name[0] != null){
                                                let progressData = {};

                                                progressData.userName = await result_name[0].name;
                                                progressData.court = await inputData.court;
                                                progressData.date = await result[0].date;
                                                progressData.content = await result[0].content;
                                                progressData.result = await result[0].result;
                                                progressData.disclosure = await result[0].disclosure;
                                                progressData.type = await result[0].type;
                                                progressData.caseNumber = await inputData.caseNumber;

                                                //console.log(progressData);
                                                try {
                                                    await todoSubscribe(progressData, inputData.userIdx);
                                                } catch (e) {

                                                }
                                            }
                                        })
                                    }
                                })


                            })
                        }
                    })
                }
            }
            return res.send(ApiResponse(true, "success"));
        } catch (e) {
            console.log(e);
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }

    } else {
        return res.send(ApiResponse(ErrorCode.CODE_500));
    }
})

// 사건 즐겨찾기 등록해제
router.put('/v1/user/case/favorite/:caseIdx', validateToken, (req, res) => {

    UserCaseService.getUserCaseByCaseIdx(req.params.caseIdx).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else if (result[0] != null) {

            if (result[0].favorite === "true") {
                UserCaseService.toggleUserCaseFavorite(result[0].caseIdx, false).then((result) => {
                })
            } else if (result[0].favorite === "false") {
                UserCaseService.toggleUserCaseFavorite(result[0].caseIdx, true).then((result) => {
                })
            }

            return res.send(ApiResponse(true, "success"));
        }
    })
})

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {
    }
}

module.exports = router;
