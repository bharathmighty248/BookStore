import nodemailer from 'nodemailer';
import resetcodemodel from '../models/resetcode.model';
import dotenv from 'dotenv';
dotenv.config('./.env');

// Transporter creation
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});


/**
 * utility to sendResetEmail
 *
 * @param {object} details
 */
 export const sendResetEmail = (details) => {
    const resetcode = Math.random().toString(36).substring(2,12);
    transporter.sendMail({
        from: "'Book-Store'<bookstore-account@bookstore.com>",
        to: details,
        subject: "Your Password Reset Code",
        text: `Use this code to reset your password: ${resetcode} `
    });
    const code = new resetcodemodel({email:details,resetcode});
    code.save();
  };
