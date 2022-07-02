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
exports.AuthService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon = require("argon2");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateUser(details) {
        const { twentyFourId } = details;
        const user = await this.prisma.user.findUnique({
            where: {
                twentyFourId,
            },
        });
        if (user) {
            await this.prisma.user.update({
                where: {
                    twentyFourId,
                },
                data: {
                    firstTime: false,
                },
            });
            return user;
        }
        return await this.createUser(details);
    }
    async createUser(details) {
        console.log("creating user", details);
        return await this.prisma.user.create({
            data: {
                twentyFourId: details.twentyFourId,
                email: details.email,
                avatarUrl: details.avatar,
                username: details.username,
                firstTime: true,
            },
        });
    }
    async findUser(twentyFourId) {
        return await this.prisma.user.findUnique({
            where: {
                twentyFourId,
            },
        });
    }
    async login(user) {
        const payload = { name: user.username, sub: user.id };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: '60s',
                secret: process.env.JWT_SECRET,
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: 60 * 60 * 24 * 7,
                secret: process.env.JWT_RT_SECRET,
            }),
        ]);
        return {
            accessToken: at,
            refreshToken: rt,
        };
    }
    async logout(userId) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null,
                },
            },
            data: {
                hashedRt: null,
            },
        });
    }
    async refreshToken(userId, rt) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        });
        if (!user || !user.hashedRt)
            throw new common_1.ForbiddenException("access denied");
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches)
            throw new common_1.ForbiddenException("access denied");
        const tokens = await this.login(user);
        await this.updateRtHash(user.id, tokens.refreshToken);
        return tokens;
    }
    async hashData(data) {
        return await argon.hash(data);
    }
    async updateRtHash(userId, rt) {
        const hash = await this.hashData(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map