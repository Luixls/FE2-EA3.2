// ruta: backend/controllers/reservaController.js
const nodemailer = require("nodemailer");
const Reserva = require("../models/Reserva");

// Configurar el transporte de Nodemailer con Ethereal usando las credenciales del .env
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURITY === "TLS", // true para TLS, false para otros
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Crear una nueva reserva y enviar correo de confirmación usando Ethereal
const crearReserva = async (req, res) => {
  const { nombreReserva, email, fechaCheckIn, fechaCheckOut, habitacionId } = req.body;
  const userId = req.user.id;

  try {
    const reserva = new Reserva({
      nombreReserva,
      email,
      fechaCheckIn,
      fechaCheckOut,
      habitacionId,
      userId,
    });

    await reserva.save();

    // Enviar el correo electrónico de confirmación
    const mailOptions = {
      from: 'hotelvenezuela@example.com',
      to: email,
      subject: "Confirmación de Reserva - Hotel Venezuela",
      text: `Estimado/a ${nombreReserva},\n\nSu reserva ha sido confirmada.\n\nDetalles de la reserva:\n- Fecha de Check-In: ${new Date(fechaCheckIn).toLocaleDateString()}\n- Fecha de Check-Out: ${new Date(fechaCheckOut).toLocaleDateString()}\n\nGracias por elegirnos.\n\nSaludos,\nHotel Venezuela`,
    };

    // Enviar el correo y obtener la URL de vista previa
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.messageId);
    console.log("Vista previa de URL:", nodemailer.getTestMessageUrl(info));

    res.status(201).json({
      mensaje: "Reserva creada y correo enviado correctamente.",
      previewURL: nodemailer.getTestMessageUrl(info), // URL para ver el correo en la vista de Ethereal
    });
  } catch (error) {
    console.error("Error al crear la reserva o enviar el correo:", error);
    res.status(500).json({ mensaje: "Error al crear la reserva o enviar el correo" });
  }
};

module.exports = { crearReserva };
