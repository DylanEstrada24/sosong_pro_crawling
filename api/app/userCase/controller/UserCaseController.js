const express = require('express');
const router = express.Router();

const {validateToken} = require("../../../config/security/JwtTokenProvider");
const {ApiResponse} = require('../../../common/model/ApiResponse');
const {ErrorCode} = require("../../../common/model/ErrorCode");
const Crawler = require('../../../common/crawler/Crawler');

const UserCaseService = require('../service/UserCaseService');

// 사건불러오기 접수일 기준
router.get('/v1/user/case/userIdx/ASC/:page', validateToken, (req, res) => {

    let inputData = {
        userIdx : req.userIdx,
        page : req.params.page ? req.params.page : 0
    }

    UserCaseService.getCaseByUserIdxASC(inputData).then((result) => {
        console.log(result);
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
                    favorite: result[0][i].favorite,
                    court: result[0][i].court,
                    caseNumber: result[0][i].caseNumber,
                    caseName: result[0][i].caseName,
                    judiciary: result[0][i].judiciary,
                    receiptAt: result[0][i].receiptAt,
                    mergeClassification: result[0][i].mergeClassification,
                    fee: result[0][i].fee,
                    finalResult: result[0][i].finalResult
                }
                    for(let j=0; j < result[1].length; j++){
                        if(result[1][j].caseNumber === result[0][i].caseNumber){
                            let party = {
                                Classification: result[1][j].classification,
                                name: result[1][j].name
                            }
                            partyTmp.push(party);
                        }
                    }

                    for(let k=0; k < result[2].length; k++){
                        if(result[2][k].caseNumber === result[0][i].caseNumber){
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

// 사건 불러오기 접수일 기준
router.get('/v1/user/case/userIdx/DESC/:page', validateToken, (req, res) => {

    let inputData = {
        userIdx : req.userIdx,
        page : req.params.page ? req.params.page : 0
    }

    UserCaseService.getCaseByUserIdxDESC(inputData).then((result) => {
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
                    caseName: result[0][i].caseName,
                    judiciary: result[0][i].judiciary,
                    receiptAt: result[0][i].receiptAt,
                    mergeClassification: result[0][i].mergeClassification,
                    fee: result[0][i].fee,
                    finalResult: result[0][i].finalResult
                }
                for(let j=0; j < result[1].length; j++){
                    if(result[1][j].caseNumber === result[0][i].caseNumber){
                        let party = {
                            Classification: result[1][j].classification,
                            name: result[1][j].name
                        }
                        partyTmp.push(party);
                    }
                }

                for(let k=0; k < result[2].length; k++){
                    if(result[2][k].caseNumber === result[0][i].caseNumber){
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

// 사건불러오기 타이틀 기준
router.get('/v1/user/case/userIdx/title/ASC/:page', validateToken, (req, res) => {

    let inputData = {
        userIdx : req.userIdx,
        page : req.params.page ? req.params.page : 0
    }

    UserCaseService.getCaseByUserIdxByTitleASC(inputData).then((result) => {
        console.log(result);
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
                    favorite: result[0][i].favorite,
                    court: result[0][i].court,
                    caseNumber: result[0][i].caseNumber,
                    caseName: result[0][i].caseName,
                    judiciary: result[0][i].judiciary,
                    receiptAt: result[0][i].receiptAt,
                    mergeClassification: result[0][i].mergeClassification,
                    fee: result[0][i].fee,
                    finalResult: result[0][i].finalResult
                }
                for(let j=0; j < result[1].length; j++){
                    if(result[1][j].caseNumber === result[0][i].caseNumber){
                        let party = {
                            Classification: result[1][j].classification,
                            name: result[1][j].name
                        }
                        partyTmp.push(party);
                    }
                }

                for(let k=0; k < result[2].length; k++){
                    if(result[2][k].caseNumber === result[0][i].caseNumber){
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
        userIdx : req.userIdx,
        page : req.params.page ? req.params.page : 0
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
                    caseName: result[0][i].caseName,
                    judiciary: result[0][i].judiciary,
                    receiptAt: result[0][i].receiptAt,
                    mergeClassification: result[0][i].mergeClassification,
                    fee: result[0][i].fee,
                    finalResult: result[0][i].finalResult
                }
                for(let j=0; j < result[1].length; j++){
                    if(result[1][j].caseNumber === result[0][i].caseNumber){
                        let party = {
                            Classification: result[1][j].classification,
                            name: result[1][j].name
                        }
                        partyTmp.push(party);
                    }
                }

                for(let k=0; k < result[2].length; k++){
                    if(result[2][k].caseNumber === result[0][i].caseNumber){
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
        userIdx : req.userIdx,
        page : req.params.page ? req.params.page : 0
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
                    caseName: result[0][i].caseName,
                    judiciary: result[0][i].judiciary,
                    receiptAt: result[0][i].receiptAt,
                    mergeClassification: result[0][i].mergeClassification,
                    fee: result[0][i].fee,
                    finalResult: result[0][i].finalResult
                }
                for(let j=0; j < result[1].length; j++){
                    if(result[1][j].caseNumber === result[0][i].caseNumber){
                        let party = {
                            Classification: result[1][j].classification,
                            name: result[1][j].name
                        }
                        partyTmp.push(party);
                    }
                }

                for(let k=0; k < result[2].length; k++){
                    if(result[2][k].caseNumber === result[0][i].caseNumber){
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

// 사건 즐겨찾기 등록해제
router.put('/v1/user/case/favorite/:caseIdx', validateToken, (req, res) => {

    UserCaseService.getUserCaseByCaseIdx(req.params.caseIdx).then((result) => {
        if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_2101));
        } else if (result[0] != null) {

            if(result[0].favorite === "true"){
                UserCaseService.toggleUserCaseFavorite(result[0].caseIdx, false).then((result) => {})
            }else if(result[0].favorite === "false"){
                UserCaseService.toggleUserCaseFavorite(result[0].caseIdx, true).then((result) => {})
            }

            return res.send(ApiResponse(true, "success"));
        }
    })
})

// 사건불러오기 case idx
router.get('/v1/user/case/caseIdx/:caseIdx', validateToken, (req, res) => {

    UserCaseService.getUserCaseByCaseIdx(req.params.caseIdx).then((result) => {
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
        title: req.body.title,
        court: req.body.court,
        caseNumber: req.body.caseNumber,
        name: req.body.name,
        userIdx: req.userIdx,
    }

    UserCaseService.getCourtCaseByCaseNumber(inputData).then(async (result) => {
        console.log(result);
         if (result[0] == null) {
            let courtData = await Crawler.sanoCrawler(inputData.court, inputData.caseNumber, inputData.name);
            console.log(courtData);
            if (courtData) {
                try {
                    await UserCaseService.insertCourtCase(courtData.courtCase, inputData.caseNumber).then((result) => {});
                    await UserCaseService.insertParty(courtData.party, inputData.caseNumber).then((result) => {});
                    await UserCaseService.insertRepresentative(courtData.representative, inputData.caseNumber).then((result) => {});

                    await UserCaseService.insertCaseProgress(courtData.progress, inputData.caseNumber).then((result) => {});
                    await UserCaseService.insertUserCase(inputData).then((result) => {});

                    return res.send(ApiResponse(true, "success"));
                } catch (e) {
                    return res.send(ApiResponse(ErrorCode.CODE_500));
                }
            } else if (!courtData) {
                return res.send(ApiResponse(ErrorCode.CODE_403));
            }
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {

            await UserCaseService.getCaseByUserIdxAndCaseNumber(inputData).then((result_UserCase) => {
                console.log(result_UserCase[0]);
                if (result_UserCase[0].length === 0) {
                    UserCaseService.insertUserCase(inputData).then((result2) => {
                        if (result2.affectedRows === 0) {
                            return res.send(ApiResponse(ErrorCode.CODE_403));
                        } else if (result2.code) {
                            return res.send(ApiResponse(ErrorCode.CODE_500));
                        } else if (result2.affectedRows !== 0) {
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
router.get('/v1/user/case/progress/:caseNumber', validateToken, (req, res) => {

    UserCaseService.getCaseProgressByCaseNumber(req.params.caseNumber).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            return res.send(result);
        }
    })
});

// 사건수정
router.put('/v1/user/case/title/:title/:caseIdx', validateToken, (req, res)=>{

    let inputData = {
        userIdx: req.userIdx,
        title: req.params.title,
        caseIdx: req.params.caseIdx
    }

    UserCaseService.updateUserCaseTitle(inputData).then((result)=>{
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
router.get('/v1/user/case/progress/type/:type', validateToken, (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        type: req.params.type,
    }

    UserCaseService.getCaseProgressByType(inputData).then((result) => {
        if (result[0] == null) {
            return res.send(ApiResponse(ErrorCode.CODE_403));
        } else if (result.code) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        } else if (result[0] != null) {
            return res.send(result);
        }
    })
});

// 사건 삭제
router.delete('/v1/user/case/caseIdx/:caseIdx', validateToken, (req, res) =>{

    let inputData = {
        userIdx: req.userIdx,
        caseIdx: req.params.caseIdx
    }

    console.log(inputData);

    UserCaseService.deleteUserCaseByCaseIdx(inputData).then((result) => {
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

// 전자소송 크롤링
router.post('/v1/user/case/test', validateToken, async (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        id: req.body.id,
        pw: req.body.pw
    }

    let courtData = await Crawler.crawlTest(inputData.id, inputData.pw);
    if (courtData !== false) {
        try {
            // let courtData = await Crawler.crawlTest("khleelawyer1", "sosongpro1!");
            for (let i = 0; i < courtData.length; i++) {
                inputData.title = courtData[i].courtCase.title;
                inputData.caseNumber = courtData[i].courtCase.caseNumber;

                await UserCaseService.insertCourtCase(courtData[i].courtCase, inputData.caseNumber).then((result) => {});
                await UserCaseService.insertParty(courtData[i].party, inputData.caseNumber).then((result) => {});
                await UserCaseService.insertRepresentative(courtData[i].representative, inputData.caseNumber).then((result)=> {});
                await UserCaseService.insertCaseProgress(courtData[i].progress, inputData.caseNumber).then((result) => {});
                await UserCaseService.insertUserCase(inputData).then((result) => {});
            }
            await console.log(courtData);
            return res.send("success");
        } catch (e) {
            return res.send(ApiResponse(ErrorCode.CODE_500));
        }
    } else {
        return res.send(ApiResponse(ErrorCode.CODE_500));

    }
})

// 전자소송 크롤링
router.get('/v1/user/case/test/test', async (req, res) => {

    let inputData = {
        userIdx: req.userIdx,
        id: req.body.id,
        pw: req.body.pw
    }

    let courtData = await Crawler.testCr(inputData.id, inputData.pw);
    res.send(courtData);

})

module.exports = router;
