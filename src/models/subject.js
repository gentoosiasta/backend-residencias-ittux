export const subjectModel = {
    findAll: `
        SELECT
            id,
            subject,
            career,
            program
        FROM
            subjects
        ORDER BY
            program, career, subject
        LIMIT
            $1 OFFSET $2
    `,
    findById: `
        SELECT
            id,
            subject,
            career,
            program
        FROM
            subjects
        WHERE
            id = $1
        ORDER BY
            program, career, subject
    `,
    findByProgram: `
        SELECT
            id,
            subject,
            career,
            program
        FROM
            subjects
        WHERE
            program = $1
        ORDER BY
            career, subject
        LIMIT
            $2 OFFSET $3
    `,
    findByCareer: `
        SELECT
            id,
            subject,
            career,
            program
        FROM
            subjects
        WHERE
            career = $1
        ORDER BY
            program, subject
        LIMIT
            $2 OFFSET $3
    `,
    findBySubject: `
        SELECT
            id,
            subject,
            career,
            program
        FROM
            subjects
        WHERE
            subject = $1
        ORDER BY
            program, career
        LIMIT
            $2 OFFSET $3
    `,
    findDuplicates: `
        SELECT
            subject,
            career,
            program
        FROM
            subjects
        WHERE
            subject = $1
            AND
            career = $2
            AND
            program = $3
    `,
    count: `
        SELECT
            COUNT(*)
        FROM
            subjects
    `,
    countByProgram: `
        SELECT
            COUNT(*)
        FROM
            subjects
        WHERE
            program = $1
    `,
    countByCareer: `
        SELECT
            COUNT(*)
        FROM
            subjects
        WHERE
            career = $1
    `,
    countBySubject: `
        SELECT
            COUNT(*)
        FROM
            subjects
        WHERE
            subject = $1
    `,
    create: `
        INSERT INTO
            subjects
            (subject, career, program)
        VALUES
            ($1, $2, $3)
    `,
    update: `
        UPDATE
            subjects
        SET
            subject = $1,
            career = $2,
            program = $3
        WHERE
            id = $4
    `,
}