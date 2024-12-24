import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { CreateChangePasswordDto } from './dto/create-change-password.dto';
import { UpdateChangePasswordDto } from './dto/update-change-password.dto';

@Controller('change-password')
export class ChangePasswordController {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Post()
  create(@Body() createChangePasswordDto: CreateChangePasswordDto) {
    return this.changePasswordService.create(createChangePasswordDto);
  }

  @Get()
  findAll() {
    return this.changePasswordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.changePasswordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChangePasswordDto: UpdateChangePasswordDto) {
    return this.changePasswordService.update(+id, updateChangePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.changePasswordService.remove(+id);
  }
}
