const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');           //크롬 사용시
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.addArguments("--single-process");
chromeOptions.addArguments("--disable-dev-shm-usage");

const path = require('path');


async function sanoCrawler(court, caseNumber, name){

    const url = 'http://localhost:8883/api/v1/test1';
    //  const url = 'https://safind.scourt.go.kr/sf/mysafind.jsp';

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();

    let inputData = {
        courtCase : {
            court: court,
            name : name,
        },
        progress : {
            date: [],
            content: [],
            result: [],
            disclosure: [],
        },
        party : {
            classification: [],
            name: [],
            fresult: [],
            arrivalAt: [],
            confirmAt: [],
        },
        representative : {
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


        for(let i = 0 ; i < party.length/5; i++){
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

        for(let i = 0 ; i < representative.length/2; i++){
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


        let detail = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));
        // console.log('[detail.length]', detail.length)
        inputData.courtCase.finalResult = await detail[6].getText();

        // console.log('종국결과 : ' + await detail[6].getText());

        // for(let i = 0 ; i < detail.length; i++){
        //     console.log(await detail[i].getText());
        // }

        // [진행내용 긁어오기]
        let progress = await driver.findElements(By.xpath('//*[@class="tableHor"]/tbody/tr/td'));
        // console.log('[progress.length]', progress.length)
        // console.log('        일자                        내용                                        결과                공시문 ')
        for(let i = 0 ; i< progress.length/4; i++) {
            inputData.progress.date[i] = await progress[i * 4].getText();
            inputData.progress.content[i] = await progress[(i * 4) + 1].getText();
            inputData.progress.result[i] = await progress[(i * 4) + 2].getText();
            inputData.progress.disclosure[i] = await progress[(i * 4) + 3].getText();
            // console.log((i + 1) + ' : ' + await progress[i * 4].getText() + await progress[(i * 4) + 1].getText()
            //     + await progress[(i * 4) + 2].getText() + await progress[(i * 4) + 3].getText());

        }

        return inputData;

        // TODO 사건 기본내용 및 진행내용 DB 저장 작업 진행해야합니다.


    } finally {
        await driver.quit();
    }
}

module.exports = {
    sanoCrawler,
}
