import { PrismaService } from '../prisma/prisma.service';
import {
  Injectable,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup() {
    return "this.prisma.user.create({ data: { email: 'test' } });"
  }
  async signin() {}
}
