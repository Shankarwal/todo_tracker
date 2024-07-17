import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import { Todo } from 'src/components/todo/models/todo.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    // unique: true
  })
  username: string;

  @Prop({
    minlength: 4,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = Model<UserDocument>;

UserSchema.pre('save', async function () {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

UserSchema.pre('findOneAndUpdate', async function () {
  let update: any = this.getUpdate();
  if (update?.password) {
    const salt = await genSalt(10);
    update.password = await hash(update.password, salt);
    this.setUpdate(update);
  }
});

UserSchema.methods.comparePasswords = async function (inputPassword: string) {
  const isMatch = await compare(inputPassword, this.password);
  return isMatch;
};

// UserSchema.methods.createJwt = async function () {
//   const user = await UserModel.findById(this._id).exec();
//   return jwt.sign(
//     {
//       username: user?.username,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_LIFETIME,
//     },
//   );
// };
