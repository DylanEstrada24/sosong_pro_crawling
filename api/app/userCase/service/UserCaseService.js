const pool = require('../../../config/DbPool');

module.exports = {
    getCourtCaseByCaseNumber: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT idx FROM courtCase WHERE caseNumber=?';
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
    }, insertCourtCase: async (courtCase, caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "INSERT INTO courtCase (court, caseNumber,caseName, name, judiciary, receiptAt, mergeClassification, fee, finalResult) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const param = [courtCase.court, caseNumber, courtCase.caseName, courtCase.name, courtCase.judiciary
                , courtCase.receiptAt, courtCase.mergeClassification, courtCase.fee, courtCase.finalResult];

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
            const params = [inputData.title, inputData.userIdx, inputData.caseNumber];
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
    }, getUserCaseByUserIdxDesc: async (userIdx) => {
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

            const sql = 'SELECT * FROM userCase WHERE user_idx = ? AND courtCase_caseNumber =?;'
            const params = [inputData.userIdx, inputData.caseNumber]

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

            const sql = "SELECT userCase.idx as caseIdx, title, IF(userCase.favorite, 'true', 'false') as favorite, court, caseNumber, caseName, judiciary, receiptAt, mergeClassification, fee, finalResult " +
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

            const sql = 'SELECT userCase.idx as caseIdx, title, court, caseNumber, caseName, judiciary, receiptAt, mergeClassification, fee, finalResult ' +
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
    }, getUserCaseByCaseIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT userCase.idx as caseIdx, IF(userCase.favorite, 'true', 'false') as favorite, title, court, caseNumber, caseName, judiciary, receiptAt, mergeClassification, fee, finalResult " +
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
    },

    // title 기준
    getCaseByUserIdxByTitleASC: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT userCase.idx as caseIdx, title, IF(userCase.favorite, 'true', 'false') as favorite, court, caseNumber, caseName, judiciary, receiptAt, mergeClassification, fee, finalResult " +
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

        const sql = 'SELECT userCase.idx as caseIdx, title, court, caseNumber, caseName, judiciary, receiptAt, mergeClassification, fee, finalResult ' +
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
},

    getCaseByUserIdxByTodoDESC: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT userCase.idx as caseIdx, userCase.title, court, caseNumber, caseName, judiciary, receiptAt, mergeClassification, fee, finalResult, settingAt ' +
                'FROM userCase join courtCase on userCase.courtCase_caseNumber = courtCase.caseNumber left join userTodo on userCase.idx = userTodo.userCase_idx ' +
                'where userCase.user_idx = 4 group by caseIdx order by settingAt DESC limit ' + conn.escape(inputData.page * 10) + ', ' + conn.escape(10) + ';';

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
    }, getCaseProgressByDate: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            //const sql = 'SELECT title, date, content, caseProgress.courtCase_caseNumber, type FROM caseProgress join userCase on caseProgress.courtCase_caseNumber = userCase.courtCase_caseNumber and date(date) = ? and user_idx= ?;';
            const sql = 'SELECT title, date, content, caseProgress.courtCase_caseNumber, type, courtCase.court ' +
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

            const sql = 'select * from userCase join caseProgress on userCase.courtCase_caseNumber = caseProgress.courtCase_caseNumber where user_idx = ? and caseProgress.type=?;'
            const param = [inputData.userIdx, inputData.type];
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
    }
}
