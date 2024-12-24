import { Module } from '@nestjs/common';
import { QualifiacationService } from './qualifiacation.service';
import { QualifiacationController } from './qualifiacation.controller';

@Module({
  controllers: [QualifiacationController],
  providers: [QualifiacationService],
})
export class QualifiacationModule {}
