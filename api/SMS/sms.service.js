import pool from '../../config/DatabaseConfig';

import SMSQuery from './sms.query';

export default {
    getSMSInfo: async (userInfo) => {
        const con = await pool.getConnection();

        try {
            const { id } = userInfo;

            const query = SMSQuery.getSMSInfo({ id });

            const [[result]] = await con.query(query);

            return {
                phoneNumber: result.phonenum,
            };
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    },
};
