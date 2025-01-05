import { Injectable } from '@nestjs/common';
import { CreateQualifiacationDto } from './dto/create-qualifiacation.dto';
import { UpdateQualifiacationDto } from './dto/update-qualifiacation.dto';

@Injectable()
export class QualifiacationService {
  create(createQualifiacationDto: CreateQualifiacationDto) {
    return 'This action adds a new qualifiacation';
  }

  update(id: number, updateQualifiacationDto: UpdateQualifiacationDto) {
    return `This action updates a #${id} qualifiacation`;
  }
}
