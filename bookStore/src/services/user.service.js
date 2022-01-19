import User from '../models/user.model';
import resetcodemodel from '../models/resetcode.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendResetEmail,sendSuccessEmail } from '../utils/user.util';

//Register new Admin or User
export const register = async (info) => {
  const userPresent = await User.find({ email:info.email });
  if (userPresent.length === 0) {
    const hash = await bcrypt.hash(info.password, 10);
    info.password = hash;
    const data = await User.create(info);
    return data;
  } else {
    return null;
  }
};

//Login Admin or User
export const login = async (info) => {
  const userPresent = await User.findOne({ email:info.email });
  if (userPresent) {
    const match = await bcrypt.compare(info.password, userPresent.password);
    if (match) {
      const token = jwt.sign({email:userPresent.email, id: userPresent._id, role: userPresent.role},process.env.SECRET_KEY);
      return token;
    } else {
      return "Incorrect Password"
    }
  } else {
    return "Not Registered Yet";
  }
};

//ForgotPassword for Admin or User
export const forgotPassword = async (info) => {
  const userPresent = await User.findOne({ email:info.email });
  if (userPresent) {
    sendResetEmail(userPresent.email);
    return true;
  } else {
    return "Not Registered Yet";
  }
};

//ResetPassword for Admin or User
export const resetPassword = async (info) => {
  const codePresent = await resetcodemodel.findOne({ email:info.email,resetcode:info.resetcode });
  if (codePresent) {
    const hash = await bcrypt.hash(info.newPassword, 10);
    await User.findOneAndUpdate({email:codePresent.email},{password:hash}, {new:true});
    sendSuccessEmail(codePresent.email);
    return true;
  } else {
    return "code expired";
  }
};
