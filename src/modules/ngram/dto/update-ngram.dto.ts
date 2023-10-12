import { PartialType } from '@nestjs/swagger';
import { AddNgramDto } from './add-ngram.dto';

export class UpdateNgramDto extends PartialType(AddNgramDto) {}
