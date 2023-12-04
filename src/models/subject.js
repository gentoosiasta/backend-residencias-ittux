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