const express = require('express');
const router = express.Router()
const path = require('path');
require('dotenv').config();
// const {adminValidation} = require("../../../config/security/JwtTokenProvider")
const {ErrorCode} = require("../../../common/model/ErrorCode");
const {ApiResponse} = require("../../../common/model/ApiResponse");

// const AdminExcelService = require('../../../service/admin/common/AdminExcelService');
const multer = require("multer");
const parse = require("csv-parse/lib/sync")
const fs = require('fs');

const iconv = require('iconv-lite')
const {Builder} = require("selenium-webdriver");
const {By} = require("selenium-webdriver");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {  // 파일이 업로드될 경로 설정
        cb(null, 'excel/')
    },
    filename: (req, file, cb) => {	// timestamp를 이용해 새로운 파일명 설정
        let newFileName = new Date().getTime() + "_" + file.originalname;
        cb(null, newFileName)
    },
})
let upload = multer({ storage: storage});

router.post('/v1/file/excel/upload', upload.single('excelFile'), async (req, res) =>{

    console.log(req.file.filename);

    const fileName = req.file.filename;
    const excelFile = fs.readFileSync("./excel/"+fileName);
    const utf8 = iconv.decode(excelFile, 'euc-kr');

    // console.log(utf8);

    // 2부터 시작 가로 9

    const trSplit = utf8.split('<tr>');

    const td = trSplit[1].split('">');

    let check = ["", "번호", "법원", "사건번호", "재판부", "접수일자", "원고", "피고", "기일시간", "기일장소"]

    for(let i = 1 ; i<td.length; i++){
        if(check[i] !== td[i].substring(0, td[i].indexOf('</'))){
            return res.send(ApiResponse(ErrorCode.CODE_403));
        }
    }

    let arry = [];
    let arry2 = [];

    for (let j = 2 ; j<trSplit.length;j++){
        let tdSplit = trSplit[j].split('">');
        for(let i = 0 ; i<tdSplit.length; i++){
            // console.log(tdSplit[i].substring(0, tdSplit[i].indexOf('</')));
            arry2.push(tdSplit[i].substring(0, tdSplit[i].indexOf('</')));
        }
        arry.push(arry2);
        arry2 = [];
    }

    console.log(arry);

    try{
        fs.unlinkSync("./excel/"+fileName);
    } catch (e) {
        if(e.code === 'ENOENT'){
            console.log("error : delete file");
        } else {
            console.log(e);
        }
    }

    return res.send(arry);
    // return res.send(ApiResponse(true, "success"));
})



module.exports = router;
