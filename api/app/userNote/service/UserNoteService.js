const pool = require('../../../config/DbPool');

module.exports = {
    getCaseUserNoteByUserIdxAndCaseIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM userNote WHERE user_idx=? AND userCase_idx=?';
            const param = [inputData.userIdx, inputData.caseIdx];
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
    }, insertUserNoteInCase: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'INSERT INTO userNote (title, updateAt, content, settingAt, user_idx, userCase_idx) VALUES (?, ?, ?, ?, ?, ?)'
            const param = [inputData.title, inputData.updateAt, inputData.content, inputData.settingAt, inputData.userIdx, inputData.caseIdx];
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
    }, getUserCaseByUserIdx : async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM userCase WHERE user_idx=?';
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
    }, getCaseNoteByUserIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM userNote WHERE user_idx=? ORDER BY settingAt';
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
    }, getCaseNoteByDate: async (inputData) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const sql = 'SELECT * FROM userNote WHERE user_idx=? AND date(updateAt) =? ORDER BY settingAt';
        const param = [inputData.userIdx, inputData.updateAt];
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
}
