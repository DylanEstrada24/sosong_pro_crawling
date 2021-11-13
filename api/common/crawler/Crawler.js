const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');           //크롬 사용시

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.addArguments("--single-process");
chromeOptions.addArguments("--disable-dev-shm-usage");
// chromeOptions.addArguments('--window-size=1920x1080');

const Crawler_Service = require('./Crawler_Service.js');
const request = require("request");
const fs = require("fs");
const {v1} = require("uuid");
const {fstCharSpace} = require("../util/util");

// 전체 긁어오기 // 대법원
async function sanoCrawler(court, caseNumber, name) {

    const url = 'https://safind.scourt.go.kr/sf/mysafind.jsp';

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

    let fileName;
    // let k = 0;
    let strTmp;
    try {
        await driver.get(url);

        let inputData = {
            courtCase: {
                court: court,
                caseNumber: caseNumber,
                name: name,
                content: "",
                caseName: "",
            },
            progress: {
                date: [],
                content: [],
                result: [],
                disclosure: [],
            },
            party: {
                classification: [],
                name: [],
                fresult: [],
                arrivalAt: [],
                confirmAt: [],
            },
            representative: {
                classification: [],
                name: [],
            }
        }

        // [checkbox 선택]
        await driver.findElement(By.id('inputsano_ch')).click();

        // [법원 선택]
        await driver.findElement(By.id('sch_bub_nm')).sendKeys(court);

        // [사건번호 입력]
        await driver.findElement(By.xpath('//input[@name="input_sano"]')).sendKeys(caseNumber);

        // [담당자 이름 입력]
        await driver.findElement(By.id('ds_nm')).sendKeys(name);

        let loop = true;
        let cnt = 0;
        while (loop) {

            if (cnt > 30) {
                loop = false;
                return "";
            }

            // [캡챠 이미지 수집]
            let captchaImg2 = await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[8]/img'));
            let captchaImg3 = await captchaImg2.takeScreenshot();

            let filePath = "./captchaImg/"
            fileName = "cpatcha_" + v1() + ".png"
            await fs.writeFileSync(filePath + fileName, captchaImg3, 'base64');

            let captcha_location = await API_imgUpload(fileName)

            let captcha_result = await API_Call(captcha_location);
            console.log("Image File Location : " + await captcha_location);
            console.log("Captcha-Model Result Number: " + await captcha_result);

            // [캡챠 입력]
            let captchaAnswer = await driver.findElement(By.id('answer'));
            await captchaAnswer.sendKeys('' + await captcha_result);

            // [사건 일반내용으로 이동]
            await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[12]/a')).click();

            cnt++;
            try {

                try {
                    await fs.unlinkSync("./captchaImg/" + fileName);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        console.log("error : delete file");
                    } else {
                        console.log(e);
                    }
                }

                let alert = await driver.switchTo().alert();
                let alert_text = await alert.getText();

                if (alert_text.includes("사건이 존재하지 않습니다")) {
                    try {
                        fs.unlinkSync("./captchaImg/" + fileName);
                    } catch (e) {
                        if (e.code === 'ENOENT') {
                            console.log("error : delete file");
                        } else {
                            console.log(e);
                        }
                    }
                    console.log("Error : 사건이 존재하지 않습니다.")
                    return "1";
                } else if (alert_text.includes("올바른 사건구분을 입력하세요")) {
                    try {
                        fs.unlinkSync("./captchaImg/" + fileName);
                    } catch (e) {
                        if (e.code === 'ENOENT') {
                            console.log("error : delete file");
                        } else {
                            console.log(e);
                        }
                    }
                    console.log("Error : 올바른 사건구분을 입력하세요")
                    return "2";
                } else if (alert_text.includes("자동입력 방지문자가 일치하지 않습니다.") && cnt > 30) {
                    try {
                        fs.unlinkSync("./captchaImg/" + fileName);
                    } catch (e) {
                        if (e.code === 'ENOENT') {
                            console.log("error : delete file");
                        } else {
                            console.log(e);
                        }
                    }
                    console.log("Error : 자동입력 방지문자가 일치하지 않습니다")
                    return null;
                }

                if (alert) {
                    await alert.dismiss();
                    console.log("Captcha Model Result Miss Match")

                } else {

                    console.log("Captcha Model Result Match 1")
                    loop = false;
                }
            } catch (e) {

                console.log("Captcha Model Result Match 2")
                loop = false;

            }
        }

        // [기본내용 긁어오기]
        let basics = await driver.findElements(By.xpath('//*[@class="subTabContents"]'));
        let content = await basics[0].getAttribute('innerHTML');

        inputData.courtCase.content = content;

        let basics_caseName = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));

        //judiciary
        strTmp = await basics_caseName[1].getText();
        inputData.courtCase.caseName = await fstCharSpace(strTmp);

        let headers = await driver.findElements(By.xpath('//*[@class="titleH2"]'));

        for (let h = 1; h < await headers.length; h++) {
            strTmp = await headers[h].getText();
            if (strTmp.includes('당사자내용')) {
                try {
                    let party = await driver.findElements(By.xpath('//*[@class="tableHor"][' + (h) + ']/tbody/tr/td'));

                    for (let i = 0; i < party.length / 5; i++) {
                        strTmp = await party[(i * 5)].getText();
                        inputData.party.classification[i] = await fstCharSpace(strTmp);

                        strTmp = await party[(i * 5) + 1].getText();
                        inputData.party.name[i] = await fstCharSpace(strTmp);

                        strTmp = await party[(i * 5) + 2].getText();
                        inputData.party.fresult[i] = await fstCharSpace(strTmp);

                        strTmp = await party[(i * 5) + 3].getText();
                        inputData.party.arrivalAt[i] = await fstCharSpace(strTmp);

                        strTmp = await party[(i * 5) + 4].getText();
                        inputData.party.confirmAt[i] = await fstCharSpace(strTmp);
                    }
                } catch (e) {

                }
                // 당사자

            } else if (strTmp.includes('대리인내용')) {

                try {
                    // 대리인 representative
                    let representative = await driver.findElements(By.xpath('//*[@class="tableHor"][' + (h) + ']/tbody/tr/td'));

                    for (let i = 0; i < representative.length / 2; i++) {
                        strTmp = await representative[(i * 2)].getText();
                        inputData.representative.classification[i] = await fstCharSpace(strTmp);

                        strTmp = await representative[(i * 2) + 1].getText();
                        inputData.representative.name[i] = await fstCharSpace(strTmp);
                    }
                } catch (e) {

                }

            }
        }

        // [사건 진행내용으로 이동]
        let aTag = await driver.findElements(By.xpath('//*[@class="subTab2"]/ul/li[2]/a[1]'));
        await aTag[0].click();

        // [진행내용 긁어오기]
        let header = await driver.findElements(By.xpath('//*[@class="tableHor"]/thead/tr/th'));
        let header_length = header.length;
        let progress = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));

        if(header_length >= 5){
            return 100;
        }
        for (let i = 0; i < progress.length / header_length; i++) {
            strTmp = await progress[i * header_length].getText();
            if (strTmp == "해당 진행내용이 없습니다.") {
                break;
            }
            inputData.progress.date[i] = await fstCharSpace(strTmp);

            strTmp = await progress[(i * header_length) + 1].getText();
            inputData.progress.content[i] = await fstCharSpace(strTmp);

            strTmp = await progress[(i * header_length) + 2].getText();
            inputData.progress.result[i] = await fstCharSpace(strTmp);

            if(header_length === 4){
                strTmp = await progress[(i * header_length) + 3].getText();
                inputData.progress.disclosure[i] = await fstCharSpace(strTmp);
            }
        }

        console.log(inputData.progress);

        return inputData;

    } finally {

        await driver.quit();
    }
}

