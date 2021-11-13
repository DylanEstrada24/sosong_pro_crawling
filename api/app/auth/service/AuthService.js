const pool = require('../../../config/DbPool');

module.exports = {
    AuthSignIn1: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM user WHERE email=?';
            const param = [inputData.email];
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
    AuthSignIn: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

             const sql = 'SELECT * FROM user WHERE email=?';
             const param = [inputData.email];
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
    }, AuthSignInUpdateFbToken: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE user SET fbToken = ? WHERE email =?'
            const param = [inputData.fbToken, inputData.email];
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
    }, AuthSignUp: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            let date = new Date();

            const sql = 'INSERT INTO user(email, password, name, gender, phoneNumber, userType, status, pushSetting, joinAt, modifyAt, maxCase) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
            const param = [inputData.email, inputData.password, inputData.name, inputData.gender, inputData.phoneNumber, 'common', 'request', '08:00', date, date, 30];
            const ins = await conn.query(sql, param);

            await conn.commit();
            return ins[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, AuthWithdrawal: async (userIdx) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'DELETE FROM user WHERE idx =?;';
            const param = [userIdx];
            const ins = await conn.query(sql, param);

            await conn.commit();
            return ins[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }, AuthUpdate: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE user SET gender=?, phoneNumber=?, nickName=? WHERE idx =?;';
            const param = [inputData.gender, inputData.phoneNumber, inputData.nickName ,inputData.userIdx];
            const ins = await conn.query(sql, param);

            await conn.commit();
            return ins[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },AuthUserCheck: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT * FROM user WHERE idx=?';
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
    },AuthUpdatePassword: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'UPDATE user SET password=? WHERE idx=?;';
            const param = [inputData.newPassword, inputData.userIdx];
            const ins = await conn.query(sql, param);

            await conn.commit();
            return ins[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    },findUserFromEmail: async (inputData) => {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            const sql = 'SELECT idx FROM user WHERE email=?;';
            const param = [inputData.userEmail];
            const ins = await conn.query(sql, param);

            await conn.commit();
            return ins[0];
        } catch (err) {
            await conn.rollback() // 롤백
            return err;
        } finally {
            conn.release();
        }
    }
}
