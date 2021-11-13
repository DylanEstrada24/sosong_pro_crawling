const nodemailer = require('nodemailer'); 

const smtpTransport = nodemailer.createTransport(
    { service: "Gmail", auth: { user: "sosongproservice@gmail.com", pass: "ththdvmfh1!" }, 
    tls: { rejectUnauthorized: false } });


module.exports = smtpTransport;
