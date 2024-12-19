import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LoadingCharactersService } from './loading-characters.service';
import { LoadingCharactersController } from './loading-characters.controller';
import { CharactersAPI } from './classAux/charactersAPI';

@Module({
  imports: [HttpModule],
  controllers: [LoadingCharactersController],
  providers: [LoadingCharactersService, CharactersAPI],
})
export class LoadingCharactersModule {}
