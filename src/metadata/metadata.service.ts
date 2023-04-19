import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetadatumDto } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { MetadataEntity } from '../entities/metadata.entity';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(MetadataEntity)
    private readonly metadataRepository: Repository<MetadataEntity>,
  ) {}

  async create(createMetadataDto: CreateMetadatumDto) {
    if (!createMetadataDto) throw new Error('The object can not be null');
    return await this.metadataRepository.save(createMetadataDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} metadatum`;
  }

  update(id: number, updateMetadatumDto: UpdateMetadatumDto) {
    return `This action updates a #${id} metadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} metadatum`;
  }
}
