const pool = require('../../../config/DbPool');

module.exports = {
    getBoard: async () => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM board';
            const sel = await conn.query(sql);

            await conn.commit();
            return sel[0];
        } catch (err) {
            console.log(err);
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, getCommentByBoardIdx: async (boardIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM comment WHERE board_idx = ?';
            const params = [boardIdx];
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
    }, insertBoard: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'INSERT INTO board (title, content, createAt, updateAt, user_idx) VALUE (?, ?, ?, ?, ?)'
            const params = [inputData.title, inputData.content, inputData.createAt, inputData.createAt, inputData.userIdx ];
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
    }, updateBoard: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE board SET title=?, content=?, updateAt=? WHERE idx=? and user_idx=?'
            const params = [inputData.title, inputData.content, inputData.date, inputData.boardIdx, inputData.userIdx];
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
    }, deleteBoard: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'DELETE FROM board WHERE idx=? and user_idx=?'
            const params = [inputData.boardIdx, inputData.userIdx];
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
    }, insertComment: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'INSERT INTO comment (content, createAt, updateAt, board_idx, user_idx) VALUE (?, ?, ?, ?, ?)'
            const params = [inputData.content, inputData.createAt, inputData.createAt, inputData.boardIdx, inputData.userIdx ];
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
    }, deleteComment: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'DELETE FROM comment WHERE board_idx=? and idx=? and user_idx=?'
            const params = [inputData.boardIdx, inputData.commentIdx, inputData.userIdx ];
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
    }, updateComment: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE comment SET content=? WHERE board_idx=? and idx=? and user_idx=?'
            const params = [inputData.content, inputData.boardIdx, inputData.commentIdx, inputData.userIdx ];
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