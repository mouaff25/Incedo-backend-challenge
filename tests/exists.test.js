const chechExists = require('../src/file-management/exists');

describe('checkExists', () => {
    it('should return true if the folder exists', () => {
        chechExists('./data/csv-files').then((exists) => {
            expect(exists).toEqual(true);
        });
    }
    );
    it('should return false if the folder does not exist', () => {
        chechExists('./data/csv-files/does-not-exist').then((exists) => {
            expect(exists).toEqual(false);
        });
    }
    );
    it('should return true if the file exists', () => {
        chechExists('./data/artists-fallback.json').then((exists) => {
            expect(exists).toEqual(true);
        });
    }
    );
    it('should return false if the file does not exist', () => {
        chechExists('./data/does-not-exist.json').then((exists) => {
            expect(exists).toEqual(false);
        });
    }
    );
}
);