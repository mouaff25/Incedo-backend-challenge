const getUrl = require('../src/utils/api-url');

describe('getUrl', () => {
    process.env.LASTFM_API_KEY = 'LASTFM_API_KEY';
    it('should return the host of the api', () => {
        ({ host, requestUrl } = getUrl('John Doe'));
        expect(host).toEqual('ws.audioscrobbler.com/2.0/');

    });
    it('should return the url request of the api', () => {    
        ({ host, requestUrl } = getUrl('John Doe'));
        expect(requestUrl).toEqual('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=John%20Doe&api_key=LASTFM_API_KEY&limit=1&format=json');
    });
}
);
