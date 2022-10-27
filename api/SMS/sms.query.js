export default {
    getSMSInfo: (userInfo) => {
        const { id, username } = userInfo;

        return `
            SELECT
                    phonenum
            FROM
                    user
            WHERE
                    login_id = '${id}' OR
                    user_name = '${username}';
        `;
    },
};
