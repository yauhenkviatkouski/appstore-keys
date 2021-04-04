import { Injectable } from '@nestjs/common';
const gplay = require('google-play-scraper');

@Injectable()
export class KeysService {
  async getById(id: string) {
    const response = await gplay.search({
      term: id,
      num: 10,
    });
    return response;
  }
}
