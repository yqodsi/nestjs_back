import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    private readonly messages: string[] = [];

    public addMessage(message: string): void {
        this.messages.push(message);
    }

    public getMessages(): string[] {
        return this.messages;
    }
}
