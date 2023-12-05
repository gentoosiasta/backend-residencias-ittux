import { request, response } from "express";
import { validate } from "uuid";
import db from "../configs/db.js";
import {staffModel} from "../models/staff.js";

export const staffList = async (req = request, res = response) => {
    const { limit = 10, offset = 0 } = req.query;

    try {
        const {rows} = await db.query(staffModel.findAll, [limit, offset]);

        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'No staff found'
            });
        }

        const countActive = await db.query(staffModel.countActive);
        const countInactive = await db.query(staffModel.countInactive);

        res.json({
            staff: [...rows],
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

export const staffById = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    try {
        const {rows} = await db.query(staffModel.findById, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'Staff not found'
            });
        }

        res.json({
            staff: rows[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const createStaff = async (req = request, res = response) => {
    const {name, lastname, rfc, curp, department} = req.body;

    if (!name || !lastname || !rfc || !curp || !department) {
        return res.status(400).json({
            msg: 'Missing data'
        });
    }

    try {
        const {rowCount} = await db.query(staffModel.create, [
            name,
            lastname,
            rfc,
            curp,
            department
        ]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'Staff not created'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const updateStaff = async (req = request, res = response) => {
    const {id} = req.params;
    const {name, lastname, rfc, curp, department} = req.body;

    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    if (!name || !lastname || !rfc || !curp || !department) {
        return res.status(400).json({
            msg: 'Missing data'
        });
    }

    try {
        const {rowCount} = await db.query(staffModel.update, [
            name,
            lastname,
            rfc,
            curp,
            department,
            id
        ]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'Staff not updated'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const deleteStaff = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }
    
    try {
        const {rowCount} = await db.query(staffModel.delete, [id]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'Staff not deleted'
            });
        }

        res.json({
            msg: 'Staff deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const restoreStaff = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    try {
        const {rowCount} = await db.query(staffModel.restore, [id]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'Staff not restored'
            });
        }

        res.json({
            msg: 'Staff restored'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}