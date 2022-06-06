import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Passport42AuthGuard extends AuthGuard('42') {
  handleRequest(err: Error, user: any, info: any) {
    if (
      info &&
      info.message ===
        'The resource owner or authorization server denied the request.'
    )
      return 'failure';
    else if (err || !user) {
      console.log('here');

      throw err || new UnauthorizedException();
    }
    return user;
  }
}
