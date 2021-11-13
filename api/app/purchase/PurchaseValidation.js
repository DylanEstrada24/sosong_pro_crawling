const express = require('express');
const router = express.Router();
require('dotenv').config();
const Verifier = require('google-play-billing-validator');

router.get('/v1/purchase/:token', /*validateToken*/ (req, res) => {

    let options = {
        "email" : "sosongproservice@sosongpro-328708.iam.gserviceaccount.com",
	"key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChI6A2PAT29l87\nlUJRR1GXiwMb+8a75+c0k///APcWJimZV4tfMTGi8jlzDwow2NfmghXtR6GHLS14\nY1li32DntAzdnD5781pNp6q0t8bswNA2/jfYER3yjDTQX+IJekfFqx+HbBCN22N5\n83f/xdWK9U7vl5CipuOXefFtEh8Ne3NF5cyO8xNOQobQwhsC5JW8+RobP4CfmSNp\nzg2PXvbN+r9R9B22gEJ8BJly3XeUrYsdTVKKqioqa8Y2Pm7m2b4/s4TdUd2niHi/\njJMaTvxSiJcaOSJ8HpMpY7zPModI/nsyhUJnaVyXTDpRLptltM7vMIm4OG9jHnxh\ndA++Lv3FAgMBAAECggEAB9xEnd3+fFaR2DFPKhxWw6lIEPbOn7lvsENSSaFFgarX\nEiVwsBzRTUp6w3JVyVgL63ESj+p+hmki2UciuTLo16dTOQHnaWVPqnnrQZlfu9+p\noy5yURj//eYu0wWuXCR/I5/Amrr1MW+k3LIj+ycueXK/HkBlkY2fDLNUiSvJCypT\n4HF9Evcj9BQm16Isf+KsTEVhTLFrylVfKTAVqIHOCQdXX3ZqB/ZBRUDeWVyMIJQD\ngRz7jYp6RZXsy9wzzvUdN/wgn8UBtD1z0yqcCS3nZHxFFPiHe6za6V0bxQ21X779\nAwCTyJdoKSAcMjOhcqEZE4SXjziAhldUgdzOt/qCUQKBgQDXZ+FjyBYXHMLpOwgz\nCxiT44XMZ/8495JKYnk5Uij1SVTdEf8mG912IGYiul27mU8xm8ZCjoEUzbQVKHLn\ntzqIm94LP/UphF5OCt3FIXqj58I1TFCK3XAd6naMB2tmLRX+cQ82PJFpf19C03j/\nOMcP/aX/tRf1eCYdNA6QDZfWEQKBgQC/ga+KGWmKVuZCwt5PgMMA/jmVDnKu4dKj\nTjF+dmOWInoCZzY16EZG9kbibshrJ2ty8LjxokV8XO9yt7m8yO3dU7PLPCNS5bMb\nXkBgFT+Th5HW4LzhaG3Gf/setcMhm0FVElGOYRt2DOZodi0PU15l4buDcNxq7eXh\nIkD/Q1+odQKBgQCnT3Cp6EgAO77JGakMvJmihR7v3fdHcESYslQmScK2gvb/n3Ln\nTs19azzpzIfxpur0RWKBX96zIfO2W2ykvpUgdrDJXCw4yy/UvmvzKkXv+ZvHejc1\nJTpogi0CJuEsw+hJcde28OShZOXBKjDZTGiR6xp8u1SYvXIdTMni6iv9gQKBgDJ4\ng0LqH56N+HFv2hcp4DrKxXI7NI5Shaj0WqbxnJ1cyLsJaIgchyj8jwHuIHPdF7xb\nJOLJ2XZFJ/Yb5Z+TdNz3ylKtrsGSN/nmhSDNeMvw1sbCxATD+OpvoEcfsCWTPUym\nX0ge35XlIHQ3cPixCBfhvgGOJQkpWYRT+r1LjFJhAoGAfkXG1b93q5LQ3UHSxlbW\n7UC2t2ITpwRzNsSgXsEozU9pmP7jtRcbBXKe1wiV0UqzlPjmEPjbmVEElaieyN+5\n07BU9SMmkJG6mr2eacS+G/UEoK1bw9RifU/cC8/z5Lz/KYzzklXAHGF3JsTmUJtq\nSmKXzbFz8n/Kx819WMDTjwU=\n-----END PRIVATE KEY-----\n"    
    }

    let receipt = {
        packageName : "com.hidev.sosongpro",
        productId : "com.hidev.sosongpro.ssproplusmembership",
        purchaseToken : req.params.token,
    }

	//purchaseToken : "nkbcdffjefmoeionllpdhpnd.AO-J10zcTTYP2H1d8DCrD-11500nCeugVy2WJt8P83jjTPfmQkVr7a2jNzUcYgaZepxLDFbS_8ot22AlkQ3EEeBYEOAfFr9Fig",
    let verifier = new Verifier(options);

    let promiseData = verifier.verifySub(receipt)

    promiseData.then(function(response) {
        // Yay! Subscription is valid
        // See response structure below
    })
        .then(function(response) {
            console.log(response);
            console.log("성공");
		res.send("success")
            // Here for example you can chain your work if subscription is valid
            // eg. add coins to the user profile, etc
            // If you are new to promises API
            // Awesome docs: https://developers.google.com/web/fundamentals/primers/promises
        })
        .catch(function(error) {
            console.log(error);
            console.log("실패");
		res.send("invalid")
            // Subscription is not valid or API error
            // See possible error messages below
        })

})



module.exports = router;
