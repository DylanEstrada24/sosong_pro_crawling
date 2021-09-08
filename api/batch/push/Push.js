const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
require('dotenv').config();

const {validateToken} = require("../../config/security/JwtTokenProvider");
const jwt = require("../../config/security/JwtTokenProvider");

const {ApiResponse} = require('../../common/model/ApiResponse');
const {ErrorCode} = require("../../common/model/ErrorCode");
// [ FCM ]
const fcm = require("firebase-admin")

const serAccount = require('../../../oauthFile/fcm/sosongpro_nodejs_fcm')

fcm.initializeApp({
    credential: fcm.credential.cert(serAccount),
})

exports.pushTest = () => {
    console.log('push 실행');

    let deviceToken = "feHpL_y_RmKRxnNfeJE2rV:APA91bF2acwLCF3bAwXpddvbnh2P_f4wIo-vI0_3l91Uw_iVcDQR1OfPdnj3zlAxKkc9HFnkDs1HKYMTxLfVsodCFWpLBEBKBoosK9I6xcby8D6cKfBy7NEp0JyU0YKVkT-RrrlMLTWL";

    let date = new Date();
    date.setHours(date.getHours()+9);

    let message = {
        notification:{
            title:'소송프로 푸시 테스트',
            body: '현재시각 : ' + date,
        },
        token:deviceToken,
    }
    // [단일 푸쉬]
    fcm.messaging().send(message)
        .then(function (response){
            console.log('Successfully sent message::', response)
        })
        .catch(function (err){
            console.log("Error Sending message!!! : ", err)
        })
}

// router.get('/v1/push', (req, res) => {
//
//     // let deviceToken = [
//     //     "cULvtooqTuO1Uel27C5-eG:APA91bFpWJW6gyHoxewTLyW1U58lkJT3zeFy_mTWlonzq4qwpkuTTD9RwqCe2RWd09ZuzijqEFyEVmU3hNs9GoiEfei_3-tx1JOpjmzbUXx1Zvx3-f2QRQATC251IglwttOOwGhdol-N",
//     //     "fKYYUctwTkCV8dsvMH93lw:APA91bEJg_4PQZywR2i719mJKftv2BJLEHojxHIiR1tyWt-ytC_a8piHZMT1U2tA8U_vBhH6y1xSRQw77K9z_wlJoQerXIbHBpmLGgzaSYZMyXTB9R2D1FH-TD-b64AEF2yJ64CcK88g",
//     // ]
//
//     //let deviceToken = "fKYYUctwTkCV8dsvMH93lw:APA91bEJg_4PQZywR2i719mJKftv2BJLEHojxHIiR1tyWt-ytC_a8piHZMT1U2tA8U_vBhH6y1xSRQw77K9z_wlJoQerXIbHBpmLGgzaSYZMyXTB9R2D1FH-TD-b64AEF2yJ64CcK88g"
//
//     let deviceToken = "feHpL_y_RmKRxnNfeJE2rV:APA91bF2acwLCF3bAwXpddvbnh2P_f4wIo-vI0_3l91Uw_iVcDQR1OfPdnj3zlAxKkc9HFnkDs1HKYMTxLfVsodCFWpLBEBKBoosK9I6xcby8D6cKfBy7NEp0JyU0YKVkT-RrrlMLTWL";
//     let message = {
//         notification:{
//             title:'테스트 발송',
//             body:'테스트 푸쉬 알람!',
//         },
//         token:deviceToken,
//     }
//     // [단일 푸쉬]
//     fcm.messaging().send(message)
//         .then(function (response){
//             console.log('Successfully sent message::', response)
//             return res.status(200).json({success: true})
//         })
//         .catch(function (err){
//             console.log("Error Sending message!!! : ", err)
//             return res.status(400).json({success: false})
//     })
//
//     // // [멀티 캐스트]
//     // fcm.messaging().sendMulticast(message)
//     //     .then((response) => {
//     //         if (response.failureCount > 0) {
//     //             const failedTokens = [];
//     //             response.responses.forEach((resp, idx) => {
//     //                 if (!resp.success) {
//     //                     failedTokens.push(deviceToken[idx]);
//     //                 }
//     //             });
//     //             console.log('List of tokens that caused failures: ' + failedTokens);
//     //         }
//     //         return res.status(200).json({success: true})
//     //     });
// });
//
// module.exports = router;
