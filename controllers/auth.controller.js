import User from "../models/User.js"
import brcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = (req, res, next) => {
    const { username, password } = req.body

    // check if user is registered
        // lanjut login
        // kirim msg, username belum terdaftar

    User.findByUsername(username, async (err, user) => {
        if(err) {
            if(err.type === 'not_found'){
                // user not found (belum terdaftar)
                // throw new Error('User_not_registered')
                return next(new Error('User_not_registered'));
            } else {
                // res.status(500).send({msg: "Exist some error"})
                return next(err)
            }
        } 

        // check password itu bener / gak
        const userPassword = user.password
        const isValidPassword = await brcrypt.compare(password,userPassword)
        if(!isValidPassword){
            return res.status(401).json({message: "Invalid password"})
        }

        // lolos, generate token
        // (userInfo, secretKey, expiretTime)
        const token = jwt.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})

    })

}

export const register = async (req, res) => {
    // check if username is registered
    // get user by username
    const userExist = await new Promise((resolve, reject) => {
        User.findByUsername(req.body.username, (err, data) => {
            if(err) {
                if(err.type === 'not_found'){
                    // username belum terdaftar
                    resolve(false)
                } else {
                    // ada error
                    reject(err)
                }
            } else {
                // username sudah terdaftar
                resolve(true)
            }
        })
    })

    if(userExist){
        return res.status(400).json({message: "Username already exist"})
    }

    const encryptPassword = await brcrypt.hash(req.body.password, 10)

    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: encryptPassword,
    })


    User.create(newUser, (err, data) => {
        if(err) res.status(500).send({msg: "Exist some error"})
        res.send(data)
    })
}