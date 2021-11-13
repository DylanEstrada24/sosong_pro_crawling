async function fstCharSpace(strTmp) {
    return new Promise(function (resolve) {

        if (strTmp.substr(0, 1) === " ") {
            strTmp = strTmp.substr(1, strTmp.length);
            resolve(strTmp);
        }
        resolve(strTmp);
    })
}

module.exports = {
    fstCharSpace
}
