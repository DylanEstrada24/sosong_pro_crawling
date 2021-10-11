const pool = require('../../../config/DbPool');

module.exports = {
    getNotice: async () => {
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
    }
}
