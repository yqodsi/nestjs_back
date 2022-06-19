"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const client_1 = require("@prisma/client");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api");
    const PORT = process.env.PORT || 3003;
    app.use(session({
        cookie: {
            maxAge: 1000,
        },
        name: "COOKIE_NAME",
        secret: "ksdhdfgdfgdfgdfg",
        resave: false,
        saveUninitialized: false,
        store: new prisma_session_store_1.PrismaSessionStore(new client_1.PrismaClient(), {
            checkPeriod: 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(PORT);
    console.log(`Running on Port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map