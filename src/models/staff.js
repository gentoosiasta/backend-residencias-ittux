const staffModel = {
    findById: `
        SELECT
            id,
            name,
            lastname,
            rfc,
            curp,
            department,
            is_active
        FROM
            staff
        WHERE
            id = $1
    `,
    findByRfc: `
        SELECT
            id,
            name,
            lastname,
            rfc,
            curp,
            department,
            is_active
        FROM
            staff
        WHERE
            rfc = $1
    `,
    create: `
        INSERT INTO
            staff (
                name,
                lastname,
                rfc,
                curp,
                department,
                is_active
            )
        VALUES
            ($1, $2, $3, $4, $5, $6)
    `,
    update: `
        UPDATE
            staff
        SET
            name = $1,
            lastname = $2,
            rfc = $3,
            curp = $4,
            department = $5
        WHERE
            id = $6
    `,
    delete: `
        UPDATE
            staff
        SET
            is_active = false
    `
}