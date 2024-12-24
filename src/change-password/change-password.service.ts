import { Injectable } from '@nestjs/common';
import { CreateChangePasswordDto } from './dto/create-change-password.dto';
import { UpdateChangePasswordDto } from './dto/update-change-password.dto';

@Injectable()
export class ChangePasswordService {
  create(createChangePasswordDto: CreateChangePasswordDto) {
    return 'This action adds a new changePassword';
  }

  findAll() {
    return `This action returns all changePassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} changePassword`;
  }

  update(id: number, updateChangePasswordDto: UpdateChangePasswordDto) {
    return `This action updates a #${id} changePassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} changePassword`;
  }
}
