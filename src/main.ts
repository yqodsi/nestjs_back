import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3003;
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    // credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,

  });
  const config = new DocumentBuilder()
    .setTitle("ft_trascendence")
    .setDescription("ft_trascendence API description")
    .setVersion("1.0")
    .addTag("ft_trascendence")
    .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup("api", app, document);
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  await app.listen(PORT);

  console.log(`Running on Port ${PORT}`);
}
bootstrap();
