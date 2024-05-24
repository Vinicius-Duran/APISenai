import MySqlConection from "../Infra/ApiContext.js";

class AutenticarController {
  async login(req, resp) {
    try {
      if (!req.body.email || !req.body.senha) {
        resp.status(400).send("Os campos email e senha são obrigatorios");
      }
      const conexao = await new MySqlConection().getConexao();
      const sql = "SELECT * FROM usuario where email = ? and senha = md5(?)";
      const [resultado] = await conexao.execute(sql, [
        req.body.email,
        req.body.senha,

        resp.send(resultado),
      ]);
    } catch (error) {
        resp.status(500);
    }
  }
}

export default AutenticarController;
