import { PartialType } from '@nestjs/mapped-types';
import { CreateAuditFavoriteDto } from './create-audit-favorite.dto';

export class UpdateAuditFavoriteDto extends PartialType(CreateAuditFavoriteDto) {}
