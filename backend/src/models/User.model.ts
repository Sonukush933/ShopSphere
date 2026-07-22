import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose, { Document, Schema } from 'mongoose';
import { USER_ROLES } from '../constants';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  refreshToken: string;

  comparePassword(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: '15m',
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: '7d',
    },
  );
};



const User = mongoose.model<IUser>('User', userSchema);
export default User;
