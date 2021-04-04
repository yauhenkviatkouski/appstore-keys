import { KeysService } from './keys.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysServise: KeysService) {}

  @Get(':id')
  getOne(@Param('id') id) {
    return this.keysServise.getById(id);
  }
}
