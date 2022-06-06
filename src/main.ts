import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      cookie: {
        maxAge: 3600000 * 24,
      },
      secret: 'sfjshfkhdfkjshdfkjhsd',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const PORT = process.env.PORT || 3003;
  await app.listen(PORT);
  console.log(`Running on Port ${PORT}`);
}
bootstrap();
