const express = require('express');
const router = express.Router();


const {validateToken} = require("../../../config/security/JwtTokenProvider");
const {ApiResponse} = require('../../../common/model/ApiResponse');
const {ErrorCode} = require("../../../common/model/ErrorCode");
const Crawler = require('../../../common/crawler/Crawler');

const UserCaseService = require('../service/UserCaseService');



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

// sanoCrawler
router.post('/v1/user/case', validateToken, async (req, res) => {

    console.log("1234");
    let inputData = {
        title: req.body.title,
        court: req.body.court,
        caseNumber: req.body.caseNumber,
        name: req.body.name,
        userIdx: req.userIdx,
    }

    UserCaseService.getCourtCaseByCaseNumber(inputData).then(async (result) => {
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

            await UserCaseService.getCaseByUserIdx(inputData.userIdx).then((result_UserCase) => {
                if (result_UserCase[0] == null) {
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



module.exports = router;
