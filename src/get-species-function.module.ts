import { Module } from '@nestjs/common';
import { FinderSpeciesModule } from './core/application/finder-species/finder-species.module';
import { FindSpeciesController } from './infrastructure/http/species/find-species.controller';

@Module({
  imports: [FinderSpeciesModule],
  controllers: [FindSpeciesController]

})
export class GetSpeciesAppModule { }
