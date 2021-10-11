const cron = require('node-cron');

const crawler = require('../../common/crawler/Crawler');
const {pushTest} = require("../push/Push");
const BatchService = require("../service/BatchService");
const {crawlProgress} = require("../../common/crawler/Crawler");

// progress crawling//1시간 마다 크론 돕니다.
exports.webCrawlerBatch = cron.schedule('0 0 * * * *', async () => {

    console.log("progress batch");

    let resultData;

    // await BatchService.selectCourtCase().then(async (result) => {
    //     if (result != null) {
    //         for (let i = 0; i < result.length; i++) {
    //             try {
    //                 await BatchService.selectCourtCaseProgress(result[i].caseNumber).then(async (result_2) => {
    //
    //                     resultData = await crawlProgress(result[i].court, result[i].caseNumber, result[i].name);
    //
    //                     // await console.log("result_2.length : " + result_2.length);
    //                     // await console.log("resultData.progress.content.length : " + resultData.progress.content.length)
    //                     if (result_2.length !== 0) {
    //                         let count = resultData.progress.content.length - result_2.length;
    //                         if (count !== 0) {
    //
    //                             let progressData = {
    //                                 date: [],
    //                                 content: [],
    //                                 result: [],
    //                                 disclosure: [],
    //                                 type: [],
    //                             }
    //
    //                             for (let k = 0; k < count; k++) {
    //                                 progressData.date.push(resultData.progress.date[result_2.length + k]);
    //                                 progressData.content.push(resultData.progress.content[result_2.length + k]);
    //                                 progressData.result.push(resultData.progress.result[result_2.length + k]);
    //                                 progressData.disclosure.push(resultData.progress.disclosure[result_2.length + k]);
    //                                 progressData.type.push(resultData.progress.type[result_2.length + k]);
    //
    //                                 // await console.log(resultData.progress.date[result_2.length + i] + " " + resultData.progress.content[result_2.length + i]
    //                                 //     + " " + resultData.progress.result[result_2.length + i] + " " + resultData.progress.disclosure[result_2.length + i]);
    //                             }
    //                             try {
    //                                 await BatchService.insertPogress(progressData, result[i].caseNumber).then(async (result) => {
    //                                 });
    //                             } catch (e) {
    //                                 console.log(e);
    //                             }
    //                         }
    //                     }
    //                 })
    //
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         }
    //     }
    // })

    // TODO DB에서 사건번호 가져와야함

    // await crawler.sanoCrawler();
})

function delay(sec) {
    return new Promise((() => {
        setTimeout(() => {
        }, sec);
    }))
}

// push  //1시간 마다 크론 돕니다.
exports.pushBatch = cron.schedule('0 0 * * * *', async () => {

    console.log("push batch");

    // let date = new Date();
    //
    // try {
    //     await BatchService.selectUser(date.getHours()).then(async (result) => {
    //
    //         for (let i = 0; i < result.length; i++) {
    //
    //             await BatchService.getUserCaseNumberByUserIdx(result[i].idx).then(async (result_2) => {
    //                 console.log(result_2);
    //                 if (result_2[i]) {
    //                     pushTest(result[i].fbToken, result_2[i].count);
    //                 }
    //             })
    //         }
    //     })
    // } catch (e){
    //     console.log(e);
    // }

})
