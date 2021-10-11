const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');           //크롬 사용시
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.addArguments("--single-process");
chromeOptions.addArguments("--disable-dev-shm-usage");
chromeOptions.addArguments('--window-size=1920x1080');
const path = require('path');
const Crawler_Service = require('./Crawler_Service.js');
const request = require("request");
const fs = require("fs");
const { v1 } = require("uuid");
const {uploadCaptchaImg} = require("../../config/S3");

async function testCr() {
    let court = "부산지방법원 동부지원";
    let caseNumber = "2020가소377585";
    let name = "김병철";

    const url = 'https://safind.scourt.go.kr/sf/mysafind.jsp';

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

    let fileName;

    try {
        console.log(url);
        await driver.get(url);

        // [checkbox 선택]
        await driver.findElement(By.id('inputsano_ch')).click();

        // [법원 선택]
        // let court = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[12]/a'));
        await driver.findElement(By.id('sch_bub_nm')).sendKeys(court);

        // [사건번호 입력]
        await driver.findElement(By.xpath('//input[@name="input_sano"]')).sendKeys(caseNumber);

        // [담당자 이름 입력]
        await driver.findElement(By.id('ds_nm')).sendKeys(name);

        // // [캡챠 이미지 수집]
        // let captchaImg = await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[8]/img')).getAttribute('src');
        // console.log(await captchaImg);

        let captchaImg2 = await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[8]/img'));
        let captchaImg3 = await captchaImg2.takeScreenshot();

        uploadCaptchaImg.single("n");

        // fileName = "cpatcha_"+v1()+".png"
        // await fs.writeFileSync("./captchaImg/"+fileName, captchaImg3, 'base64');
        //
        // console.log(await fileName);
        // let captcha_location = "https://sspro.rhodolite.org/api/v1/test/image?file=" + fileName;

        //
        // // TODO 캡챠 이미지 수집 후 모델 이용해 캡챠우회 해야됩니다.

        // TODO [1]---
        // TODO 1. 캡챠 가져와서 저장


        // TODO 2. 캡챠 이미지 보내기 (이미지 맞는지 확인)
        let captcha_result = await API_Call(captcha_location);

        // TODO 3. 캡챠 값 입력 후 사이트 변경
        // TODO ---[1]

        console.log(await captcha_result);
        // [캡챠 입력]
        let captchaAnswer = await driver.findElement(By.id('answer'));
        await captchaAnswer.sendKeys('' + await captcha_result);

        // [입력 선택]
        // let search = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[7]/input'));
        // console.log('[search.length]', await search.length);

        // [사건 일반내용으로 이동]
        // 검색 버튼 클릭
        // await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[12]/a')).click();

        return "oo";
    } finally {
        try{
            fs.unlinkSync("./captchaImg/"+fileName);
        } catch (e) {
            if(e.code === 'ENOENT'){
                console.log("error : delete file");
            } else {
                console.log(e);
            }
        }

        setTimeout(() => {
            driver.quit();
        }, 10000)

    }

}

