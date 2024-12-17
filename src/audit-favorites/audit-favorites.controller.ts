import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditFavoritesService } from './audit-favorites.service';
import { CreateAuditFavoriteDto } from './dto/create-audit-favorite.dto';
import { UpdateAuditFavoriteDto } from './dto/update-audit-favorite.dto';

@Controller('audit-favorites')
export class AuditFavoritesController {
  constructor(private readonly auditFavoritesService: AuditFavoritesService) {}

  @Post()
  create(@Body() createAuditFavoriteDto: CreateAuditFavoriteDto) {
    return this.auditFavoritesService.create(createAuditFavoriteDto);
  }

  @Get()
  findAll() {
    return this.auditFavoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditFavoritesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditFavoriteDto: UpdateAuditFavoriteDto) {
    return this.auditFavoritesService.update(+id, updateAuditFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditFavoritesService.remove(+id);
  }
}
