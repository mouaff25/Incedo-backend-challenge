const healthCheck = require('../src/utils/health');

describe('healthCheck', () => {
    it('should return OK', () => {
        const health = healthCheck();
        expect(health).toEqual('OK');
    });
});