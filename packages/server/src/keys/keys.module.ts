import { KeysController } from './keys.controller';
import { KeysService } from './keys.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [KeysService],
  controllers: [KeysController],
})
export class KeysModule {}
