/*
  credenciais para acessar a base de dados
*/

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'goyazbarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
