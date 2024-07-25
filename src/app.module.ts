import { Module } from '@nestjs/common';
import { SpeciesModule } from './infrastructure/http/species/species.module';

@Module({
  imports: [SpeciesModule],

})
export class AppModule { }
