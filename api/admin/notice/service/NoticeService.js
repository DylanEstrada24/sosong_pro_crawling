const pool = require('../../../config/DbPool');

module.exports = {
    insertNotice: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'INSERT INTO notice (title, content, createAt, updateAt) VALUES (?, ?, ?, ?)';
            const params = [inputData.title, inputData.content, inputData.createAt, inputData.updateAt]
            const query = await conn.query(sql, params);

            await conn.commit();
            return query[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getNotice: async () => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM notice';
            const query = await conn.query(sql);

            await conn.commit();
            return query[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getNoticeByNoticeIdx: async (noticeIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM notice WHERE idx =?';
            const params = [noticeIdx];
            const query = await conn.query(sql, params);

            await conn.commit();
            return query[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },getNoticeByType : async (type) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM notice WHERE type =?';
            const params = [type];
            const query = await conn.query(sql, params);

            await conn.commit();
            return query[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },
    updateNotice: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE notice SET title =?, content =?, createAt=? WHERE idx =?';
            const params = [inputData.title, inputData.content, inputData.createAt, inputData.noticeIdx];
            const query = await conn.query(sql, params);

            await conn.commit();
            return query[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, deleteNotice: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'DELETE FROM notice WHERE idx = ?';
            const params = [inputData.noticeIdx];
            const query = await conn.query(sql, params);

            await conn.commit();
            return query[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },
}
