import { Injectable } from '@nestjs/common';
const gplay = require('google-play-scraper');
const gplayMemoized = require('google-play-scraper').memoized({
  maxAge: 1000 * 60 * 60,
});

@Injectable()
export class KeysService {
  async getById(id: string) {
    try {
      const response = await gplayMemoized.search({
        term: id,
        num: 10,
        throttle: 5,
      });
      console.log(
        '🚀 ~ file: keys.service.ts ~ line 16 ~ KeysService ~ getById ~ response',
        id,
      );
      return response;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
