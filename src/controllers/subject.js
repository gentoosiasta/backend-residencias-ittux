import { request, response } from "express";
import db from "../database/config";
import subjectModel from "../models/subject";

export const listSubjects = async (req = request, res = response) => {
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