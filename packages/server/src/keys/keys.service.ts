import { HttpException, Injectable } from '@nestjs/common';
import gplay = require('google-play-scraper');

// const gplayMemoized = gplay.memoized({
//   maxAge: 1000 * 60 * 60,
// });
@Injectable()
export class KeysService {
  async getOne(id: string, country: string) {
    console.log('🚀 ~ file: keys.service.ts ~ request', country, id);
    // if (id === 'exa') {
    //   throw new HttpException('message', 429);
    // }
    try {
      const response = await gplay.search({
        term: id,
        country,
        num: 10,
        throttle: 50,
      });
      console.log('🚀 ~ file: keys.service.ts response success: ', id);
      return response;
    } catch (e) {
      console.log('ERROR: ', e.message, e.status);
      throw new HttpException(e.message, e.status);
    }
  }
}
