import { PartialType } from '@nestjs/swagger';
import { AddStopwordsDto } from './add-stopwords.dto';

export class UpdateStopwordsDto extends PartialType(AddStopwordsDto) {}
