import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';

@Injectable()
export class LoginService {
  create(createLoginDto: CreateLoginDto) {
    return createLoginDto;
  }
}
