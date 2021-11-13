const pool = require('../../../config/DbPool');

module.exports = {
    getCourtCaseByCaseNumber: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM courtCase WHERE caseNumber=?';
            const param = [inputData.caseNumber];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },insertCourtCase_new: async (inputData, courtData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "INSERT INTO courtCase (court, caseNumber, name, caseName, content) VALUES (?, ?, ?, ?, ?)";
            const param = [inputData.court, inputData.caseNumber, inputData.name, courtData.courtCase.caseName, inputData.content];
            const ins = await conn.query(sql, param);

            let progress = courtData.progress;

            if(progress.date.length > 0){
            const sql2 = "INSERT INTO caseProgress (date, content, result, disclosure, courtCase_caseNumber, isUpdate) VALUES ?;";
            let params = [];
            for (let i = 0; i < progress.date.length; i++) {
                params.push([progress.date[i], progress.content[i], progress.result[i], progress.disclosure[i], inputData.caseNumber, true]);
            }
            const ins2 = await conn.query(sql2, [params]);
            }

            let representative = courtData.representative;

            if(representative.name.length > 0){
                const sql_rep = "INSERT INTO representative (classification, name, courtCase_caseNumber) VALUES ?;";
                let params_rep = [];
                for (let i = 0; i < representative.classification.length; i++) {
                    params_rep.push([representative.classification[i], representative.name[i], inputData.caseNumber]);
                }
                const query_rep = await conn.query(sql_rep, [params_rep]);
            }

            let party = courtData.party;

            if(party.name.length > 0){
                const sql_pt = "INSERT INTO party (classification, name, fresult, courtCase_caseNumber) VALUES ?;";
                let params_pt = [];
                for (let i = 0; i < party.classification.length; i++) {
                    params_pt.push([party.classification[i], party.name[i], party.fresult[i], inputData.caseNumber]);
                }
                const ins = await conn.query(sql_pt, [params_pt]);
            }

            const sql3 = "INSERT INTO userCase (title, user_idx, courtCase_caseNumber) VALUES (?, ?, ?)";
            const params3 = [inputData.caseNumber, inputData.userIdx, inputData.caseNumber];
            const ins3 = await conn.query(sql3, params3);

            await conn.commit();
            return ins[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, insertCourtCase: async (courtCase, caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "INSERT INTO courtCase (court, caseNumber,caseName, name, judiciary, plaintiff, defendant, receiptAt, mergeClassification, fee, finalResult, case_type) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const param = [courtCase.court, caseNumber, courtCase.caseName, courtCase.name, courtCase.judiciary, courtCase.plaintiff, courtCase.defendant
                , courtCase.receiptAt, courtCase.mergeClassification, courtCase.fee, courtCase.finalResult, courtCase.case_type];

            const ins = await conn.query(sql, param);

            await conn.commit();
            return ins[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, insertParty: async (party, caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "INSERT INTO party (classification, name, fresult, courtCase_caseNumber) VALUES ?;";
            let params = [];
            for (let i = 0; i < party.classification.length; i++) {
                params.push([party.classification[i], party.name[i], party.fresult[i], caseNumber]);
            }
            const ins = await conn.query(sql, [params]);

            await conn.commit();
            return ins[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, insertRepresentative: async (representative, caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "INSERT INTO representative (classification, name, courtCase_caseNumber) VALUES ?;";
            let params = [];
            for (let i = 0; i < representative.classification.length; i++) {
                params.push([representative.classification[i], representative.name[i], caseNumber]);
            }
            const query = await conn.query(sql, [params]);


            await conn.commit();
            return query[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },/* SelectCaseProgressByCaseNumber : async (caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT * FROM caseprogress where courtCase_caseNumber = ?";
            let params = [caseNumber];

            const query = await conn.query(sql, [params]);

            await conn.commit();
            return query[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, */insertCaseProgress: async (progress, caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "INSERT INTO caseProgress (date, content, result, disclosure, courtCase_caseNumber, isUpdate, type) VALUES ?;";
            let params = [];
            for (let i = 0; i < progress.date.length; i++) {
                params.push([progress.date[i], progress.content[i], progress.result[i], progress.disclosure[i], caseNumber, true, progress.type[i]]);
                // console.log(progress.type[i]);
            }
            const ins = await conn.query(sql, [params]);

            await conn.commit();
            return ins[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, insertUserCase: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "INSERT INTO userCase (title, user_idx, courtCase_caseNumber) VALUES (?, ?, ?)";
            const params = [inputData.caseNumber, inputData.userIdx, inputData.caseNumber];
            const ins = await conn.query(sql, params);

            await conn.commit();
            return ins[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getUserCaseByUserIdxAsc: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT userCase.idx as caseIdx, title, court, caseNumber, caseName, judiciary, receiptAt, mergeClassification, fee, finalResult ' +
                'FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber where user_idx = ? ORDER BY receiptAt ASC limit ' +
                conn.escape(inputData.page * 10) + ', ' + conn.escape(10);
            const param = [inputData.userIdx];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getUserCase: async (userIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT idx FROM userCase WHERE user_idx=?'
            const param = [userIdx];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },getUserCaseByUserIdxDesc: async (userIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT userCase.idx as caseIdx, title, court, caseNumber, caseName, judiciary, receiptAt, mergeClassification, fee, finalResult ' +
                'FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber where user_idx = ? ORDER BY receiptAt DESC limit 10;';
            const param = [userIdx];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },
    getCaseByUserIdxAndCaseNumber: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM userCase WHERE user_idx = ? AND courtCase_caseNumber =?;';
            const params = [inputData.userIdx, inputData.caseNumber, inputData.court];

            let query = await conn.query(sql, params);

            await conn.commit();
            return query;
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getCaseByUserIdxASC: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT userCase.idx as caseIdx, title, IF(userCase.favorite, 'true', 'false') as favorite, court, caseNumber, name, content " +
                "FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber where user_idx = ? " +
                "ORDER BY courtCase.receiptAt ASC limit " + conn.escape(inputData.page * 10) + ", " + conn.escape(10) + ";";

            const params = [inputData.userIdx];

            const query = await conn.query(sql, params);

            const party_sql = 'SELECT party.classification, party.name, party.courtCase_caseNumber as caseNumber ' +
                'FROM party join userCase on userCase.courtCase_caseNumber = party.courtCase_caseNumber where userCase.user_idx = ?;'
            const party_query = await conn.query(party_sql, params);

            const representative_sql = 'SELECT representative.classification, representative.name, representative.courtCase_caseNumber as caseNumber ' +
                'FROM representative join userCase on userCase.courtCase_caseNumber = representative.courtCase_caseNumber where userCase.user_idx = ?;'
            const representative_query = await conn.query(representative_sql, params);

            let result = [];
            result.push(query[0]);
            result.push(party_query[0]);
            result.push(representative_query[0]);

            await conn.commit();
            return result;
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getCaseByUserIdxDESC: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT userCase.idx as caseIdx, title, IF(userCase.favorite, \'true\', \'false\') as favorite, court, caseNumber, name, content ' +
                'FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber where user_idx = ? ' +
                'ORDER BY courtCase.receiptAt DESC limit ' + conn.escape(inputData.page * 10) + ', ' + conn.escape(10) + ';';

            const params = [inputData.userIdx];

            const query = await conn.query(sql, params);

            const party_sql = 'SELECT party.classification, party.name, party.courtCase_caseNumber as caseNumber ' +
                'FROM party join userCase on userCase.courtCase_caseNumber = party.courtCase_caseNumber where userCase.user_idx = ?;'
            const party_query = await conn.query(party_sql, params);

            const representative_sql = 'SELECT representative.classification, representative.name, representative.courtCase_caseNumber as caseNumber ' +
                'FROM representative join userCase on userCase.courtCase_caseNumber = representative.courtCase_caseNumber where userCase.user_idx = ?;'
            const representative_query = await conn.query(representative_sql, params);

            let result = [];
            result.push(query[0]);
            result.push(party_query[0]);
            result.push(representative_query[0]);

            await conn.commit();
            return result;
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getUserCaseByCaseNumber: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT idx from userCase WHERE courtCase_caseNumber =? AND user_idx=?";
            const param = [inputData.caseNumber, inputData.userIdx];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getUserCaseByCaseIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT userCase.idx as caseIdx, title, IF(userCase.favorite, 'true', 'false') as favorite, court, caseNumber, name, content " +
                "from userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber where userCase.idx = ?;";
            const param = [inputData];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getUserCaseByCaseIdx_new: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT * from userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber where userCase.idx = ?;";
            const param = [inputData];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },
    getUserCase_new: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT * from userCase where user_idx = ?;";
            const param = [inputData];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },

    // title 기준
    getCaseByUserIdxByTitleASC: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT userCase.idx as caseIdx, title, IF(userCase.favorite, 'true', 'false') as favorite, court, caseNumber, name, content " +
                "FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber where user_idx = ? " +
                "ORDER BY userCase.title ASC limit " + conn.escape(inputData.page * 10) + ", " + conn.escape(10) + ";";

            const params = [inputData.userIdx];

            const query = await conn.query(sql, params);

            const party_sql = 'SELECT party.classification, party.name, party.courtCase_caseNumber as caseNumber ' +
                'FROM party join userCase on userCase.courtCase_caseNumber = party.courtCase_caseNumber where userCase.user_idx = ?;'
            const party_query = await conn.query(party_sql, params);

            const representative_sql = 'SELECT representative.classification, representative.name, representative.courtCase_caseNumber as caseNumber ' +
                'FROM representative join userCase on userCase.courtCase_caseNumber = representative.courtCase_caseNumber where userCase.user_idx = ?;'
            const representative_query = await conn.query(representative_sql, params);

            let result = [];
            result.push(query[0]);
            result.push(party_query[0]);
            result.push(representative_query[0]);

            await conn.commit();
            return result;
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },

    getCaseByUserIdxByTitleDESC: async (inputData) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const sql = 'SELECT userCase.idx as caseIdx, title, court, caseNumber, name, content ' +
            'FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber where user_idx = ? ' +
            'ORDER BY userCase.title DESC limit ' + conn.escape(inputData.page * 10) + ', ' + conn.escape(10) + ';';

        const params = [inputData.userIdx];

        const query = await conn.query(sql, params);

        const party_sql = 'SELECT party.classification, party.name, party.courtCase_caseNumber as caseNumber ' +
            'FROM party join userCase on userCase.courtCase_caseNumber = party.courtCase_caseNumber where userCase.user_idx = ?;'
        const party_query = await conn.query(party_sql, params);

        const representative_sql = 'SELECT representative.classification, representative.name, representative.courtCase_caseNumber as caseNumber ' +
            'FROM representative join userCase on userCase.courtCase_caseNumber = representative.courtCase_caseNumber where userCase.user_idx = ?;'
        const representative_query = await conn.query(representative_sql, params);

        let result = [];
        result.push(query[0]);
        result.push(party_query[0]);
        result.push(representative_query[0]);

        await conn.commit();
        return result;
    } catch (err) {
        console.log(err);
        await conn.rollback() // 롤백
        return err;
    } finally {
        conn.release();
    }
}, getCaseByUserIdxByUserCaseIdxASC: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT userCase.idx as caseIdx, title, court, IF(userCase.favorite, 'true', 'false') as favorite, courtCase_CaseNumber as caseNumber " +
                "from userCase JOIN courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber " +
                "where user_idx = ? order by caseIdx ASC limit " + conn.escape(inputData.page * 10) + ', ' + conn.escape(10) + ';';

            const params = [inputData.userIdx];

            const query = await conn.query(sql, params);

            const party_sql = 'SELECT party.classification, party.name, party.courtCase_caseNumber as caseNumber ' +
                'FROM party join userCase on userCase.courtCase_caseNumber = party.courtCase_caseNumber where userCase.user_idx = ?;'
            const party_query = await conn.query(party_sql, params);

            const representative_sql = 'SELECT representative.classification, representative.name, representative.courtCase_caseNumber as caseNumber ' +
                'FROM representative join userCase on userCase.courtCase_caseNumber = representative.courtCase_caseNumber where userCase.user_idx = ?;'
            const representative_query = await conn.query(representative_sql, params);


            let result = [];
            result.push(query[0]);
            result.push(party_query[0]);
            result.push(representative_query[0]);

            await conn.commit();
            return result;
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },

    getCaseByUserIdxByTodoDESC: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT userCase.idx as caseIdx, userCase.title, court, caseNumber, name, userTodo.content as content, settingAt ' +
                'FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber join userTodo on userCase.idx = userTodo.userCase_idx ' +
                'where userCase.user_idx = ? order by settingAt DESC limit ' + conn.escape(inputData.page * 10) + ', ' + conn.escape(10) + ';';

            /*
            * SELECT userCase.idx as caseIdx, userCase.title, court, caseNumber, name, userTodo.content as content, settingAt
                FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber join userTodo on userCase.idx = userTodo.userCase_idx
                where userCase.user_idx = 39 AND DATE(settingAt) >= Date(now()) order by settingAt DESC limit 0, 10 ;

              SELECT userCase.idx as caseIdx, userCase.title, court, caseNumber, name, userTodo.content as content, settingAt
                FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber join userTodo on userCase.idx = userTodo.userCase_idx
                where userCase.user_idx = 39 AND DATE(settingAt) < Date(now()) order by settingAt ASC limit 0, 10 ;
            * */ // ...... yh 11-10 수정중

            const params = [inputData.userIdx];

            const query = await conn.query(sql, params);

            const party_sql = 'SELECT party.classification, party.name, party.courtCase_caseNumber as caseNumber ' +
                'FROM party join userCase on userCase.courtCase_caseNumber = party.courtCase_caseNumber where userCase.user_idx = ?;'
            const party_query = await conn.query(party_sql, params);

            const representative_sql = 'SELECT representative.classification, representative.name, representative.courtCase_caseNumber as caseNumber ' +
                'FROM representative join userCase on userCase.courtCase_caseNumber = representative.courtCase_caseNumber where userCase.user_idx = ?;'
            const representative_query = await conn.query(representative_sql, params);


            let result = [];
            result.push(query[0]);
            result.push(party_query[0]);
            result.push(representative_query[0]);

            await conn.commit();
            return result;
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },

    toggleUserCaseFavorite: async (caseIdx, favorite) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE userCase SET favorite=? WHERE idx =?';
            const param = [favorite, caseIdx];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },
    getCaseProgressByCaseNumber: async (caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM caseProgress WHERE courtCase_caseNumber=?';
            const param = [caseNumber];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },getCaseProgressByCaseNumberLast: async (caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'select * from caseProgress Where courtCase_caseNumber = ? order by date desc limit 1; ';
            const param = [caseNumber];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getCaseProgressByCaseNumberByIsUpdateTrue: async (userIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();


            const sql = 'SELECT userCase.user_idx as userIdx, court, caseNumber, name, title, caseProgress.content as content FROM caseProgress join courtCase on caseProgress.courtCase_caseNumber = courtCase.caseNumber join userCase on caseProgress.courtCase_caseNumber = userCase.courtCase_caseNumber where isUpdate = true AND userCase.user_idx = ?;';
            const param = [userIdx];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getCaseProgressByDate: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            //const sql = 'SELECT title, date, content, caseProgress.courtCase_caseNumber, type FROM caseProgress join userCase on caseProgress.courtCase_caseNumber = userCase.courtCase_caseNumber and date(date) = ? and user_idx= ?;';
            const sql = 'SELECT title, date, caseProgress.content as content, caseProgress.courtCase_caseNumber, type, courtCase.court ' +
                'FROM caseProgress join userCase on caseProgress.courtCase_caseNumber = userCase.courtCase_caseNumber ' +
                'join courtCase on caseProgress.courtCase_caseNumber = userCase.courtCase_caseNumber and courtCase.caseNumber = userCase.courtCase_caseNumber ' +
                'and date(date) = ? and user_idx= ?;';
            const param = [inputData.date, inputData.userIdx];
            const sel = await conn.query(sql, param);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getCaseProgressByType: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = `select * from userCase join caseProgress on userCase.courtCase_caseNumber = caseProgress.courtCase_caseNumber where userCase.user_idx = ? AND caseProgress.content LIKE '%기일%' AND caseProgress.content LIKE '%:%' AND DATE(caseProgress.date) >= DATE(NOW()) order by caseProgress.date ASC;`;
            const param = [inputData.userIdx];
            const sel = await conn.query(sql, param);

            const sql2 = `select * from userCase join caseProgress on userCase.courtCase_caseNumber = caseProgress.courtCase_caseNumber where userCase.user_idx = ? AND caseProgress.content LIKE '%기일%' AND caseProgress.content LIKE '%:%' AND DATE(caseProgress.date) < DATE(NOW()) order by caseProgress.date DESC;`;
            const param2 = [inputData.userIdx];
            const sel2 = await conn.query(sql2, param2);

            await conn.commit();



            return Object.assign(sel[0], sel2[0]);
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, updateUserCaseTitle: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE userCase SET title=? WHERE idx=? AND user_idx=?'
            const params = [inputData.title ,inputData.caseIdx, inputData.userIdx];
            const sel = await conn.query(sql, params);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, deleteUserCaseByCaseIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'DELETE FROM userCase WHERE idx =? and user_idx =?';
            const params = [inputData.caseIdx, inputData.userIdx];
            const sel = await conn.query(sql, params);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getUserName: async (userIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT name FROM user WHERE idx = ?';
            const params = [userIdx];
            const sel = await conn.query(sql, params);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },
}
