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
var JwtRtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
let JwtRtStrategy = JwtRtStrategy_1 = class JwtRtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt-refresh") {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                JwtRtStrategy_1.extractJWT,
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_RT_SECRET,
            passReqToCallback: true,
        });
    }
    static extractJWT(req) {
        if (req.cookies &&
            "refresh_token" in req.cookies &&
            req.cookies.refresh_token.length > 0) {
            console.log("ref", req.cookies.refresh_token);
            return req.cookies.refresh_token;
        }
        return null;
    }
    async validate(req, payload) {
        const refreshToken = req.cookies.refresh_token;
        console.log("ref", refreshToken);
        return {
            id: payload.sub,
            refreshToken,
        };
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], JwtRtStrategy, "extractJWT", null);
JwtRtStrategy = JwtRtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtRtStrategy);
exports.JwtRtStrategy = JwtRtStrategy;
//# sourceMappingURL=rt.strategy.js.map