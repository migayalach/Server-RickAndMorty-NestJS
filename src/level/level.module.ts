import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, Level_Schema } from '@schemas/level.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: Level_Schema }]),
  ],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
