import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}
    @Post('signin')
    signin(@Body() dto: any) {
        console.log({dto});
        
        return this.authservice.signin();
    }
}