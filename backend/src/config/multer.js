/*
  Configuração do upload de imagem
*/

import multer from 'multer';

// Biblioteca para gerar caracteres aleatórios, etc
import crypto from 'crypto';

// extname: retorna a extensão do arquivo
import { extname, resolve } from 'path';

export default {
  // Como o multer vai guardar os arquivos de imagem
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      // como vamos formatar o nome de arq da imagem
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
