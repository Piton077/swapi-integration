import { Controller, Get, Param, Query } from '@nestjs/common';
import { FinderSpeciesService } from 'src/core/application/finder-species/finder-species.services';

@Controller("species")
export class FindSpeciesController {
  constructor(private readonly finderService: FinderSpeciesService) { }

  @Get('/:name')
  findByName(
    @Param('name') name: string,
    @Query('language') language: string,
  ) {
    return this.finderService.findByName(name, language ?? 'es');
  }
}
