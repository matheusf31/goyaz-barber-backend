/*
  Middleware de autenticação;
  Verificar se usuário está logado;
*/

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // No header existe o campo chamado authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token inválido.', tokenError: true });
  }

  // Retorna um array com duas posições e o segundo elemento é o que interessa (o primeiro é o bearer)
  const [, token] = authHeader.split(' ');

  try {
    /*
      Usamos o método verify para tentar descriptografar
      Usamos o promisify para evitar a utilização de uma callback
      promisify tranforma o uso de uma callback em async/await
    */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // // verificar quanto tempo falta para ele expirar
    // const current_time = Date.now().valueOf() / 1000;

    // if (decoded.exp > current_time) {
    //   // não expirou
    //   console.log('não expirou');
    // }

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.', tokenError: true });
  }
};
