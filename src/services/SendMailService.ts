import nodemailer, { Transporter } from "nodemailer";
import { resolve } from "path";
import handlebars from "handlebars";
import fs from "fs";

class SendMailService {
  private client: Transporter;
  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });
      this.client = transporter;
    });
  }
  async execute(to: string, subject: string, variables: object, path: string) {
    //lendo o arquivo do path
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    //salvando o arquivo compilado dentro da variavel
    const mailTemplateParse = handlebars.compile(templateFileContent);
    //inserindo as variáveis no html que fizemos no handlebars
    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html: html,
      from: "NPS <noreplay@nps.com.br>",
    });
    console.log("Message sent: %s", message);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
export default new SendMailService();
