import { getDiference } from './student.helper';

describe('StudentHelper', () => {
  it('return the diferent fields in object', () => {
    const objA = {
      id: 'aa-bb-111',
      firstname: 'john',
      lastname: 'doe',
    };
    const expectResult = {
      dni: 4192846,
      age: 35,
    };
    const objB = {
      ...objA,
      ...expectResult,
    };
    const result = getDiference(objA, objB);
    expect(result === expectResult).toBe(false);
    expect(result).toEqual(result);
  });
});
