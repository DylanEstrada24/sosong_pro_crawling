const pool = require('../../config/DbPool');

module.exports = {
    selectCourtCase: async () => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'SELECT court, caseNumber, name FROM courtCase';
            const sel = await conn.query(sql);

            await conn.commit();
            return sel[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, selectCourtCaseProgress: async (caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'SELECT content FROM caseProgress WHERE courtCase_caseNumber=?';
            let params = [caseNumber]
            const sel = await conn.query(sql, params);

            await conn.commit();
            return sel[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, insertPogress: async (progress, caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "INSERT INTO caseProgress (date, content, result, disclosure, isUpdate, courtCase_caseNumber, type) VALUES ?;";
            let params = [];

            for (let i = 0; i < progress.date.length; i++) {
                params.push([progress.date[i], progress.content[i], progress.result[i], progress.disclosure[i] , 1 ,caseNumber, progress.type[i]]);
            }
            const ins = await conn.query(sql, [params]);

            await conn.commit();
            return ins[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, selectUser: async (time) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'SELECT * FROM user WHERE hour(pushSetting) =?';
            let params = [time];
            const sel = await conn.query(sql, params);

            await conn.commit();
            return sel[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getUserCaseNumberByUserIdx: async (userIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'SELECT count(*) as count FROM caseProgress WHERE courtCase_caseNumber = any (SELECT courtCase_caseNumber FROM userCase WHERE user_idx = ?) AND isUpdate = 1;';
            let params = [userIdx];
            const sel = await conn.query(sql, params);

            await conn.commit();
            return sel[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },
}
