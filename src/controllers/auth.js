import { request, response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate } from 'uuid';
import db from '../configs/db.js';
import { envs } from '../configs/envs.js';
import { userModel } from '../models/user.js';
export const loginUser = async (req = request, res = response) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({
            msg: 'Username and password are required'
        })
    }

    try {
        const {rows} = await db.query(userModel.findByUsername, [username]);
        if (rows.length === 0) {
            return res.status(400).json({
                msg: 'Username or password is incorrect'
            });
        }

        const passwordIsCorrect = bcrypt.compareSync(password, rows[0].password);
        if (!passwordIsCorrect || !rows[0].is_active) {
            return res.status(400).json({
                msg: 'Username or password is incorrect'
            });
        }

        const token = jwt.sign({
            id: rows[0].id
        }, envs.jwtSecret, {
            expiresIn: '1m'
        });

        const user = {...rows[0]};
        delete user.password;

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

export const registerUser = async (req = request, res = response) => {
    const {username, password, staff, role, is_active = true} = req.body;

    if (!username || !password || !staff || !role) {
        return res.status(400).json({
            msg: 'Missing information'
        });
    }
    if (!validate(staff) || isNaN(role)){
        return res.status(400).json({
            msg: 'Invalid information'
        });
    }

    try {
        const {rows} = await db.query(userModel.findByUsername, [username]);
        if (rows.length > 0) {
            return res.status(400).json({
                msg: 'Username already exists'
            });
        }

        const salt = bcrypt.genSaltSync();
        const hashPassword = `${bcrypt.hashSync(password, salt)}`;

        const {rowCount} = await db.query(userModel.create, [username, hashPassword, staff, role, is_active]);
        if (rowCount === 0) {
            return res.status(500).json({
                msg: 'User not created'
            });
        }

        res.json({
            msg: 'User created succesfully'
        })
    } catch (error) {
        console.log("Ya tronó", error);
        res.status(500).json({
            error: error
        });
    }
}