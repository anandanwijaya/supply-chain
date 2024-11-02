let jwt = require('jsonwebtoken')
 
function supplierAuthorization(req, res, next) {
    
    let token = req.headers.authorization
    if(!token){
        return res.status(401).json({message: 'Tidak Ada Token, Gagal Mengakses Fitur'})
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if(decoded.role !== 'SUPPLIER'){
            return res.status(403).json({message: 'Unauthorized'})
        }
        req.user_id = decoded.userId
        next()
    } catch (error) {
        return res.status(403).json({message: 'Gagal mengautentikasi token!'})
    }
}

module.exports = supplierAuthorization