const cron = require('node-cron');

const crawler = require('../../common/crawler/Crawler');
const {pushTest} = require("../push/Push");
const BatchService = require("../service/BatchService");

//1시간 마다 크론 돕니다.
exports.webCrawlerBatch = cron.schedule('0 * * * *', async () => {

    let date = new Date();
    date.setHours(date.getHours()+9);
    console.log('node-cron 실행 테스트: ' + date.getHours());


    //
    // BatchService.selectUser(date.getHours()).then((result)=>{
    //
    // })


    pushTest();



    // TODO DB에서 사건번호 가져와야함

    // await crawler.sanoCrawler();


})


// //
// function exam() {
//
//     let TODO = [
//         {
//             userCase: {
//                 title: "더스 쿠프 상대사건",
//                 caseIdx : 8
//             }, todo: [
//                 {
//                     "idx": 8,
//                     "updateAt": "2021-08-23T06:00:49.000Z",
//                     "content": "Todo할 것을 여기적으십시오",
//                     "settingAt": "2021-08-29T15:00:00.000Z",
//                     "favorite" : "true",
//                     "isCheck" : "true",
//                     "user_idx": 4,
//                     "userCase_idx": 5
//                 },
//                 {
//                     "idx": 8,
//                     "updateAt": "2021-08-23T06:00:49.000Z",
//                     "content": "Todo할 것을 여기적으십시오",
//                     "settingAt": "2021-08-29T15:00:00.000Z",
//                     "favorite" : "false",
//                     "isCheck" : "false",
//                     "user_idx": 4,
//                     "userCase_idx": 5
//                 }
//             ],
//         },
//         {
//             userCase: {
//                 title: "한국일보 상대사건"
//             }, todo: [
//                 {
//                     "idx": 8,
//                     "updateAt": "2021-08-23T06:00:49.000Z",
//                     "content": "Todo할 것을 여기적으십시오",
//                     "settingAt": "2021-08-29T15:00:00.000Z",
//                     "favorite" : "true",
//                     "isCheck" : "true",
//                     "user_idx": 4,
//                     "userCase_idx": 5
//                 },
//             ]
//         }
//         ]}
//
//     let MEMO = [
//         {
//             case: {
//                 title: "더스 쿠프 상대사건",
//                 caseIdx : 9
//             }, memo: [
//                 {
//                     "idx": 8,
//                     "updateAt": "2021-08-23T06:00:49.000Z",
//                     "content": "Memo할 것을 여기적으십시오",
//                     "settingAt": "2021-08-29T15:00:00.000Z",
//                     "user_idx": 4,
//                     "userCase_idx": 5
//                 },
//                 {
//                     "idx": 8,
//                     "updateAt": "2021-08-23T06:00:49.000Z",
//                     "content": "Memo할 것을 여기적으십시오",
//                     "settingAt": "2021-08-29T15:00:00.000Z",
//                     "user_idx": 4,
//                     "userCase_idx": 5
//                 }
//             ],
//         },
//         {
//             case: {
//                 title: "한국일보 상대사건"
//             }, memo: [
//                 {
//                     "idx": 8,
//                     "updateAt": "2021-08-23T06:00:49.000Z",
//                     "content": "Memo할 것을 여기적으십시오",
//                     "settingAt": "2021-08-29T15:00:00.000Z",
//                     "user_idx": 4,
//                     "userCase_idx": 5
//                 },
//             ]
//         }
//     ]
//
// }
