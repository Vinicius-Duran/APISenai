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
        resp.status(400).send("Os campos nome, email e senha são obrigatórios");
        return;
      }

      const conexao = await new MySqlConection().getConexao();
      const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?,?,?)";
      const [resultado] = await conexao.execute(sql, [
        novoUsuario.nome,
        novoUsuario.email,
        novoUsuario.senha,
      ]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  Editar() {}

  Remover() {}
}

export default UsuarioController;
