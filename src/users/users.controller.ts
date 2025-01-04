import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('page') page: string) {
    return await this.usersService.findAll(+page);
  }

  @Get(':idUser')
  async findOne(@Param('idUser') idUser: string) {
    return await this.usersService.findOne(idUser);
  }

  @Patch(':idUser')
  async update(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(idUser, updateUserDto);
  }

  @Delete(':idUser')
  async remove(@Param('idUser') idUser: string) {
    return await this.usersService.remove(idUser);
  }
}
