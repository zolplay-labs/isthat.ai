// https://github.com/zolplay-cn/well-word/blob/main/src/lib/random.ts
import { MersenneTwister } from 'random-seedable'

const base32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
const maxSeed = Math.pow(32, 5)

export class Random extends MersenneTwister {
  /**
   * Returns a random integer between min (inclusive) and max (exclusive)
   *
   * @param min
   * @param max
   */
  public range(min: number, max: number) {
    let r = this.float()

    // Truncate to match precision on C# side
    r = r * 100000
    r = Math.trunc(r)
    r = r / 100000

    const intermediate = Math.floor(r * (max - min))
    let final = min + intermediate

    // We could get 1.0 as are r value which would put us at the max value here
    // If that happens, just make it max - 1
    if (final == max) {
      final -= 1
    }

    // Skip the next random to keep it in sync with bad C# implementation!
    const skipped = this.float()
    return final
  }

  public randFloat(size: number) {
    const arr: number[] = []
    for (let i = 0; i < size; i++) {
      if (i === 0) {
        arr.push(this.float())
      } else {
        const ignore = this.float()
        arr.push(this.float())
      }
    }

    return arr
  }

  static generateSeed(): number {
    return Math.floor(Math.random() * maxSeed)
  }

  static seedToString(seed: number): string {
    let readable = ''

    for (let i = 0; i < 6; i++) {
      readable += base32[Math.floor(seed % base32.length)]
      seed /= base32.length
    }

    return readable
  }

  static stringToSeed(str: string): number {
    let seed = 0

    for (let i = 0; i < str.length; i++) {
      const value = base32.indexOf(str[i]!)
      seed += value * Math.pow(base32.length, i)
    }

    return seed
  }
}
