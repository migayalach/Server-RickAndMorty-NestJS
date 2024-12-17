import { Injectable } from '@nestjs/common';
import { CreateAuditFavoriteDto } from './dto/create-audit-favorite.dto';
import { UpdateAuditFavoriteDto } from './dto/update-audit-favorite.dto';

@Injectable()
export class AuditFavoritesService {
  create(createAuditFavoriteDto: CreateAuditFavoriteDto) {
    return 'This action adds a new auditFavorite';
  }

  findAll() {
    return `This action returns all auditFavorites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditFavorite`;
  }

  update(id: number, updateAuditFavoriteDto: UpdateAuditFavoriteDto) {
    return `This action updates a #${id} auditFavorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditFavorite`;
  }
}
