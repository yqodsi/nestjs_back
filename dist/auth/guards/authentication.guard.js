"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
class AuthenticationGuard {
    canActivate(context) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        try {
            if (request.session.passport.user) {
                return true;
            }
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
}
exports.AuthenticationGuard = AuthenticationGuard;
//# sourceMappingURL=authentication.guard.js.map