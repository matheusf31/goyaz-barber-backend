import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    /**
     * Verificando se o usuário logado é um prestador de serviços
     */
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(400).json({ error: 'Notification not found' });
    }

    const check = await notification.updateOne({ read: true });

    return res.json(check);
  }
}

export default new NotificationController();
