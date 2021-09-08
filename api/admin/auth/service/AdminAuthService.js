const pool = require('../../../config/DbPool');

module.exports = {
     adminSignin: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let sql = 'SELECT * FROM admin where email =?';
            let param = [inputData.email];
            const sel = await conn.query(sql, param);

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
