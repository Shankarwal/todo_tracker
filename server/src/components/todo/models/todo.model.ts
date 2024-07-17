import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { User } from 'src/components/auth/models/user.model';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: User | string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
export const TodoModel = Model<TodoDocument>;
