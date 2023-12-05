import { request, response } from "express";
import bcrypt from "bcrypt";
import {validate} from "uuid";
import db from "../configs/db.js";
import {userModel} from "../models/user.js";

export const usersList = async (req = request, res = response) => {
    const { limit = 10, offset = 0 } = req.query;

    try {
        const {rows} = await db.query(userModel.findAll, [limit, offset]);
        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'No users found'
            });
        }

        const countActive = await db.query(userModel.countActive);
        const countInactive = await db.query(userModel.countInactive);

        res.json({
            users: [...rows],
            countActive: countActive.rows[0].count,
            countInactive: countInactive.rows[0].count
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const userById = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    try {
        const {rows} = await db.query(userModel.findById, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                msg: 'User not found'
            });
        }

        res.json({
            user: rows[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const createUser = async (req = request, res = response) => {
    const {username, password, staff, role, is_active = true} = req.body;

    if (!username || !password || !staff || !role) {
        return res.status(400).json({
            msg: 'Missing information'
        });
    }

    try {
        const {rowCount} = await db.query(userModel.create, [
            username,
            password,
            staff,
            role,
            is_active
        ]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'User not created'
            });
        }

        res.json({
            msg: 'User created succesfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const updateUser = async (req = request, res = response) => {
    const {id} = req.params;
    const {username, password, staff, role} = req.body;

    if (!username || !password || !staff || !role) {
        return res.status(400).json({
            msg: 'Missing information'
        });
    }

    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    try {
        const {rowCount} = await db.query(userModel.update, [
            username,
            password,
            staff,
            role,
            id
        ]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'User not updated'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const deleteUser = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }
    
    try {
        const {rowCount} = await db.query(userModel.delete, [id]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'User not deleted'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const restoreUser = async (req = request, res = response) => {
    const {id} = req.params;
    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }
    
    try {
        const {rowCount} = await db.query(userModel.restore, [id]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'User not restored'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const updatePassword = async (req = request, res = response) => {
    const {id} = req.params;
    const {password} = req.body;

    if (!validate(id)) {
        return res.status(400).json({
            msg: 'Invalid ID'
        });
    }

    const salt = bcrypt.genSaltSync();
    const hashPassword = `${bcrypt.hashSync(password, salt)}`;

    try {
        const {rowCount} = await db.query(userModel.update, [hashPassword, id]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'User not updated'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}