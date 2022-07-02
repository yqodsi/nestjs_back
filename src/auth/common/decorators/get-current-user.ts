import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCurrentUser = createParamDecorator(
  (data:  any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!data)  return request.user;
    return request.user[data];
  }
);
