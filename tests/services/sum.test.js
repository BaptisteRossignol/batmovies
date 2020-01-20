import latestAPI from '../../src/js/services/latestAPI';

const linkAPI = 'https://api.themoviedb.org/3/';
const keyAPI = '7773119c011cc12e9264e289fc360af2';

console.log(latestAPI(linkAPI, keyAPI));
console.log('test');

describe('Search movies function', () => {
  it('Should display movies based on research', () => {
    expect(latestAPI(linkAPI, keyAPI)).toContain(1);
  });
});
