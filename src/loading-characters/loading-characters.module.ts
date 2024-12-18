import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoadingCharactersService } from './loading-characters.service';
import { LoadingCharactersController } from './loading-characters.controller';

@Module({
  imports: [HttpModule],
  controllers: [LoadingCharactersController],
  providers: [LoadingCharactersService],
})
export class LoadingCharactersModule {}
