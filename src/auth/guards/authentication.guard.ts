import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.isAuthenticated());
    return request.isAuthenticated();
  }
}
