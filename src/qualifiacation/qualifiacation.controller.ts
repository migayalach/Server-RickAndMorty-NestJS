import { Controller, Post, Body } from '@nestjs/common';
import { QualifiacationService } from './qualifiacation.service';
import { CreateQualifiacationDto } from './dto/create-qualifiacation.dto';

@Controller('qualification')
export class QualifiacationController {
  constructor(private readonly qualifiacationService: QualifiacationService) {}

  @Post()
  async create(@Body() createQualifiacationDto: CreateQualifiacationDto) {
    return await this.qualifiacationService.create(createQualifiacationDto);
  }
}
