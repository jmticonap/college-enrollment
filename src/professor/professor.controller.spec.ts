import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { ProfessorEntity } from '../entities/professor.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

const updateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};
const getOneResult = {
  id: '',
  firstname: '',
  lastname: '',
  dni: '',
  address: '',
  phone: '',
  courses: Promise.resolve([]),
};
const findResult: Pagination<ProfessorEntity> = {
  items: [getOneResult],
  meta: {
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 10,
    totalItems: 0,
  },
  links: {},
};

describe('ProfessorController', () => {
  let controller: ProfessorController;
  let service: ProfessorService;
  let repo: Repository<ProfessorEntity>;

  beforeEach(async () => {
    service = new ProfessorService(repo);
    controller = new ProfessorController(service);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('find', async () => {
    // jest.spyOn(controller, 'find');
    jest
      .spyOn(service, 'findPaged')
      .mockImplementation(() => Promise.resolve(findResult));

    const r = await controller.find(1, 10);
    expect(r).toMatchObject<Pagination<ProfessorEntity>>(findResult);
  });

  it('create', async () => {
    // jest.spyOn(controller, 'save');
    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(getOneResult));

    const newProfessor = await controller.create({
      firstname: '',
      lastname: '',
      address: '',
      dni: '',
      phone: '',
    });
    expect(newProfessor).toMatchObject(getOneResult);
  });

  it('update', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve(updateResult));

    const updatedProfessor = await controller.update('', {
      dni: '',
    } as ProfessorEntity);
    expect(updatedProfessor).toMatchObject(updateResult);
  });
});
