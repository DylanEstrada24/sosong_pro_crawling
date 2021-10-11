const pool = require('../../config/DbPool');

module.exports = {
    checkCourtCase: async (caseNumber) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT idx FROM courtCase WHERE caseNumber=?';
            const param = [caseNumber];
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
