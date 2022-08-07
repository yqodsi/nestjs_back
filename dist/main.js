"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT || 3003;
    app.use(cookieParser());
    app.enableCors({
        origin: '*',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("ft_trascendence")
        .setDescription("ft_trascendence API description")
        .setVersion("1.0")
        .addTag("ft_trascendence")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.setGlobalPrefix("api");
    await app.listen(PORT);
    console.log(`Running on Port ${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map