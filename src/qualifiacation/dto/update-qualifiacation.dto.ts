import { PartialType } from '@nestjs/mapped-types';
import { CreateQualifiacationDto } from './create-qualifiacation.dto';

export class UpdateQualifiacationDto extends PartialType(CreateQualifiacationDto) {}
