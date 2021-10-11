const pool = require('../../config/DbPool');

module.exports = {
    getCourtCaseByCaseNumb: async () => {
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
    },
}
