import jwt from 'jsonwebtoken'
import roleAccess from './roleAccess.js'

const authJwt = (req, res, next) => {
    // get token
    const token = req.headers['authorization']?.replace("Bearer ", "")
    if(!token){
        throw new Error('Mising_Token')
    }

    console.log(token)
    // verify (memastikan token valid)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(403).send({message: 'Invalid token'})
        }

        req.userId = decoded.userId
        console.log(decoded.role)
        if(!roleAccess(decoded.role, req.baseUrl)){
            return res.status(403).json({message: "Unauthorized access"})
        }



        next()
    })

}

export default authJwt