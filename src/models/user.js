export const userModel = {
    findByUsername: `
        SELECT
            id,
            username,
            password,
            staff,
            role,
            is_active
        FROM
            users
        WHERE
            username = $1
    `,
    findById: `
        SELECT
            id,
            username,
            password,
            staff,
            role,
            is_active
        FROM
            users
        WHERE
            id = $1
    `,
    create: `
        INSERT INTO
            users
            (username, password, staff, role, is_active)
        VALUES
            ($1, $2, $3, $4, $5)
    `,
    update: `
        UPDATE
            users
        SET
            username = $1,
            password = $2,
            staff = $3,
            role = $4
        WHERE
            id = $5
    `,
    delete: `
        UPDATE
            users
        SET
            is_active = false
        WHERE
            id = $1
    `
}