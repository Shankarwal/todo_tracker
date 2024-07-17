import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
// import { UpdateAuthDto } from './dto/update-user.dto';
import { User, UserDocument, UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      const user = await createdUser.save();
      const token = this.createJwt({
        userId: user._id,
        username: user?.username,
      });
      const response = {
        tokens: {
          access: {
            token,
          },
        },
        user: {
          username: user?.username,
          userId: user._id
        },
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: Types.ObjectId) {
    return this.userModel.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    const passMatch = await this.comparePassword(password, user?.password);
    if (!passMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.createJwt({
      userId: user._id,
      username: user?.username,
    });
    const response = {
      tokens: {
        access: {
          token,
        },
      },
      user: {
        username: user?.username,
        userId: user._id,
      },
    };
    return response;
  }

  async comparePassword(inputPassword: string, password: string) {
    const isMatch = await compare(inputPassword, password);
    return isMatch;
  }

  createJwt(data: { userId: any; username: string }) {
    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
  }

  verifyToken(token: string) {}
}
