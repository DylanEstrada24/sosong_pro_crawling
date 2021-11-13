const {By} = require("selenium-webdriver");
const Crawler_Service = require("../Crawler_Service.js");
const {fstCharSpace} = require("../../util/util");
module.exports = {
    civilCase: async (driver, inputData) => {
        try {
            let strTmp;
            // [기본내용 긁어오기]
            let basics1 = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/th'));
            console.log("[기본내용 길이] : " + await basics1.length);

            let basics = await driver.findElements(By.xpath('//*[@class="tableVer"]/tbody/tr/td'));
            console.log("[기본내용 길이] : " + await basics.length);

            for (let i=0; i< basics.length; i++){
                console.log(await basics1[i].getText() + "-" + await basics[i].getText());
            }

            // 공백 제거

            //judiciary
            strTmp = await basics[0].getText();
            strTmp = await fstCharSpace(strTmp);
            inputData.courtCase.caseNumber = await strTmp;
            strTmp = await strTmp.replace(new RegExp("[(0-9)]", "gi"), "")


            await Crawler_Service.getCaseType(strTmp).then(async (result) => {
                inputData.courtCase.case_type = await result[0].case_type
            })

            strTmp = await basics[1].getText();
            inputData.courtCase.caseName = await fstCharSpace(strTmp);

            strTmp = await basics[2].getText();
            inputData.courtCase.plaintiff = await fstCharSpace(strTmp);

            strTmp = await basics[3].getText();
            inputData.courtCase.defendant = await fstCharSpace(strTmp);

            strTmp = await basics[4].getText();
            inputData.courtCase.judiciary = await fstCharSpace(strTmp);

            strTmp = await basics[5].getText();
            inputData.courtCase.receiptAt = await fstCharSpace(strTmp);

            strTmp = await basics[10].getText();
            inputData.courtCase.mergeClassification = await fstCharSpace(strTmp);

            strTmp = await basics[14].getText();
            inputData.courtCase.fee = await fstCharSpace(strTmp);

            return somthing;
        } catch (err) {
            console.log(err);
            return err;
        } finally {

        }
    },
    civilCasePatentAndAdministration: async (a) => {
        try {

            let somthing = 2;

            return somthing;
        } catch (err) {
            console.log(err);
            return err;
        } finally {

        }
    },
    civilCaseEnded: async (a) => {
        try {

            let somthing = 2;

            return somthing;
        } catch (err) {
            console.log(err);
            return err;
        } finally {

        }
    },
    civilCaseSupremeCourt: async (a) => {
        try {

            let somthing = 2;

            return somthing;
        } catch (err) {
            console.log(err);
            return err;
        } finally {

        }
    },
}
