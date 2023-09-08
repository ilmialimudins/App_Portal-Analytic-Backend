import { PartialType } from '@nestjs/swagger';
import { AddReplaceWordcloudDto } from './add-replace-wordcloud.dto';

export class UpdateReplaceWordcloudDto extends PartialType(
  AddReplaceWordcloudDto,
) {}
