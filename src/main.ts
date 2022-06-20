import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import * as passport from "passport";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from "@prisma/client";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3003;
  app.setGlobalPrefix("api");

  app.use(
    session({
      cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,
      },
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 120000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT);

  console.log(`Running on Port ${PORT}`);
}
bootstrap();
