import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ItemsModule } from './items/items.module'; // Create items module later
import { TodoModule } from './components/todo/todo.module';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
