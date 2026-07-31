import { GoogleGenAI } from '@google/genai/web';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
    private history: any[] = [];
    private ai: GoogleGenAI;

    constructor(private configService: ConfigService) {
        this.ai = new GoogleGenAI({
            apiKey: this.configService.get<string>('GEMINI_API_KEY'),
        });
    }

    async chat(userInput: string) {
        this.history.push({
            type: 'user_input',
            content: [{ type: 'text', text: userInput }],
        });

        const interaction = await this.ai.interactions.create({
            model: 'gemini-3.6-flash',
            input: this.history,
            system_instruction: `You are DSA expert. If someone ask questions apart from DSA,
                you will reply "I am a DSA expert. I can only answer questions related to Data Structures and Algorithms."`,
        });

        this.history.push({
            type: 'model_output',
            content: [{ type: 'text', text: interaction.output_text }],
        });

        return interaction.output_text;
    }
}
