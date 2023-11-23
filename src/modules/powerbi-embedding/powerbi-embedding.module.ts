import { Module } from '@nestjs/common';
import { PowerbiEmbeddingService } from './powerbi-embedding.service';
import { PowerbiEmbeddingController } from './powerbi-embedding.controller';
import { MappingMenuReportModule } from '../mapping-menu-report/mapping-menu-report.module';
import { RoleMenuModule } from '../role-menu/role-menu.module';
import { RoleUserModule } from '../role-user/role-user.module';

@Module({
  imports: [MappingMenuReportModule, RoleMenuModule, RoleUserModule],
  controllers: [PowerbiEmbeddingController],
  providers: [PowerbiEmbeddingService],
})
export class PowerbiEmbeddingModule {}
