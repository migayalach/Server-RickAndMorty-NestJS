import { Module } from '@nestjs/common';
import { QualifiacationService } from './qualifiacation.service';
import { QualifiacationController } from './qualifiacation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Qualification,
  Qualification_Schema,
} from '@schemas/qualification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Qualification.name, schema: Qualification_Schema },
    ]),
  ],
  controllers: [QualifiacationController],
  providers: [QualifiacationService],
})
export class QualifiacationModule {}
