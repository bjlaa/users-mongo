const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('should require a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });

  it('should have a name longer than 2 characters', () => {
    const user = new User({ name: 'AL' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
  });

  it('should disallow invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
        done();
      });
  });
});
