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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passport42Strategy = void 0;
const passport_42_1 = require("passport-42");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let Passport42Strategy = class Passport42Strategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy) {
    constructor(prisma) {
        super({
            clientID: process.env.PASSPORT_ID,
            clientSecret: process.env.PASSPORT_SECRET,
            callbackURL: process.env.PASSPORT_REDIRECT_URL,
        });
        this.prisma = prisma;
    }
    async validate(accessToken, refreshToken, profile) {
        const { username, id, photos, emails } = profile;
        const email = emails[0].value;
        const avatar = photos[0].value;
        console.log(username, id, avatar, email);
        return profile;
    }
};
Passport42Strategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], Passport42Strategy);
exports.Passport42Strategy = Passport42Strategy;
//# sourceMappingURL=passport.strategy.js.map