// 전체 긁어오기 // 대법원
async function sanoCrawler(court, caseNumber, name) {


    if (court !== "부산지방법원 동부지원") {
        return null
    }
    if (caseNumber !== "2020가소377585") {
        return null
    }
    if (name !== "김병철") {
        return null
    }

    // const url = 'http://localhost:8883/api/v1/test1';
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
            type: []
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

    try {
        console.log(url);
        await driver.get(url);

        // [checkbox 선택]
        await driver.findElement(By.id('inputsano_ch')).click();

        // [법원 선택]
        // let court = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[12]/a'));
        // await driver.findElement(By.id('sch_bub_nm')).sendKeys(court);
        await driver.findElement(By.id('sch_bub_nm')).sendKeys('부산지방법원 동부지원');

        // [사건번호 입력]
        // await driver.findElement(By.xpath('//input[@name="input_sano"]')).sendKeys(caseNumber);
        await driver.findElement(By.xpath('//input[@name="input_sano"]')).sendKeys('2020가소377585');

        // [담당자 이름 입력]
        // await driver.findElement(By.id('ds_nm')).sendKeys(name);
        await driver.findElement(By.id('ds_nm')).sendKeys('김병철');

        // // [캡챠 이미지 수집]
        let captchaImg = await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[8]/img')).getAttribute('src');
        console.log(await captchaImg);
        //
        // // TODO 캡챠 이미지 수집 후 모델 이용해 캡챠우회 해야됩니다.

        // TODO [1]---
        // TODO 1. 캡챠 가져와서 저장


        // TODO 2. 캡챠 이미지 보내기 (이미지 맞는지 확인)
        //https://sspro.rhodolite.org/captchasolver

        // TODO 3. 캡챠 값 입력 후 사이트 변경
        // TODO ---[1]


        //
        // // [캡챠 입력]
        // let captchaAnswer = await driver.findElement(By.id('answer'));
        // await captchaAnswer.sendKeys('캡챠');

        // [입력 선택]
        // let search = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[7]/input'));
        // console.log('[search.length]', await search.length);

        // [사건 일반내용으로 이동]
        // 검색 버튼 클릭
        await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[12]/a')).click();

        // [기본내용 긁어오기]
        // tableVer라는 클래스 명을 가진 element들을 받아온다.
        // let basics = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));
        let basics = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));
        // console.log('[basics.length]', basics.length)

        // console.log('사건번호 : ' + await basics[0].getText());
        // console.log('사건명 : ' + await basics[1].getText());
        // console.log('원고 : ' + await basics[2].getText());
        // console.log('피고 : ' + await basics[3].getText());
        // console.log('재판부 : ' + await basics[4].getText());
        // console.log('접수일 : ' + await basics[5].getText());
        // // console.log('원고소가 : ' + await basics[7].getText());
        // // console.log('수리구분 : ' + await basics[9].getText());
        // console.log('병합구분 : ' + await basics[10].getText());
        // console.log('인지액 : ' + await basics[14].getText());

        //judiciary
        inputData.courtCase.caseNumber = await basics[0].getText();
        inputData.courtCase.caseName = await basics[1].getText();
        // inputData.courtCase.plaintiff = await basics[2].getText();
        // inputData.courtCase.defendant = await basics[3].getText();
        inputData.courtCase.judiciary = await basics[4].getText();
        inputData.courtCase.receiptAt = await basics[5].getText();
        inputData.courtCase.mergeClassification = await basics[10].getText();
        inputData.courtCase.fee = await basics[14].getText()/*.substring(0, basics[14].getText().indexOf(' '))*/;

        // 당사자
        let party = await driver.findElements(By.xpath('//*[@class="tableHor"][3]/tbody/tr/td'));
        // console.log('[party.length]', party.length)
        // console.log('구분         이름        종국결과      판결도달일     확정일 ')


        for (let i = 0; i < party.length / 5; i++) {
            // console.log(await party[(i * 5)].getText() + " " + await party[(i * 5) + 1].getText() + " " + await party[(i * 5) + 2].getText()
            // + " " + await party[(i * 5) + 3].getText() + " " + await party[(i * 5) + 4].getText());
            inputData.party.classification[i] = await party[(i * 5)].getText();
            inputData.party.name[i] = await party[(i * 5) + 1].getText();
            inputData.party.fresult[i] = await party[(i * 5) + 2].getText();
            inputData.party.arrivalAt[i] = await party[(i * 5) + 3].getText();
            inputData.party.confirmAt[i] = await party[(i * 5) + 4].getText();
        }

        // console.log(inputData.party);

        // 대리인 representative
        let representative = await driver.findElements(By.xpath('//*[@class="tableHor"][4]/tbody/tr/td'));
        // console.log('[representative.length]', representative.length)
        // console.log('        구분         이름 ')

        for (let i = 0; i < representative.length / 2; i++) {
            // console.log(await representative[(i * 2)].getText() + " " + await representative[(i * 2) + 1].getText());
            inputData.representative.classification[i] = await representative[(i * 2)].getText();
            inputData.representative.name[i] = await representative[(i * 2) + 1].getText();
        }

        //
        // [사건 진행내용으로 이동]
        let aTag = await driver.findElements(By.xpath('//*[@class="subTab2"]/ul/li[2]/a[1]'));
        // console.log('[aTag.length]', await aTag.length)
        // console.log('a : ', await aTag[0].getText());
        await aTag[0].click();

        // [종국 결과]
        let detail = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));
        // console.log('[detail.length]', detail.length)
        inputData.courtCase.finalResult = await detail[6].getText();

        // // console.log('종국결과 : ' + await detail[6].getText());
        //
        // // for(let i = 0 ; i < detail.length; i++){
        // //     console.log(await detail[i].getText());
        // // }


        // 1
        // [분류 검색]
        await driver.findElement(By.id('select')).sendKeys('기 일');
        // let progressType = await driver.findElements(By.xpath('//*[@class="graySelect"]'));
        // console.log('[progressType.length]', progressType.length)
        // console.log(await progressType.getText());

        // [분류 선택 버튼]
        let btnDate = await driver.findElements(By.xpath('//*[@class="fr"]/a[2]'));
        // console.log("testlength :"+ test.length);
        // console.log(await test[0].getText());
        // await test[0].click();
        await btnDate[0].click()

        // [진행내용 긁어오기]
        let progress = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));
        // console.log('[progress.length]', progress.length)
        // console.log('        일자                        내용                                        결과                공시문 ')

        let k = 0;
        for (let i = 0; i < progress.length / 3; i++) {
            inputData.progress.date[k] = await progress[i * 3].getText();
            inputData.progress.content[k] = await progress[(i * 3) + 1].getText();
            inputData.progress.result[k] = await progress[(i * 3) + 2].getText();
            inputData.progress.type[k] = 1;
            k++;
            // console.log((i + 1) + ' : ' + await progress[i * 3].getText() + await progress[(i * 3) + 1].getText()
            //     + await progress[(i * 3) + 2].getText() + await progress[(i * 3) + 3].getText());
        }

        // 2
        // [분류 검색]
        await driver.findElement(By.id('select')).sendKeys('명 일');

        // [분류 선택 버튼]
        let btnOrder = await driver.findElements(By.xpath('//*[@classname="fr"]/a[2]'));
        await btnOrder[0].click();

        // [진행내용 긁어오기]
        let progress2 = await driver.findElements(By.xpath('//*[@classname="tableHor"]/tbody/tr/td'));
        // console.log('        일자                        내용                                        결과                공시문 ')

        for (let i = 0; i < progress2.length / 3; i++) {
            inputData.progress.date[k] = await progress2[i * 3].getText();
            inputData.progress.content[k] = await progress2[(i * 3) + 1].getText();
            inputData.progress.result[k] = await progress2[(i * 3) + 2].getText();
            inputData.progress.type[k] = 2;
            k++
            // console.log((i + 1) + ' : ' + await progress2[i * 3].getText() + await progress2[(i * 3) + 1].getText()
            //     + await progress2[(i * 3) + 2].getText());
        }

        // 3
        // [분류 검색]
        await driver.findElement(By.id('select')).sendKeys('제출서류');

        // [분류 선택 버튼]
        let btnDocSubmitted = await driver.findElements(By.xpath('//*[@classname="fr"]/a[2]'));
        await btnDocSubmitted[0].click();

        // [진행내용 긁어오기]
        let progress3 = await driver.findElements(By.xpath('//*[@classname="tableHor"]/tbody/tr/td'));
        // console.log('        일자                        내용                                        결과                공시문 ')

        for (let i = 0; i < progress3.length / 3; i++) {
            inputData.progress.date[k] = await progress3[i * 3].getText();
            inputData.progress.content[k] = await progress3[(i * 3) + 1].getText();
            inputData.progress.result[k] = await progress3[(i * 3) + 2].getText();
            inputData.progress.type[k] = 3;
            k++;
            // console.log((i + 1) + ' : ' + await progress3[i * 3].getText() + await progress3[(i * 3) + 1].getText()
            //     + await progress3[(i * 3) + 2].getText());
        }

        // 4
        // [분류 검색]
        await driver.findElement(By.id('select')).sendKeys('송달');

        // [분류 선택 버튼]
        let btnDelivery = await driver.findElements(By.xpath('//*[@classname="fr"]/a[2]'));
        await btnDelivery[0].click();

        // [진행내용 긁어오기]
        let progress4 = await driver.findElements(By.xpath('//*[@classname="tableHor"]/tbody/tr/td'));
        console.log('[progress4.length]', progress4.length)
        // console.log(await progress4)
        // console.log('        일자                        내용                                        결과                공시문 ')

        for (let i = 0; i < progress4.length / 4; i++) {
            inputData.progress.date[k] = await progress4[i * 4].getText();
            inputData.progress.content[k] = await progress4[(i * 4) + 1].getText();
            inputData.progress.result[k] = await progress4[(i * 4) + 2].getText();
            inputData.progress.disclosure[k] = await progress4[(i * 4) + 3].getText();
            inputData.progress.type[k] = 4;
            k++;
            // console.log((i + 1) + ' : ' + await progress4[i * 4].getText() + await progress4[(i * 4) + 1].getText()
            //     + await progress4[(i * 4) + 2].getText() + await progress4[(i * 4) + 3].getText());
        }

        return inputData;

        // TODO 사건 기본내용 및 진행내용 DB 저장 작업 진행해야합니다.


    } finally {
        await driver.quit();
    }
}

