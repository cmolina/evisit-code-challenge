import { expect } from 'chai';
import { performance } from 'perf_hooks';
import { clear, requestHandled, top100 } from '../src';

describe('top100', () => {
    beforeEach(() => clear());

    it('should return an empty list', () => {
        const dailyTop100 = top100();

        expect(dailyTop100).to.deep.equal([]);
    });

    it('should return the ip address of a single request', () => {
        requestHandled('1.1.1.1');

        const dailyTop100 = top100();

        expect(dailyTop100).to.deep.equal(['1.1.1.1']);
    });

    it('should return the ip address of two requests in order', () => {
        requestHandled('1.1.1.1');
        requestHandled('2.2.2.2');
        requestHandled('2.2.2.2');

        const dailyTop100 = top100();

        expect(dailyTop100).to.deep.equal(['2.2.2.2', '1.1.1.1']);
    });

    it('should return the ip address of multiple requests', () => {
        for (let i = 1; i <= 100; i++) {
            for (let j = 1; j <= i; j++) {
                requestHandled(`1.1.1.${i}`);
            }
        }

        const dailyTop100 = top100();

        expect(dailyTop100[0]).to.equal('1.1.1.100');
        expect(dailyTop100[99]).to.equal('1.1.1.1');
    });

    it('should provide a quick response', () => {
        for (let i = 1; i <= 10_000; i++) {
            requestHandled(`1.1.1.${i}`);
        }

        const startInMS = performance.now();
        top100();
        const endInMS = performance.now();

        expect(endInMS - startInMS).to.be.lessThanOrEqual(300);
    });
});