//진행내용 긁어오기 //
async function crawlProgress(court, caseNumber, name) {

    const url = 'https://safind.scourt.go.kr/sf/mysafind.jsp';

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

    let inputData = {
        courtCase: {
            court: court,
            name: name,
        },
        progress: {
            date: [],
            content: [],
            result: [],
            disclosure: [],
        }
    }


    let strTmp;
    try {
        await driver.get(url);

        // [checkbox 선택]
        await driver.findElement(By.id('inputsano_ch')).click();

        // [법원 선택]
        await driver.findElement(By.id('sch_bub_nm')).sendKeys(court);

        // [사건번호 입력]
        await driver.findElement(By.xpath('//input[@name="input_sano"]')).sendKeys(caseNumber);

        // [담당자 이름 입력]
        await driver.findElement(By.id('ds_nm')).sendKeys(name);

        let loop = true;
        let cnt = 0;
        while (loop) {

            if (cnt > 30) {
                loop = false;
                return "";
            }

            // [캡챠 이미지 수집]
            let captchaImg2 = await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[8]/img'));
            let captchaImg3 = await captchaImg2.takeScreenshot();

            let filePath = "./captchaImg/"
            fileName = "cpatcha_" + v1() + ".png"
            await fs.writeFileSync(filePath + fileName, captchaImg3, 'base64');

            let captcha_location = await API_imgUpload(fileName)

            let captcha_result = await API_Call(captcha_location);
            console.log("Image File Location : " + await captcha_location);
            console.log("Captcha-Model Result Number: " + await captcha_result);

            // [캡챠 입력]
            let captchaAnswer = await driver.findElement(By.id('answer'));
            await captchaAnswer.sendKeys('' + await captcha_result);

            // [사건 일반내용으로 이동]
            await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[12]/a')).click();

            cnt++
            try {
                let alert = await driver.switchTo().alert();
                let alert_text = await alert.getText();

                if (alert_text.includes("사건이 존재하지 않습니다")) {
                    console.log("Error : 사건이 존재하지 않습니다.")
                    try {
                        fs.unlinkSync("./captchaImg/" + fileName);
                    } catch (e) {
                        if (e.code === 'ENOENT') {
                            console.log("error : delete file");
                        } else {
                            console.log(e);
                        }
                    }
                    return "1";

                } else if (alert_text.includes("올바른 사건구분을 입력하세요")) {
                    try {
                        fs.unlinkSync("./captchaImg/" + fileName);
                    } catch (e) {
                        if (e.code === 'ENOENT') {
                            console.log("error : delete file");
                        } else {
                            console.log(e);
                        }
                    }
                    console.log("Error : 올바른 사건구분을 입력하세요")
                    return "2";
                } else if (alert_text.includes("자동입력 방지문자가 일치하지 않습니다.") && cnt > 30) {
                    console.log("Error : 자동입력 방지문자가 일치하지 않습니다")
                    try {
                        fs.unlinkSync("./captchaImg/" + fileName);
                    } catch (e) {
                        if (e.code === 'ENOENT') {
                            console.log("error : delete file");
                        } else {
                            console.log(e);
                        }
                    }
                    return null;
                }

                if (alert) {
                    await alert.dismiss();
                    console.log("Captcha Model Result Miss Match")

                } else {

                    console.log("Captcha Model Result Match 1")
                    loop = false;
                }
            } catch (e) {
                console.log("Captcha Model Result Match 2")
                loop = false;

                try {
                    fs.unlinkSync("./captchaImg/" + fileName);
                } catch (e) {
                    if (e.code === 'ENOENT') {
                        console.log("error : delete file");
                    } else {
                        console.log(e);
                    }
                }
            }
        }

        // [사건 진행내용으로 이동]
        let aTag = await driver.findElements(By.xpath('//*[@class="subTab2"]/ul/li[2]/a[1]'));
        await aTag[0].click();

        // [진행내용 긁어오기]
        let header = await driver.findElements(By.xpath('//*[@class="tableHor"]/thead/tr/th'));
        let header_length = header.length;
        let progress = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));

        if(header_length >= 5){
            return 100;
        }
        for (let i = 0; i < progress.length / header_length; i++) {
            strTmp = await progress[i * header_length].getText();
            if (strTmp == "해당 진행내용이 없습니다.") {
                break;
            }
            inputData.progress.date[i] = await fstCharSpace(strTmp);

            strTmp = await progress[(i * header_length) + 1].getText();
            inputData.progress.content[i] = await fstCharSpace(strTmp);

            strTmp = await progress[(i * header_length) + 2].getText();
            inputData.progress.result[i] = await fstCharSpace(strTmp);

            if(header_length === 4){
                strTmp = await progress[(i * header_length) + 3].getText();
                inputData.progress.disclosure[i] = await fstCharSpace(strTmp);
            }
        }

        return inputData;

    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }
}

