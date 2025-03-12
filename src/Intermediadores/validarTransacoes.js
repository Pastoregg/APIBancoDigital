const { response } = require('express');
const pool = require('../conexao');

const intermediarCadastroTransacao = async (req, res, next) => {
    const { body } = req;
    const { id } = req.usuario;

    const camposReqObrigatorios = ["descricao", "valor", "data", "categoria_id", "tipo"];

    const validarResposta = moduleRequire.verifyBody(body, camposReqObrigatorios) 

    if (!validarResposta) {
        return res.status(400).json({
            mensagem: "Todos os campos obrigatórios devem ser informados"
        })
    }
    
    if (body.tipo !== "entrada" && body.tipo !== "saida") { 
        return res.status(400).json({
            mensagem: "Erro na descrição do tipo"
        })
    }

    try {
        const consultaDatabase = await pool.query(`select * from categorias where usuario_id = $1`, [id])

        if (!consultaDatabase.rows.find(elemento => elemento.id === body.categoria_id)) { 
            return res.status(400).json({
                mensagem: "Categoria não encontrada"
            })
        }

        

        next()
    } catch(error) {
        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        })
    }
}

const intermediarListagemTransacoes = async (req, res, next) => {
    const { id } = req.usuario;

    if (!id) {
        return res.status(401).json({
            mensagem: "Usuário não encontrado"
        })
    }

    next()
}

const intermediarDetalhesTransacao = async (req, res, next) => {
    const { id } = req.params
    const usuario_id = req.usuario.id

    if (!id) {
        return res.status(400).json({
            mensagem: "O campo 'id' é obrigatório"
        });
    }

    try {
        const lista = await pool.query(`
            select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome
            from transacoes t
            join categorias c on t.categoria_id = c.id
            where t.id = $1 and t.usuario_id = $2`, [id, usuario_id])

        if (lista.rows.length === 0) {
            return res.status(404).json({
                mensagem: "Transação não encontrada"
            })
        }

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensagem: "Erro interno do servidor"
        })
    }
}

const intermediarAtualizarTransacaoId = async (req, res, next) => {
    const { body } = req; 
    const usuario_id = req.usuario.id;
    const { id } = req.params

    const camposReqObrigatorios = ["descricao", "valor", "data", "categoria_id", "tipo"]

    const validarResposta = moduleRequire.verifyBody(body, camposReqObrigatorios)
    if (!validarResposta)  {
        return res.status(400).json({
            mensagem: "Todos os campos devem ser informados"
        })
    }

    if (body.tipo !== "entrada" && body.tipo !== "saida") { 
        return res.status(400).json({
            mensagem: "Erro na descrição do tipo"
        })
    }

    try { 
        const lista = await pool.query(`
            select * from transacoes where id = $1 and usuario_id = $2`, [id, usuario_id])

        if (lista.rows.length === 0) { 
            return res.status(400).json({
                mensagem: "Transação não encontrada"
            })
        }

        if (lista.rows[0].categoria_id !== body.categoria_id) {
            return res.status(400).json({
                mensagem: "Categoria de transação não encontrada"
            })
        }
    } catch (error) { 
        return res.status(500).json({
            mensagem: "Erro interno no servidor"
        })
    }

    next()
}


const intermediarDeletarTransacaoId  = async (req, res, next) => {
    const usuario_id = req.usuario.id;
    const { id } = req.params

    try { 
        const lista = await pool.query(`
            select * from transacoes where id = $1 and usuario_id = $2`, [id, usuario_id])

            if (lista.rows.length === 0) { 
                return res.status(400).json({
                    mensagem: "Transação não encontrada"
                })
    } next ()
} 
    catch (error) { 
        return res.status(500).json({
            mensagem: "Erro interno no servidor"
        })
    }

}

module.exports = { 
    intermediarCadastroTransacao,
    intermediarListagemTransacoes,
    intermediarDetalhesTransacao,
    intermediarAtualizarTransacaoId,
    intermediarDeletarTransacaoId 
}