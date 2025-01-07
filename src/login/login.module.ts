import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, User_Schema } from '@schemas/users.chema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: User_Schema }]),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
