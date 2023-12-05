export const userModel = {
    findAll: `
        SELECT
            id,
            username,
            staff,
            role,
            is_active
        FROM
            users
        ORDER BY
            username
        LIMIT
            $1 OFFSET $2
    `,
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
    `,
    restore: `
        UPDATE
            users
        SET
            is_active = true
        WHERE
            id = $1
    `,
    countActive: `
        SELECT
            COUNT(*)
        FROM
            users
        WHERE
            is_active = true
    `,
    countInactive: `
        SELECT
            COUNT(*)
        FROM
            users
        WHERE
            is_active = false
    `,
    updatePassword: `
        UPDATE
            users
        SET
            password = $1
        WHERE
            id = $2
    `
}