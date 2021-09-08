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
        cb(null, 'plusMember/')
    },
    filename: (req, file, cb) => {	// timestamp를 이용해 새로운 파일명 설정
        let newFileName = new Date().getTime() + "_" + file.originalname;
        cb(null, newFileName)
    },
})
let upload = multer({ storage: storage});

router.post('/v1/plusMember/registrationImage/upload', upload.single('imageFile'), async (req, res) =>{

    console.log(req.file.filename);

    const fileName = req.file.filename;
    const imageFile = fs.readFileSync("./plusMember/"+fileName);

    // try{
    //     fs.unlinkSync("./excel/"+fileName);
    // } catch (e) {
    //     if(e.code === 'ENOENT'){
    //         console.log("error : delete file");
    //     } else {
    //         console.log(e);
    //     }
    // }

    return res.send(ApiResponse(ErrorCode.CODE_500));
    // return res.send(ApiResponse(true, "success"));
})



module.exports = router;
