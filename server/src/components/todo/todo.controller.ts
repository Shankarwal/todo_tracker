import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Types } from 'mongoose';
import JwtAccessGuard from 'src/guards/jwt-access.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAccessGuard)
  @Post('/')
  create(@Body() createTodoDto: CreateTodoDto, @Request() request) {
    const { userId } = request?.user;
    if (userId !== createTodoDto?.authorId) {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.todoService.create(createTodoDto);
  }

  @UseGuards(JwtAccessGuard)
  @Get('/')
  findAll(@Request() request) {
    const { userId } = request?.user;
    return this.todoService.findAll(userId);
  }

  @UseGuards(JwtAccessGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() request) {
    const { userId } = request?.user;
    return this.todoService.findOne(id, userId);
  }

  @UseGuards(JwtAccessGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() request,
  ) {
    const { userId } = request?.user;
    return this.todoService.update(id, userId, updateTodoDto);
  }

  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() request) {
    const { userId } = request?.user;
    return this.todoService.remove(id, userId);
  }
}
