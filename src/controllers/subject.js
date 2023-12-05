import { request, response } from "express";
import { validate } from "uuid";
import db from "../configs/db.js";
import {subjectModel} from "../models/subject.js";

export const subjectsList = async (req = request, res = response) => {
    const { limit = 10, offset = 0 } = req.query;

    try {
        const {rows} = await db.query(subjectModel.findAll, [limit, offset]);

        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'No subjects found'
            });
        }

        const countActive = await db.query(subjectModel.countActive);
        const countInactive = await db.query(subjectModel.countInactive);

        res.json({
            subjects: [...rows],
            countActive: countActive.rows[0].count,
            countInactive: countInactive.rows[0].count
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const subjectById = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    try {
        const {rows} = await db.query(subjectModel.findById, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'Subject not found'
            });
        }

        res.json({
            subject: rows[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const subjectsByProgram = async (req = request, res = response) => {
    const {program} = req.params;
    const { limit = 10, offset = 0 } = req.query;

    try {
        const {rows} = await db.query(subjectModel.findByProgram, [program, limit, offset]);

        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'Subject not found'
            });
        }

        const countProgram = await db.query(subjectModel.countByProgram, [program]);

        res.json({
            subjects: rows,
            count: countProgram.rows[0].count
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const subjectsByCareer = async (req = request, res = response) => {
    const {career} = req.params;
    const { limit = 10, offset = 0 } = req.query;

    try {
        const {rows} = await db.query(subjectModel.findByCareer, [career, limit, offset]);

        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'Subject not found'
            });
        }

        const countCareer = await db.query(subjectModel.countByCareer, [career]);

        res.json({
            subjects: rows,
            count: countCareer.rows[0].count
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const subjectsBySubject = async (req = request, res = response) => {
    const {subject} = req.params;
    const { limit = 10, offset = 0 } = req.query;

    try {
        const {rows} = await db.query(subjectModel.findBySubject, [subject, limit, offset]);

        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'Subject not found'
            });
        }

        const countSubject = await db.query(subjectModel.countBySubject, [subject]);

        res.json({
            subjects: rows,
            count: countSubject.rows[0].count
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const createSubject = async (req = request, res = response) => {
    const { subject, career, program } = req.body;

    
    try {
        const { rows } = await db.query(subjectModel.findDuplicate, [subject, career, program]);
    
        if (rows.length > 0) {
            return res.status(400).json({
                msg: 'Subject already exists'
            });
        }

        const {rowCount} = await db.query(subjectModel.create, [subject, career, program]);

        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'Subject not created'
            });
        }

        res.json({
            msg: 'Subject created'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const updateSubject = async (req = request, res = response) => {
    const { id } = req.params;
    const { subject, career, program } = req.body;

    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    try {
        const {rowCount} = await db.query(subjectModel.update, [subject, career, program, id]);

        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'Subject not updated'
            });
        }

        res.json({
            msg: 'Subject updated'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const deleteSubject = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    try {
        const {rowCount} = await db.query(subjectModel.delete, [id]);

        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'Subject not deleted'
            });
        }

        res.json({
            msg: 'Subject deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const restoreSubject = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    try {
        const {rowCount} = await db.query(subjectModel.restore, [id]);

        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'Subject not restored'
            });
        }

        res.json({
            msg: 'Subject restored'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}