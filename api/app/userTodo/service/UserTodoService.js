const pool = require('../../../config/DbPool');

module.exports = {
    getCaseTodoByUserIdxAndCaseIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT idx, title, updateAt, content, settingAt, user_idx, userCase_idx, IF(userTodo.favorite, 'true', 'false') as favorite, " +
                "IF(userTodo.isCheck, 'true', 'false') as isCheck FROM userTodo WHERE user_idx=? AND userCase_idx=?";
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
    },getCaseTodoByTodoIdxAndCaseIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT idx, title, updateAt, content, settingAt, user_idx, userCase_idx, IF(userTodo.favorite, 'true', 'false') as favorite, " +
                "IF(userTodo.isCheck, 'true', 'false') as isCheck FROM userTodo WHERE user_idx=? AND idx=? AND userCase_idx=?";
            const param = [inputData.userIdx, inputData.todoIdx, inputData.caseIdx];
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
    },toggleUserTodoFavorite: async (inputData, favorite) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE userTodo SET favorite=? WHERE idx =? AND userCase_idx=?';
            const param = [favorite, inputData.todoIdx, inputData.caseIdx];
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
    }, toggleUserTodoisCheck : async (inputData, isCheck) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE userTodo SET isCheck=? WHERE idx =? AND userCase_idx=?';
            const param = [isCheck, inputData.todoIdx, inputData.caseIdx];
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
    }, getCaseTodoByUserIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT idx, updateAt, content, settingAt, user_idx, userCase_idx, IF(userTodo.favorite, 'true', 'false') as favorite, IF(userTodo.isCheck, 'true', 'false') as isCheck FROM userTodo WHERE user_idx=?";
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
    }, insertUserTodoInCase: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'INSERT INTO userTodo (title, updateAt, content, settingAt, user_idx, userCase_idx) VALUES (?, ?, ?, ?, ?, ?)'
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
    }, getTodoCaseByTodoDate: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "SELECT idx, title, updateAt, content, settingAt, user_idx, userCase_idx, " +
                "IF(userTodo.favorite, 'true', 'false') as favorite, IF(userTodo.isCheck, 'true', 'false') as isCheck FROM userTodo WHERE user_idx=? and date(updateAt) = ?";
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
    }, deleteUserTodoByTodoIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "DELETE FROM userTodo WHERE idx=? and user_idx=?"
            const param = [inputData.todoIdx, inputData.userIdx];
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
    }, updateUserTodoByTodoIdx: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = "UPDATE userTodo SET content =?, updateAt=? WHERE idx=? and user_idx=?"
            const param = [inputData.content, inputData.updateAt, inputData.todoIdx, inputData.userIdx];
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
