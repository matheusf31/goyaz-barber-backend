/**
 * O controller vai apenas enviar o email.
 * Aqui será feita qualquer tipo de config dos emails.
 */

import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
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

    this.configureTemplates();
  }

  configureTemplates() {
    // caminho dos templates
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    // 'compile' -> como ele compila os emails
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
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