//진행내용 긁어오기 //
async function crawlProgress(court, caseNumber, name) {

    if (court !== "부산지방법원 동부지원") {
        return null
    }
    if (caseNumber !== "2020가소377585") {
        return null
    }
    if (name !== "김병철") {
        return null
    }

    const url = 'http://localhost:8883/api/v1/test1';
    //  const url = 'https://safind.scourt.go.kr/sf/mysafind.jsp';

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
            type: [],
        },
    }

    try {
        console.log(url);
        await driver.get(url);

        // [checkbox 선택]
        await driver.findElement(By.id('inputsano_ch')).click();

        // [법원 선택]
        // let court = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[12]/a'));
        // await driver.findElement(By.id('sch_bub_nm')).sendKeys(court);
        await driver.findElement(By.id('sch_bub_nm')).sendKeys('부산지방법원 동부지원');

        // [사건번호 입력]
        // await driver.findElement(By.xpath('//input[@name="input_sano"]')).sendKeys(caseNumber);
        await driver.findElement(By.xpath('//input[@name="input_sano"]')).sendKeys('2020가소377585');

        // [담당자 이름 입력]
        // await driver.findElement(By.id('ds_nm')).sendKeys(name);
        await driver.findElement(By.id('ds_nm')).sendKeys('김병철');

        // // [캡챠 이미지 수집]
        // let captchaImg = await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[8]/img')).getAttribute('src');
        // console.log(await captchaImg);
        //
        // // TODO 캡챠 이미지 수집 후 모델 이용해 캡챠우회 해야됩니다.
        //
        // // [캡챠 입력]
        // let captchaAnswer = await driver.findElement(By.id('answer'));
        // await captchaAnswer.sendKeys('캡챠');

        // [입력 선택]
        // let search = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[7]/input'));
        // console.log('[search.length]', await search.length);

        // [사건 일반내용으로 이동]
        // 검색 버튼 클릭
        await driver.findElement(By.xpath('//*[@class="tableVer"]/tbody/tr/td[1]/div[12]/a')).click();

        //
        // [사건 진행내용으로 이동]
        let aTag = await driver.findElements(By.xpath('//*[@class="subTab2"]/ul/li[2]/a[1]'));
        // console.log('[aTag.length]', await aTag.length)
        // console.log('a : ', await aTag[0].getText());
        await aTag[0].click();

        // 1
        // [분류 검색]
        await driver.findElement(By.id('select')).sendKeys('기 일');
        // let progressType = await driver.findElements(By.xpath('//*[@class="graySelect"]'));
        // console.log('[progressType.length]', progressType.length)
        // console.log(await progressType.getText());

        // [분류 선택 버튼]
        let btnDate = await driver.findElements(By.xpath('//*[@class="fr"]/a[2]'));
        // console.log("testlength :"+ test.length);
        // console.log(await test[0].getText());
        // await test[0].click();
        await btnDate[0].click()

        // [진행내용 긁어오기]
        let progress = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));
        // console.log('[progress.length]', progress.length)
        // console.log('        일자                        내용                                        결과                공시문 ')

        let k = 0;
        for (let i = 0; i < progress.length / 3; i++) {
            inputData.progress.date[k] = await progress[i * 3].getText();
            inputData.progress.content[k] = await progress[(i * 3) + 1].getText();
            inputData.progress.result[k] = await progress[(i * 3) + 2].getText();
            inputData.progress.type[k] = 1;
            k++;
            // console.log((i + 1) + ' : ' + await progress[i * 3].getText() + await progress[(i * 3) + 1].getText()
            //     + await progress[(i * 3) + 2].getText() + await progress[(i * 3) + 3].getText());
        }

        // 2
        // [분류 검색]
        await driver.findElement(By.id('select')).sendKeys('명 일');

        // [분류 선택 버튼]
        let btnOrder = await driver.findElements(By.xpath('//*[@classname="fr"]/a[2]'));
        await btnOrder[0].click();

        // [진행내용 긁어오기]
        let progress2 = await driver.findElements(By.xpath('//*[@classname="tableHor"]/tbody/tr/td'));
        // console.log('        일자                        내용                                        결과                공시문 ')

        for (let i = 0; i < progress2.length / 3; i++) {
            inputData.progress.date[k] = await progress2[i * 3].getText();
            inputData.progress.content[k] = await progress2[(i * 3) + 1].getText();
            inputData.progress.result[k] = await progress2[(i * 3) + 2].getText();
            inputData.progress.type[k] = 2;
            k++
            // console.log((i + 1) + ' : ' + await progress2[i * 3].getText() + await progress2[(i * 3) + 1].getText()
            //     + await progress2[(i * 3) + 2].getText());
        }

        // 3
        // [분류 검색]
        await driver.findElement(By.id('select')).sendKeys('제출서류');

        // [분류 선택 버튼]
        let btnDocSubmitted = await driver.findElements(By.xpath('//*[@classname="fr"]/a[2]'));
        await btnDocSubmitted[0].click();

        // [진행내용 긁어오기]
        let progress3 = await driver.findElements(By.xpath('//*[@classname="tableHor"]/tbody/tr/td'));
        // console.log('        일자                        내용                                        결과                공시문 ')

        for (let i = 0; i < progress3.length / 3; i++) {
            inputData.progress.date[k] = await progress3[i * 3].getText();
            inputData.progress.content[k] = await progress3[(i * 3) + 1].getText();
            inputData.progress.result[k] = await progress3[(i * 3) + 2].getText();
            inputData.progress.type[k] = 3;
            k++;
            // console.log((i + 1) + ' : ' + await progress3[i * 3].getText() + await progress3[(i * 3) + 1].getText()
            //     + await progress3[(i * 3) + 2].getText());
        }

        // 4
        // [분류 검색]
        await driver.findElement(By.id('select')).sendKeys('송달');

        // [분류 선택 버튼]
        let btnDelivery = await driver.findElements(By.xpath('//*[@classname="fr"]/a[2]'));
        await btnDelivery[0].click();

        // [진행내용 긁어오기]
        let progress4 = await driver.findElements(By.xpath('//*[@classname="tableHor"]/tbody/tr/td'));
        console.log('[progress4.length]', progress4.length)
        // console.log(await progress4)
        // console.log('        일자                        내용                                        결과                공시문 ')

        for (let i = 0; i < progress4.length / 4; i++) {
            inputData.progress.date[k] = await progress4[i * 4].getText();
            inputData.progress.content[k] = await progress4[(i * 4) + 1].getText();
            inputData.progress.result[k] = await progress4[(i * 4) + 2].getText();
            inputData.progress.disclosure[k] = await progress4[(i * 4) + 3].getText();
            inputData.progress.type[k] = 4;
            k++;
            // console.log((i + 1) + ' : ' + await progress4[i * 4].getText() + await progress4[(i * 4) + 1].getText()
            //     + await progress4[(i * 4) + 2].getText() + await progress4[(i * 4) + 3].getText());
        }

        return inputData;

        // TODO 사건 기본내용 및 진행내용 DB 저장 작업 진행해야합니다.


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
        console.log(url);
        await driver.get(url);

        let alert = await driver.switchTo().alert();
        await alert.dismiss();

        await driver.findElement(By.id('btnTopLogin')).click();

        alert = await driver.switchTo().alert();
        await alert.dismiss();

        // await driver.findElement(By.id('userId')).sendKeys('khleelawyer1');
        await driver.findElement(By.id('userId')).sendKeys(userId);

        // await driver.findElement(By.id('pw')).sendKeys('sosongpro1!');
        await driver.findElement(By.id('pw')).sendKeys(pw);

        await driver.findElement(By.id('btnLogin')).click();

        alert = await driver.switchTo().alert();
        await alert.dismiss();

        let userName = await driver.findElement(By.id('userName'))
        // console.log(await userName.getText());

        await driver.findElement(By.id('sMySa')).click();

        alert = await driver.switchTo().alert();
        await alert.dismiss();

        await driver.findElement(By.id('btnRetrieveIng')).click();

        // alert4 = await driver.switchTo().alert();
        // console.log(await alert4.getText());
        // await alert4.dismiss();


        let tbl = await driver.findElements(By.xpath('//*[@id="tbMainIng"]/tbody/tr/td[3]/a'));
        // console.log(await tbl.length);
        // console.log(await tbl[0].getText());

        let court = await driver.findElements(By.xpath('//*[@id="tbMainIng"]/tbody/tr/td[2]'));

        // 페이지 네이션
        let page = await driver.findElements(By.xpath('//*[@class="paginate"]/a'));
        // console.log(await page.length - 4); // 4개 앞 2개 뒤 2개

        let MainWindow = await driver.getWindowHandle();


        for (let i = 0; i < tbl.length; i++) {

            let caseNumber = await tbl[i].getText();

            if (caseNumber.includes("본소")) {
                // caseNumber = caseNumber.substr(caseNumber.indexOf(" (본소)"), caseNumber.length);
                caseNumber = caseNumber.substr(0, caseNumber.indexOf(" (본소)"));
            }


            await Crawler_Service.checkCourtCase(caseNumber).then(async (result) => {
                if (result[0]) {
                    console.log("있다");
                    return "이미 다있고 유저 case 추가함"
                } else {
                    console.log("없다");

                    // 그릇 만들기
                    let inputData = {
                        courtCase: {
                            court: '',
                            name: '',
                        },
                        progress: {
                            date: [],
                            content: [],
                            result: [],
                            disclosure: [],
                            type: []
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

                    inputData.courtCase.court = await court[i].getText()

                    // 사건 클릭
                    await tbl[i].click();

                    // 팝업창 들고오기
                    let windows = await driver.getAllWindowHandles();
                    // console.log(await windows)
                    await driver.switchTo().window(windows[1]);

                    // 0.3초 쉬기
                    sleep(300);


                    try {

                        // [기본내용 긁어오기]
                        let basics = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));

                        //judiciary
                        let strTmp = await basics[0].getText();
                        if (strTmp.substr(0, 1) === " ") {
                            strTmp = strTmp.substr(1, strTmp.length);
                        }
                        inputData.courtCase.caseNumber = await strTmp;
                        inputData.courtCase.caseName = await basics[1].getText();
                        inputData.courtCase.name = await basics[2].getText();
                        inputData.courtCase.judiciary = await basics[4].getText();
                        inputData.courtCase.receiptAt = await basics[5].getText();
                        inputData.courtCase.mergeClassification = await basics[10].getText();
                        inputData.courtCase.fee = await basics[14].getText()/*.substring(0, basics[14].getText().indexOf(' '))*/;

                        // 테이블 확인
                        let tableChk = await driver.findElements(By.xpath('//*[@class="titleH2"]'));
                        // console.log("tableChk : " + await tableChk.length);
                        // console.log(await tableChk[tableChk.length-1].getText());

                        // 당사자
                        let partyCnt = await driver.findElements(By.xpath('//*[@class="tableHor"]'));
                        // console.log("[party cnt] : "+await partyCnt.length);
                        let cnt = partyCnt.length;
                        if (await tableChk[tableChk.length - 1].getText() === '소송관계인내용') {
                            // console.log("여기들어옴");
                            cnt = partyCnt.length - 1;
                        }

                        let party = await driver.findElements(By.xpath('//*[@class="tableHor"][' + (cnt - 1) + ']/tbody/tr/td'));
                        // console.log("[party length] : "+await party.length);
                        // console.log("[party 0] : "+await party[0].getText());
                        // console.log("[party 1] : "+await party[1].getText());

                        if (party.length > 1) {
                            for (let i = 0; i < party.length / 5; i++) {
                                inputData.party.classification[i] = await party[(i * 5)].getText();
                                inputData.party.name[i] = await party[(i * 5) + 1].getText();
                                inputData.party.fresult[i] = await party[(i * 5) + 2].getText();
                                inputData.party.arrivalAt[i] = await party[(i * 5) + 3].getText();
                                inputData.party.confirmAt[i] = await party[(i * 5) + 4].getText();
                            }
                        }

                        // 대리인 representative
                        let representative = await driver.findElements(By.xpath('//*[@class="tableHor"][' + (cnt) + ']/tbody/tr/td'));

                        for (let i = 0; i < representative.length / 2; i++) {
                            inputData.representative.classification[i] = await representative[(i * 2)].getText();
                            inputData.representative.name[i] = await representative[(i * 2) + 1].getText();
                        }

                        // [사건 진행내용으로 이동]
                        let aTag = await driver.findElements(By.xpath('//*[@class="subTab2"]/ul/li[2]/a[1]'));
                        await aTag[0].click();

                        // [종국 결과]
                        let detail = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));
                        inputData.courtCase.finalResult = await detail[6].getText();


                        // 1
                        // [분류 검색]
                        await driver.findElement(By.id('select')).sendKeys('기 일');

                        // [분류 선택 버튼]
                        let btnDate = await driver.findElements(By.xpath('//*[@class="fr"]'));
                        // console.log(await btnDate.length);
                        await btnDate[0].click();

                        // [진행내용 긁어오기]
                        let progress = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));
                        // console.log("[progress length] : " + progress.length);
                        // console.log(await progress[0].getText());
                        let k = 0;
                        if (progress.length > 1) {
                            for (let i = 0; i < progress.length / 3; i++) {
                                inputData.progress.date[k] = await progress[i * 3].getText();
                                inputData.progress.content[k] = await progress[(i * 3) + 1].getText();
                                inputData.progress.result[k] = await progress[(i * 3) + 2].getText();
                                inputData.progress.type[k] = 1;
                                k++;
                            }
                        }

                        // 2
                        // [분류 검색]
                        await driver.findElement(By.id('select')).sendKeys('명 일');

                        // [분류 선택 버튼]
                        let btnOrder = await driver.findElements(By.xpath('//*[@class="fr"]'));
                        await btnOrder[0].click();

                        // [진행내용 긁어오기]
                        let progress2 = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));

                        if (progress2 > 1) {
                            for (let i = 0; i < progress2.length / 3; i++) {
                                inputData.progress.date[k] = await progress2[i * 3].getText();
                                inputData.progress.content[k] = await progress2[(i * 3) + 1].getText();
                                inputData.progress.result[k] = await progress2[(i * 3) + 2].getText();
                                inputData.progress.type[k] = 2;
                                k++
                            }
                        }

                        // 3
                        // [분류 검색]
                        await driver.findElement(By.id('select')).sendKeys('제출서류');

                        // [분류 선택 버튼]
                        let btnDocSubmitted = await driver.findElements(By.xpath('//*[@class="fr"]'));
                        await btnDocSubmitted[0].click();

                        // [진행내용 긁어오기]
                        let progress3 = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));

                        for (let i = 0; i < progress3.length / 3; i++) {
                            inputData.progress.date[k] = await progress3[i * 3].getText();
                            inputData.progress.content[k] = await progress3[(i * 3) + 1].getText();
                            inputData.progress.result[k] = await progress3[(i * 3) + 2].getText();
                            inputData.progress.type[k] = 3;
                            k++;
                        }

                        // 4
                        // [분류 검색]
                        await driver.findElement(By.id('select')).sendKeys('송달');

                        // [분류 선택 버튼]
                        let btnDelivery = await driver.findElements(By.xpath('//*[@class="fr"]'));
                        await btnDelivery[0].click();

                        // [진행내용 긁어오기]
                        let progress4 = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));

                        for (let i = 0; i < progress4.length / 4; i++) {
                            inputData.progress.date[k] = await progress4[i * 4].getText();
                            inputData.progress.content[k] = await progress4[(i * 4) + 1].getText();
                            inputData.progress.result[k] = await progress4[(i * 4) + 2].getText();
                            inputData.progress.disclosure[k] = await progress4[(i * 4) + 3].getText();
                            inputData.progress.type[k] = 4;
                            k++;
                        }

                        //팝업윈도우 종료 및 메인 윈도우
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
        data = false;
        return data;
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
            console.log('111');
            resolve(body.result);
        })
    })

}

module.exports = {
    sanoCrawler, crawlProgress, crawlTest, testCr
}
