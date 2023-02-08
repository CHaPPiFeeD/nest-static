import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChankModule } from './middlewares/chank/chank.module';
import { ValentineModule } from './modules/valentine/valentine.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets', 'img', 'puzzle'),
      serveRoot: '/puzzle/',
    }),

    ChankModule,
    ValentineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
