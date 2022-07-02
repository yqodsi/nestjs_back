"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT || 3003;
    app.use(cookieParser());
    app.enableCors({});
    app.setGlobalPrefix("api");
    await app.listen(PORT);
    console.log(`Running on Port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map