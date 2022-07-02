import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { AuthGuard } from '@nestjs/passport';

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
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  await app.listen(PORT);

  console.log(`Running on Port ${PORT}`);
}
bootstrap();
