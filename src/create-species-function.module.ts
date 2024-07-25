import { Module } from '@nestjs/common';
import { CreateSpeciesModule } from './core/application/create-species/create-species.module';
import { CreateSpeciesController } from './infrastructure/http/species/create-species.controller';

@Module({
  imports: [CreateSpeciesModule],
  controllers: [CreateSpeciesController]

})
export class CreateSpeciesAppModule { }
