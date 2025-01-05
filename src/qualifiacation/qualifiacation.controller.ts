import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { QualifiacationService } from './qualifiacation.service';
import { CreateQualifiacationDto } from './dto/create-qualifiacation.dto';
import { UpdateQualifiacationDto } from './dto/update-qualifiacation.dto';

@Controller('qualifiacation')
export class QualifiacationController {
  constructor(private readonly qualifiacationService: QualifiacationService) {}

  @Post()
  create(@Body() createQualifiacationDto: CreateQualifiacationDto) {
    return this.qualifiacationService.create(createQualifiacationDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQualifiacationDto: UpdateQualifiacationDto,
  ) {
    return this.qualifiacationService.update(+id, updateQualifiacationDto);
  }
}
