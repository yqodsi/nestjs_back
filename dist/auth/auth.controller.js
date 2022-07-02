"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_guard_1 = require("./guards/passport.guard");
const decorators_1 = require("./common/decorators");
const rt_jwt_auth_guard_1 = require("./guards/rt-jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authservice) {
        this.authservice = authservice;
    }
    login(req) {
        console.log(req.user);
        return;
    }
    async redirect(req, res) {
        const { user, } = req;
        if (!user) {
            res.redirect("/");
            return;
        }
        console.log(req.user);
        console.log('cookiesssss', req.cookies);
        const tokens = await this.authservice.login(user);
        await this.authservice.updateRtHash(parseInt(user.id), tokens.refreshToken);
        res.set("Authorization", `Bearer ${tokens.accessToken}`);
        res.cookie("access_token", tokens.accessToken);
        res.cookie("refresh_token", tokens.refreshToken);
        res.redirect("http://localhost:3000/");
    }
    status(req) {
        console.log("hohoho");
        return { msg: "hello" };
    }
    logout(req) {
        console.log(req.user, "what");
    }
    refreshToken(req) {
        const user = req.user;
        console.log(req.user, "refre");
        return this.authservice.refreshToken(user["id"], user["refreshToken"]);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("login"),
    (0, common_1.UseGuards)(passport_guard_1.Passport42AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("redirect"),
    (0, common_1.UseGuards)(passport_guard_1.Passport42AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "redirect", null);
__decorate([
    (0, common_1.Get)("status"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "status", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(rt_jwt_auth_guard_1.JwtRtAuthGuard),
    (0, common_1.Post)("refresh"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map