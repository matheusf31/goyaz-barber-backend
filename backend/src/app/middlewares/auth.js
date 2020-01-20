/*
  Middleware de autenticação;
  Verificar se usuário está logado;
*/

import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // retorna um array com duas posições e o segundo elemento é o que interessa
  const [, token] = authHeader.split(' ');

  // o procedimento pode retornar erro, por isso o try/catch
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
