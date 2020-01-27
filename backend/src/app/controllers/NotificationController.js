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
        .json({ error: 'You can only appointment with providers ' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // pegamos a notificação no banco de dados
    // const notification = await Notification.findById(req.params.id);

    // buscar a notificação e atualizar dados na data base
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true }, // o que vamos atualizar
      { new: true } // depois de atualizar vai retornar a nova notific atualizada
    );

    return res.json(notification);
  }
}

export default new NotificationController();
