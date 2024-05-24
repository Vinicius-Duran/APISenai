import cors from 'cors';
import express from "express";
import UsuarioController from "./Controllers/UsuarioController.js";
import AutenticarController from './Controllers/AutenticarController.js';
const port = 3000;

const usuarioController = new UsuarioController;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);


const autentarController = new AutenticarController
app.post("/login", autentarController.login)

app.post('/usuario', usuarioController.Adicionar);
app.get('/usuario', usuarioController.listar);
app.put('/usuario', usuarioController.Editar);
app.delete('/usuario', usuarioController.Remover);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
