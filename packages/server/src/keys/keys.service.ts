import { Injectable } from '@nestjs/common';
import gplay = require('google-play-scraper');

const gplayMemoized = gplay.memoized({
  maxAge: 1000 * 60 * 60,
});
@Injectable()
export class KeysService {
  async getOne(id: string, country: string) {
    console.log(
      '🚀 ~ file: keys.service.ts ~ line 10 ~ KeysService ~ getOne ~ country',
      country,
    );
    try {
      const response = await gplayMemoized.search({
        term: id,
        country,
        num: 10,
        throttle: 10,
      });
      console.log(
        '🚀 ~ file: keys.service.ts ~ line 16 ~ KeysService ~ getById ~ response',
        id,
      );
      return response;
    } catch (e) {
      console.log(e);
      throw { ...e, message: e.message.status };
    }
  }
}
