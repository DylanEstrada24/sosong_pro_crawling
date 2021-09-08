const pool = require('../../config/DbPool');

module.exports = {
     selectUser: async (time) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'SELECT * FROM user WHERE pushSetting =?';
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
    },
}
