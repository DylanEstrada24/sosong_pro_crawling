const pool = require('../../../config/DbPool');

module.exports = {
    AdminGetUser: async () => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'SELECT idx, email, nickName, name, gender, phoneNumber, status, userType FROM user';
            const query = await conn.query(sql);

            await conn.commit();
            return query[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, AdminUpdateUserStatus: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'UPDATE user SET status =? WHERE idx =?';
            let param = [inputData.status, inputData.userIdx];
            const query = await conn.query(sql, param);

            await conn.commit();
            return query[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },AdminUpdateUserType: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'UPDATE user SET userType =? WHERE idx =?';
            let param = [inputData.userType, inputData.userIdx];
            const query = await conn.query(sql, param);

            await conn.commit();
            return query[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },

}
