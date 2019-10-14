import sum from '../../src/js/services/sum';

describe('Sum function', () => {
    it('should calculate a sum', () => {
        expect(sum(1, 5)).toBe(6);
    });
});