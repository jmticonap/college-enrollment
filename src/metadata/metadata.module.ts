import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadataEntity } from '../entities/metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetadataEntity])],
  exports: [TypeOrmModule, MetadataService],
  providers: [MetadataService],
})
export class MetadataModule {}
