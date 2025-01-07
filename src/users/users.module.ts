import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, User_Schema } from '@schemas/users.chema';
import { AuxUser } from './aux-user/aux-user';

@Module({
  exports: [UsersService, AuxUser],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: User_Schema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuxUser],
})
export class UsersModule {}
