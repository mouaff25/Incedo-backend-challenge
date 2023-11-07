const createDirectory = require('../src/file-management/create-directory');
const checkExists = require('../src/file-management/exists');

describe('createDirectory', () => {
    it('should create a directory if it does not exist', () => {
        createDirectory('./data/create-directory-test');
        checkExists('./data/create-directory-test').then((exists) => {
            expect(exists).toEqual(true);
        });

    });
    it('should not create a directory if it already exists', () => {
        createDirectory('./data');
        checkExists('./data').then((exists) => {
            expect(exists).toEqual(true);
        });
    });
});