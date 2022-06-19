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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const redis_module_1 = require("./redis/redis.module");
const session = require("express-session");
const RedisStore = require("connect-redis");
let AppModule = class AppModule {
    constructor(redis) {
        this.redis = redis;
    }
    configure(consumer) {
        consumer.apply(session({
            name: "kha",
            saveUninitialized: false,
            secret: "sup3rs3cr3t",
            resave: false,
            store: new (RedisStore(session))({
                client: this.redis,
                logErrors: true,
            }),
            cookie: {
                maxAge: 60000,
            },
        }))
            .forRoutes("*");
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({
                isGlobal: true,
            }),
            passport_1.PassportModule.register({ session: true }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
        ],
    }),
    __param(0, (0, common_1.Inject)("REDIS_CLIENT")),
    __metadata("design:paramtypes", [Object])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map