import mysql from "mysql2/promise";

const StringConection = {

    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'senai',
    database: 'conexaoApi'
};

class MySqlConection{
    async getConexao(){
        if (!MySqlConection.conexao){
            return MySqlConection.conexao = await mysql.createConnection(StringConection);
        }
        return MySqlConection.conexao;
    }
}

export default MySqlConection;