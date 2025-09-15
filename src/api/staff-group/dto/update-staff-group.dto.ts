import { PartialType } from '@nestjs/swagger';
import { CreateStaffGroupDto } from './create-staff-group.dto';

export class UpdateStaffGroupDto extends PartialType(CreateStaffGroupDto) {}
