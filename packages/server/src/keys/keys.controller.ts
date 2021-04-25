import { KeysService } from './keys.service';
import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysServise: KeysService) {}

  @Get(':id')
  async getOne(
    @Param('id') id: string,
    @Query('country') country,
    @Res({ passthrough: true }) res: Response,
  ) {
    const serviseResponse = await this.keysServise.getOne(id, country);
    if (Array.isArray(serviseResponse)) {
      res.header('Cache-Control', 'max-age=86400').json(serviseResponse);
    }
  }
}
