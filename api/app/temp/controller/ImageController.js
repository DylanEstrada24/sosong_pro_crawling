const express = require('express');
const router = express.Router();
const fs = require("fs");
require('dotenv').config();
const path = require('path');
const {uploadCaptchaImg} = require("../../../config/S3");

router.post('/v1/test/image/upload',uploadCaptchaImg.single('img'),async (req, res) =>{
    return res.send(req.file.location);
})

module.exports = router;
