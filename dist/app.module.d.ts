import { NestModule, MiddlewareConsumer } from "@nestjs/common";
export declare class AppModule implements NestModule {
    private readonly redis;
    constructor(redis: any);
    configure(consumer: MiddlewareConsumer): void;
}
