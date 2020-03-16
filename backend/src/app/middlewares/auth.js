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
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Retorna um array com duas posições e o segundo elemento é o que interessa (o primeiro é o bearer)
  const [, token] = authHeader.split(' ');

  // O procedimento pode retornar erro, por isso o try/catch
  try {
    /*
      Usamos o método verify para tentar descriptografar
      Usamos o promisify para evitar a utilização de uma callback
      promisify tranforma o uso de uma callback em async/await
    */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalido' });
  }
};
