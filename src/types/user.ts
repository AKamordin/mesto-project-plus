import { Document, Model } from 'mongoose';

export interface IUser {
  name : string,
  about : string,
  avatar : string,
  email: string,
  password: string
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<IUser>>
}
