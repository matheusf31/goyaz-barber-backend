import File from '../models/File';

class FileController {
  async store(req, res) {
    if (!req.file) {
      return res.status(401).json({ error: 'Arquivo não encontrado' });
    }

    // originalname: name -> originalname será salvo como name
    const { originalname: name, filename: path } = req.file;

    if (!name || !path) {
      return res.status(401).json({ error: 'Ocorreu algum erro' });
    }

    const file = await File.create({
      name,
      path,
    });

    if (!file) {
      return res
        .status(400)
        .json({ error: 'Erro ao salvar o arquivo no banco de dados' });
    }

    return res.json(file);
  }
}

export default new FileController();
