import MySqlConection from "../Infra/ApiContext.js";

class UsuarioController {
  async listar(req, resp) {
    try {
      const conexao = await new MySqlConection().getConexao();
      const sql = "SELECT * FROM usuario";
      const [resultado] = await conexao.execute(sql);

      resp.send(resultado);
    } catch (error) {}
  }

  async Adicionar(req, resp) {
    try {
      const novoUsuario = req.body;

      if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        resp.status(400).send('Os campos nome, email e senha são obrigatórios.');
        return;
      }

      const conexao = await new MySqlConection().getConexao();
      const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?,?,md5(?))';
      const [resultado] = await conexao.execute(sql, [
        novoUsuario.nome,
        novoUsuario.email,
        novoUsuario.senha,
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async Editar() {
    try {
      const usuarioEditar = req.body;

      if (!usuarioEditar.nome || !usuarioEditar.email) {
        resp.status(400).send('Os campos nome e email são obrigatórios para atualizar.');
        return;
      }

      const conexao = await new MySqlConection().getConexao();
      const sql = 'UPDATE usuario SET nome = ?, email = ? WHERE id_usuario = ?';
      const [resultado] = await conexao.execute(sql, [
        usuarioEditar.nome,
        usuarioEditar.email,
        usuarioEditar.id,
      ]);

      resp.send({ resultado });
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async Remover() {
    try {
      const conexao = await new MySqlConection().getConexao();
      const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
      const [resultado] = await conexao.execute(sql, [+req.params.idUsuario]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default UsuarioController;
