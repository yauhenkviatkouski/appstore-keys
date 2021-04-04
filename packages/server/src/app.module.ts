import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { KeysModule } from './keys/keys.module';

const imports: any = [KeysModule];

if (process.env.NODE_ENV === 'production') {
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../client', 'build'),
      exclude: ['/api*'],
    }),
  );
}
@Module({
  imports,
  controllers: [],
  providers: [],
})
export class AppModule {}
