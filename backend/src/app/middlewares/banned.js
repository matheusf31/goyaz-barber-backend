import User from '../models/User';

export default async (req, res, next) => {
  if (!req.userId) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Insira um email.' });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user.banned) {
      return res.status(401).json({ error: 'Você foi banido da aplicação!' });
    }
  } else {
    const user = await User.findByPk(req.userId);

    if (user && user.banned) {
      return res.status(401).json({ error: 'Você foi banido da aplicação!' });
    }
  }

  return next();
};
