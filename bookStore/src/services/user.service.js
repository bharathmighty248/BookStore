import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendResetEmail } from '../utils/user.util';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

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

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
