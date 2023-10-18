import { getNextTestStartTime } from '~/lib/utils'

describe('utils', () => {
  describe('getNextTestStartTime', () => {
    it('should provide the correct time for next test', () => {
      expect(
        getNextTestStartTime({
          nextTestId: 1,
          now: new Date('2020-01-01T00:00:00.000Z'),
          refreshesPerDay: 1,
          refreshIntervalInHours: 1,
        })
      ).toBe(new Date('2020-01-02T00:00:01.000Z'))
    })
  })
})
