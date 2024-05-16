const express = require('express')
const port = 3000;

const app = express();
app.use(express.json());

const usuarios = [];

app.get('/usuarios', (req, res) => {
    console.log(req.query)
    res.send(usuarios);
});
app.post('/usuarios', (req, res) => {
    console.log(req.body);
   
    if (!req.body || !req.body.nome || !req.body.email) {
        res.status(400).send("Os campos nome e email são obrigatórios!")
        return;
    }
    
    const novoUsuario = { ...req.body, id: +new Date() }

    usuarios.push(novoUsuario);
    res.status(201).send(novoUsuario)

});
app.put('/usuarios', (req, res) => {
    console.log(req.headers)
    if (!req.headers.autorizacao) {
        res.status(401).send('Informe o HEADER "autorizacao"')
    } else {
        res.send('Chamou o PUT!!');
    }
});
app.delete('/usuarios/:id', (req, res) => {
    console.log(req.params)
    res.send(`Chamou o DELETE!! ${req.params.id}`);
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});