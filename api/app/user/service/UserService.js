const pool = require('../../../config/DbPool');

module.exports = {
    getUserInfoByUserIdx: async (userIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT email, nickName, name, gender, phoneNumber, status, pushSetting, joinAt, maxCase FROM user WHERE idx=?';
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
    }, updateUserAlarmSetting: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE user SET pushSetting=? WHERE idx =?'
            const params = [inputData.time, inputData.userIdx];
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
