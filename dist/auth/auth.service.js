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
exports.AuthService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async validateUser(details) {
        const { twentyFourId } = details;
        console.log(twentyFourId);
        const user = await this.prisma.user.findUnique({
            where: {
                twentyFourId,
            },
        });
        if (user)
            return user;
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
    async redirect(res) {
        await this.cacheManager.set("redirect", true);
        const chachedItem = await this.cacheManager.get("redirect");
        console.log(chachedItem);
        res.sendStatus(200);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map