import { createTransport } from "nodemailer";
import config from "../config/config.js";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  secure: true,
  auth: { user: config.EMAIL, pass: config.PASSWORD },
});

const createRegisterMessage = (name) => {
  return `<h2>Hola ${name}, Bienvenido, ya estás registrado</h2>`;
};

const createResetPasswordMessage = (name) => {
  return `<h2>Hola ${name}, has solicitado un cambio de contraseña</h2>`;
};

export const sendMail = async (user, service, token = null) => {
  try {
    const { name, email } = user;
    let message = "";
    let subject = "";

    switch (service) {
      case "register":
        message = createRegisterMessage(name);
        subject = "Registro exitoso";
        break;

      case "resetPassword":
        message = createResetPasswordMessage(name);
        subject = "Recupera tu contraseña";
        break;
      default:
        throw new Error("Service not found");
    }
    const gmailSettings = {
      from: config.EMAIL,
      to: email,
      subject: subject,
      html: message,
    };
    const response = await transporter.sendMail(gmailSettings);

    return token !== null ? token : (console.log(response), null);
  } catch (error) {
    throw new Error(`Error al enviar el correo: ${error.message}`);
  }
};
