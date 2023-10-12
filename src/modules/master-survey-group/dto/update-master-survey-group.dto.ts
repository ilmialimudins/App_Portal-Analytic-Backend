import { PartialType } from '@nestjs/swagger';
import { AddSurveyGroupDto } from './add-master-survey-group.dto';

export class UpdateSurveyGroupDto extends PartialType(AddSurveyGroupDto) {}
