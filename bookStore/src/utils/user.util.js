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

/**
 * utility to sendSuccessEmail
 *
 * @param {object} details
 */
 export const sendSuccessEmail = (details) => {
    transporter.sendMail({
        from: "'Book-Store'<bookstore-account@bookstore.com>",
        to: details,
        subject: "Password reset successfull",
        text: `Your Password reset is successfull. Use this new password for future actions`
    });
  };

/**
 * utility to sendPlaceOrder
 *
 * @param {object} details
 */
 export const sendOrderConfirmation = (details,token) => {
    const link = `http://localhost:${process.env.APP_PORT}/api/${process.env.API_VERSION}/carts/orderdetails/${token}`;
    transporter.sendMail({
        from: "'Book-Store'<bookstore-account@bookstore.com>",
        to: details.email,
        subject: "Order confirmation",
        text: `Hello Happy Customer,`,
        html: `<h2>Your order placed successfully</h2>
                <b>
                <p>Thank you for shoping with us.</p>
                <p>You can see your order details here: <button href="${link}"> <a href="${link}">Order details</a></button></p>
                <p>We hope to see you again soon</p>
                <p>BOOKSTORE.In</p>
                </b>`
    });
  };
