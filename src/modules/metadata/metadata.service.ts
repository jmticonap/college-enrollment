import { Repository } from 'typeorm';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMetadatumDto } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { MetadataEntity } from '../../entities/metadata.entity';
import { CreateUpdateInterceptor } from '../../interceptors/createUpdate.interceptor';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(MetadataEntity)
    private readonly metadataRepository: Repository<MetadataEntity>,
  ) {}

  @UseInterceptors(CreateUpdateInterceptor)
  async create(createMetadataDto: CreateMetadatumDto) {
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
