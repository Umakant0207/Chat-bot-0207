import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body('message') message: string) {
    const reply = await this.chatService.chat(message);
    return { reply };
  }
}
