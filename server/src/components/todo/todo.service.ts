import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo, TodoDocument } from './models/todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private itemModel: Model<TodoDocument>) {}

  create(createTodoDto: CreateTodoDto) {
    const createdItem = new this.itemModel(createTodoDto);
    return createdItem.save();
  }

  findAll(userId: string) {
    return this.itemModel.find({ authorId: userId }).exec();
  }

  findOne(id: string, userId: string) {
    return this.itemModel.findById({ _id: id, authorId: userId }).exec();
  }

  update(id: string, userId: string, updateTodoDto: UpdateTodoDto) {
    return this.itemModel.findByIdAndUpdate(
      { _id: id, authorId: userId },
      updateTodoDto,
      { new: true },
    );
  }

  remove(id: string, userId: string) {
    return this.itemModel.findByIdAndDelete({ _id: id, authorId: userId });
  }
}
