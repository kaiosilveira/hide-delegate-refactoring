import { getManager } from '.';
import { Department } from '../Department';
import { Person } from '../Person';

describe('getManager', () => {
  it('should fetch the manager of a person', () => {
    const department = new Department();
    department.chargeCode = '123';
    department.manager = 'Martin';

    const aPerson = new Person({ name: 'Kaio' });
    aPerson.department = department;

    expect(getManager(aPerson)).toEqual('Martin');
  });
});
