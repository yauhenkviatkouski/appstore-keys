import { KeysService } from './keys.service';
import { Controller, Get, Header, Param, Query } from '@nestjs/common';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysServise: KeysService) {}

  @Get(':id')
  @Header('Cache-Control', 'max-age=86400')
  getOne(@Param('id') id: string, @Query('country') country) {
    return this.keysServise.getOne(id, country);
  }
}
