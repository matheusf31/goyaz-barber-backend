/**
 * O controller vai apenas enviar o email.
 * Aqui será feita qualquer tipo de config dos emails.
 */

import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    // como o nodemailer chama uma conexão com algum serviço externo
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null, // algumas estratégias de envio que não exige autenticação
    });
  }

  // enviar o email
  sendMail(message) {
    // chamo ele aqui pq vou enviar todos os dados padrão
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
