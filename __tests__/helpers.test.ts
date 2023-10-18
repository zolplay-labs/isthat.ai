import { getNextTestStartTime } from '~/app/_game/helpers/getNextTestStartTime'
import { getTestId } from '~/app/_game/helpers/getTestId'

describe('utils', () => {
  describe('getTestId', () => {
    it('should provide correct id', () => {
      expect(
        getTestId({
          date: new Date('2023-10-18T17:15:00.000Z'),
          releaseDate: '20231017',
          refreshIntervalHours: 6,
        })
      ).toBe(7)
    })
    it('should provide correct id when date is on hour', () => {
      expect(
        getTestId({
          date: new Date('2023-10-18T06:00:00.000Z'),
          releaseDate: '20231018',
          refreshIntervalHours: 1,
        })
      ).toBe(7)
    })
    it('should provide correct id when refresh interval hours cannot be divided evenly by 24', () => {
      expect(
        getTestId({
          date: new Date('2023-10-18T23:15:00.000Z'),
          releaseDate: '20231016',
          refreshIntervalHours: 5,
        })
      ).toBe(15)
    })
  })
  describe('getNextTestStartTime', () => {
    it('should provide correct time for next test', () => {
      expect(
        getNextTestStartTime({
          now: new Date('2023-10-18T10:15:00.000Z'),
          nextTestId: 4,
          refreshIntervalInHours: 4,
        })
      ).toEqual(new Date('2023-10-18T12:00:00.000Z'))
    })
    it('should provide correct time when time is on the hour', () => {
      expect(
        getNextTestStartTime({
          now: new Date('2023-10-18T06:00:00.000Z'),
          nextTestId: 7,
          refreshIntervalInHours: 6,
        })
      ).toEqual(new Date('2023-10-18T12:00:00.000Z'))
    })
    it('should provide correct time when next test is in the next day', () => {
      expect(
        getNextTestStartTime({
          now: new Date('2023-10-18T20:15:00.000Z'),
          nextTestId: 3,
          refreshIntervalInHours: 12,
        })
      ).toEqual(new Date('2023-10-19T00:00:00.000Z'))
    })
  })
})
