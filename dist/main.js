"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(session({
        cookie: {
            maxAge: 3600000 * 24,
        },
        secret: 'sfjshfkhdfkjshdfkjhsd',
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    const PORT = process.env.PORT || 3003;
    await app.listen(PORT);
    console.log(`Running on Port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map