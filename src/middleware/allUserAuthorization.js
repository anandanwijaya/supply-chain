let jwt = require('jsonwebtoken')

let allUserAuthorization = (req, res, next) => {
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Tidak Ada Token, Gagal Mengakses Fitur' })
    }

    let token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Format Token Salah, Gagal Mengakses Fitur' })
    }
    
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user_id = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'})
    }
}

module.exports = allUserAuthorization