//긁어오기 테스트 // 전자소송
async function crawlTest(userId, pw) {

    const url = 'https://ecfs.scourt.go.kr/ecf/index.jsp';

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

    let data = [];

    try {
        await driver.get(url);

        let alert = await driver.switchTo().alert();
        await alert.dismiss();

        await driver.findElement(By.id('btnTopLogin')).click();

        alert = await driver.switchTo().alert();
        await alert.dismiss();

        await driver.findElement(By.id('userId')).sendKeys(userId);

        await driver.findElement(By.id('pw')).sendKeys(pw);

        await driver.findElement(By.id('btnLogin')).click();


        alert = await driver.switchTo().alert();
        let alert_text = await alert.getText();
        if(alert_text.includes("로그인에 실패하였습니다.")){
            return 100;
        } else if (alert_text.includes("아이디는 반드시")){
            return 100;
        }
        await alert.dismiss();

        await driver.findElement(By.id('sMySa')).click();

        try {
            alert = await driver.switchTo().alert();
            await alert.dismiss();
        } catch (e) {
            await sleep(1000);

            alert = await driver.switchTo().alert();
            await alert.dismiss();
        }
        await driver.findElement(By.id('btnRetrieveIng')).click();

        await sleep(400);
        // 페이지 네이션
        // ... temp dk 11020214
        // if loginUsers case length is 0, don't catch under logic ... this will be make exceiption.
        // will be make junction
        let bodyChk = await driver.findElements(By.xpath('//*[@id="tbMainIng"]/tbody/tr/td'));
        console.log(await bodyChk[0].getText());
        let str = await bodyChk[0].getText();

        if (str.includes("조회결과가 존재하지 않습니다.")) {
            return 1;
        }

        await driver.findElement(By.id('tbCmbtbMainIngtbNavi')).sendKeys('50개씩 보기');

        await sleep(400);

        // let btnDelivery = await driver.findElements(By.xpath('//*[@class="pg_sum"]'));
        // console.log(await btnDelivery[0].getText());

        // let page = await driver.findElements(By.xpath('//*[@class="paginate"]/a'));
        // console.log(await page.length - 4); // 4개 앞 2개 뒤 2개


        let tbl = await driver.findElements(By.xpath('//*[@id="tbMainIng"]/tbody/tr/td[3]/a'));

        let court = await driver.findElements(By.xpath('//*[@id="tbMainIng"]/tbody/tr/td[2]'));

        let MainWindow = await driver.getWindowHandle();

        for (let i = 0; i < tbl.length; i++) {

            let caseNumber = await tbl[i].getText();

            if (caseNumber.includes("본소")) {
                caseNumber = caseNumber.substr(0, caseNumber.indexOf(" (본소)"));
            }

            if (caseNumber.includes("반소")) {
                caseNumber = caseNumber.substr(0, caseNumber.indexOf(" (반소)"));
            }

            console.log(caseNumber);
            await Crawler_Service.checkCourtCase(caseNumber).then(async (result) => {
                let strTmp;
                if (await result[0]) {
                    let idx = {
                        idx : result[0].idx,
                        caseNumber : caseNumber,
                    }
                    data.push(idx);
                } else {

                    let inputData = {
                        courtCase: {
                            court: '',
                            name: '',
                            caseName: "",
                        },
                        progress: {
                            date: [],
                            content: [],
                            result: [],
                            disclosure: [],
                        },
                        party: {
                            classification: [],
                            name: [],
                            fresult: [],
                            arrivalAt: [],
                            confirmAt: [],
                        },
                        representative: {
                            classification: [],
                            name: [],
                        },
                    }

                    inputData.courtCase.court = await court[i].getText()

                    // 사건 클릭
                    await tbl[i].click();

                    // 팝업창 들고오기
                    let windows = await driver.getAllWindowHandles();
                    await driver.switchTo().window(windows[1]);

                    // 0.4초 쉬기
                    sleep(400);

                    try {

                        // [기본내용 긁어오기]
                        let basics = await driver.findElements(By.xpath('//*[@class="subTabContents"]'));
                        let content = await basics[0].getAttribute('innerHTML');
                        inputData.courtCase.content = content;

                        // [기본내용 긁어오기]
                        let basics_court = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));

                        strTmp = await basics_court[0].getText();
                        inputData.courtCase.caseNumber = await fstCharSpace(strTmp);

                        strTmp = await basics_court[1].getText();
                        inputData.courtCase.caseName = await fstCharSpace(strTmp)

                        strTmp = await basics_court[2].getText();
                        inputData.courtCase.name = await fstCharSpace(strTmp);
                        let headers = await driver.findElements(By.xpath('//*[@class="titleH2"]'));

                        for (let h = 1; h < await headers.length; h++) {
                            strTmp = await headers[h].getText();
                            if (strTmp.includes('당사자내용')) {
                                try {
                                    let party = await driver.findElements(By.xpath('//*[@class="tableHor"][' + (h) + ']/tbody/tr/td'));

                                    for (let i = 0; i < party.length / 5; i++) {
                                        strTmp = await party[(i * 5)].getText();
                                        inputData.party.classification[i] = await fstCharSpace(strTmp);

                                        strTmp = await party[(i * 5) + 1].getText();
                                        inputData.party.name[i] = await fstCharSpace(strTmp);

                                        strTmp = await party[(i * 5) + 2].getText();
                                        inputData.party.fresult[i] = await fstCharSpace(strTmp);

                                        strTmp = await party[(i * 5) + 3].getText();
                                        inputData.party.arrivalAt[i] = await fstCharSpace(strTmp);

                                        strTmp = await party[(i * 5) + 4].getText();
                                        inputData.party.confirmAt[i] = await fstCharSpace(strTmp);
                                    }
                                } catch (e) {

                                }
                                // 당사자

                            } else if (strTmp.includes('대리인내용')) {

                                try {
                                    // 대리인 representative
                                    let representative = await driver.findElements(By.xpath('//*[@class="tableHor"][' + (h) + ']/tbody/tr/td'));

                                    for (let i = 0; i < representative.length / 2; i++) {
                                        strTmp = await representative[(i * 2)].getText();
                                        inputData.representative.classification[i] = await fstCharSpace(strTmp);

                                        strTmp = await representative[(i * 2) + 1].getText();
                                        inputData.representative.name[i] = await fstCharSpace(strTmp);
                                    }
                                } catch (e) {

                                }

                            }
                        }

                        // [사건 진행내용으로 이동]
                        let aTag = await driver.findElements(By.xpath('//*[@class="subTabTitle2"]/li[2]/a[1]'));
                        await aTag[0].click();

                        // [진행내용 긁어오기]
                        let header = await driver.findElements(By.xpath('//*[@class="tableHor"]/thead/tr/th'));
                        let header_length = header.length;
                        let progress = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));

                        if(header_length >= 5){
                            return 100;
                        }
                        for (let i = 0; i < progress.length / header_length; i++) {
                            strTmp = await progress[i * header_length].getText();
                            if (strTmp == "해당 진행내용이 없습니다.") {
                                break;
                            }
                            inputData.progress.date[i] = await fstCharSpace(strTmp);

                            strTmp = await progress[(i * header_length) + 1].getText();
                            inputData.progress.content[i] = await fstCharSpace(strTmp);

                            strTmp = await progress[(i * header_length) + 2].getText();
                            inputData.progress.result[i] = await fstCharSpace(strTmp);

                            if(header_length === 4){
                                strTmp = await progress[(i * header_length) + 3].getText();
                                inputData.progress.disclosure[i] = await fstCharSpace(strTmp);
                            }
                        }

                        console.log(inputData.progress);

                        await driver.close();
                        await driver.switchTo().window(MainWindow);

                        data.push(inputData);

                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        }

        return data;


    } finally {
        await driver.quit();
    }
}


function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {
    }
}

async function API_Call(captchaImg) {
    return new Promise(function (resolve) {
        request.post({
            headers: {'content-type': "application/json"},
            url: 'https://sspro.rhodolite.org/captchasolver',
            body: {"image_location": captchaImg},
            json: true
        }, async function (err, res, body) {
            resolve(body.result);
        })
    })
}

async function API_imgUpload(captchaImg) {
    return new Promise(function (resolve) {
        request.post({
            headers: {'content-type': "multipart/form-data"},
            url: 'http://localhost:8883/api/v1/test/image/upload',
            formData: {
                "img": fs.createReadStream("./captchaImg/" + captchaImg),
            },
        }, async function (err, res, body) {
            await resolve(body);
        })
    })
}

module.exports = {
    sanoCrawler, crawlProgress, crawlTest
}
