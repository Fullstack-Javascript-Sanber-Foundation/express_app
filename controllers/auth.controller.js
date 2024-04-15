import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = (req, res, next) => {
    const { username, password } = req.body;
    User.findByUsername(username, async (err, user) => {
        if(err) {
            if(err.type === 'not_found'){
                return next(new Error('User_not_registered'));
            } else {
                return next(err);
            }
        } 

        const userPassword = user.password;
        const isValidPassword = await bcrypt.compare(password, userPassword);
        if(!isValidPassword){
            return res.status(401).json({message: "Invalid password"});
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};

export const register = async (req, res) => {
    const userExist = await new Promise((resolve, reject) => {
        User.findByUsername(req.body.username, (err, data) => {
            if(err) {
                if(err.type === 'not_found'){
                    resolve(false);
                } else {
                    reject(err);
                }
            } else {
                resolve(true);
            }
        });
    });

    if(userExist){
        return res.status(400).json({ message: "Username already exists" });
    }

    const encryptPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: encryptPassword,
    });

    User.create(newUser, (err, data) => {
        if(err) res.status(500).send({ msg: "Exist some error" });
        res.send(data);
    });
};
