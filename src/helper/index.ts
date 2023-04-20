import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const mockerRepository = (entity: EntityClassOrSchema) => ({
  provide: getRepositoryToken(entity),
  useValue: {
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    delete: jest.fn(),
    where: jest.fn(),
    execute: jest.fn(),
  },
});
