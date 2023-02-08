import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { LocalPuzzleJson } from 'src/modules/valentine/services/local-puzzle-json.service';
import { ChankMiddleware } from './chank.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ChankMiddleware,
    {
      provide: 'PuzzleJson',
      useClass: LocalPuzzleJson,
    },
  ],
  exports: [ChankMiddleware],
})
export class ChankModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ChankMiddleware)
      .forRoutes({ path: '/puzzle*', method: RequestMethod.GET });
  }
}
