import Mail from '../../lib/Mail';

class ResetPasswordMail {
  get key() {
    return 'ResetPasswordMail';
  }

  async handle({ data }) {
    const { user, randomToken } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Agendamento cancelado',
      template: 'resetpassword',
      context: {
        user: user.name,
        randomToken,
      },
    });
  }
}

export default new ResetPasswordMail();
