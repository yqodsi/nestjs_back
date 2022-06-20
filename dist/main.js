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
    const PORT = process.env.PORT || 3003;
    app.setGlobalPrefix("api");
    app.use(session({
        cookie: {
            maxAge: 365 * 24 * 60 * 60 * 1000,
        },
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: new prisma_session_store_1.PrismaSessionStore(new client_1.PrismaClient(), {
            checkPeriod: 120000,
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