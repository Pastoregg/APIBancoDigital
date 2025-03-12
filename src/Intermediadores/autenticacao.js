const jwt = require('jsonwebtoken')
const { senhaJwt } = require('../senhas')
const pool = require('../conexao')


const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'usuario não autorizado' })
    }
    const token = authorization.split(' ')[1]

    try {
        if (!token) {
            return res.status(401).json({ mensagem: 'o token precisa ser inserido' })
        }

        const { id } = jwt.verify(token, senhaJwt)
        const encontrarUsuario = await pool.query(`select * from usuarios where id = $1`, [id])

        if (encontrarUsuario.rowCount[0] === 0) {
            return res.status(404).json({ mensagem: 'usuario não autorizado' })
        }
        req.usuario = encontrarUsuario.rows[0]

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
    next()

}


module.exports = { verificarUsuarioLogado }