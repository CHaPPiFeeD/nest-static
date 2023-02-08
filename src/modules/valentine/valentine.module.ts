import { Module } from '@nestjs/common';
import { ValentineController } from './valentine.controller';
import { ValentineService } from './services/valentine.service';
import { LocalPuzzleJson } from './services/local-puzzle-json.service';

@Module({
  imports: [],
  controllers: [ValentineController],
  providers: [
    ValentineService,
    {
      provide: 'PuzzleJson',
      useClass: LocalPuzzleJson,
    },
  ],
  exports: [ValentineService],
})
export class ValentineModule {}
