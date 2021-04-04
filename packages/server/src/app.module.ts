import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const imports = [];

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
