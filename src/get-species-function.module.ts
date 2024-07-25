import { Module } from '@nestjs/common';
import { FindSpeciesController } from './infrastructure/http/species/find-species.controller';

@Module({
  imports: [GetSpeciesAppModule],
  controllers: [FindSpeciesController]

})
export class GetSpeciesAppModule { }
