import { createTransport } from "nodemailer";
import config from "../config/config.js";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  secure: true,
  auth: { user: config.EMAIL, pass: config.PASSWORD },
});
const createRegisterMessage = (firstName) => {
  return `<h2>Hola ${firstName}, Bienvenido, ya estás registrado</h2>`;
};
const createResetPasswordMessage = (firstName) => {
  return `<h2>Hola ${firstName}, has solicitado un cambio de contraseña</h2>`;
};
const createInactiveMessage = (firstName) => {
  return `<h2>Hola ${firstName}, tu cuenta ha sido desactivada</h2>`;
};
const createDeletedProductMessage = (firstName) => {
  return `<h2>Hola ${firstName}, tu producto ha sido eliminado</h2>`;
};
export const sendMail = async (user, service, token = null) => {
  try {
    const { firstName, email } = user;
    let message = "";
    let subject = "";

    switch (service) {
      case "register":
        message = createRegisterMessage(firstName);
        subject = "Registro exitoso";
        break;
      case "resetPassword":
        message = createResetPasswordMessage(firstName);
        subject = "Recupera tu contraseña";
        break;
      case "inactiveUser":
        message = createInactiveMessage(firstName);
        subject = "Tu cuenta ha sido desactivada";
        break;
      case "deleteProduct":
        message = createDeletedProductMessage(firstName);
        subject = "Tu producto ha sido eliminado";
        break;
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
