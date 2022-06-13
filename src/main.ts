import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  const PORT = process.env.PORT || 3003;
  app.use(
    session({
      cookie: {
        maxAge: 8640000,
      },
      secret: "ksdhdfgdfgdfgdfg",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);

  console.log(`Running on Port ${PORT}`);
}
bootstrap();
