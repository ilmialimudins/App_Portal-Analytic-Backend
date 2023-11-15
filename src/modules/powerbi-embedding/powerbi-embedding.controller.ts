import { Controller } from '@nestjs/common';
import { PowerbiEmbeddingService } from './powerbi-embedding.service';

@Controller('powerbi-embedding')
export class PowerbiEmbeddingController {
  constructor(
    private readonly powerbiEmbeddingService: PowerbiEmbeddingService,
  ) {}

  private async loginToMicrosoft() {
    try {
    } catch (error) {}
  }
}
