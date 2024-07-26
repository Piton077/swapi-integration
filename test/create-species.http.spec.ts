import { Test } from '@nestjs/testing';
import 'reflect-metadata';
import { CreateSpeciesModule } from 'src/core/application/create-species/create-species.module';
import { CreateSpeciesServices } from 'src/core/application/create-species/create-species.service';
import { DuplicateSpeciesError } from 'src/core/domain/errors/species/duplicate-species.error';
import { SpeciesEntity } from 'src/core/domain/species/species.entity';
import { CreateSpeciesController } from 'src/infrastructure/http/species/create-species/create-species.controller';

describe('Create Species Controller', () => {
  let controller: CreateSpeciesController;

  const mockFinderRepository = {
    findByName: jest.fn()
  }
  const mockWritingRepository = {
    create: jest.fn()
  }


  beforeEach(async () => {
    const mockModuleBuilder = Test.createTestingModule({
      imports: [CreateSpeciesModule],
      controllers: [CreateSpeciesController],


    })



    mockModuleBuilder.overrideProvider(CreateSpeciesServices).useFactory({
      factory() {
        return new CreateSpeciesServices(mockWritingRepository, mockFinderRepository)
      },
      inject: []

    })
    const app = await mockModuleBuilder.compile()
    controller = app.get<CreateSpeciesController>(CreateSpeciesController);
  });

  describe('Create species', () => {
    it('should return no error on a successful species creation"', async () => {
      const input = {
        "average_height": 2.1,
        "average_lifespan": 400,
        "classification": "Mammal",
        "designation": "Sentient",
        "eye_colors": ["blue", "green", "yellow", "brown", "golden", "red"],
        "hair_colors": ["black", "brown"],
        "homeworld": "https://swapi.py4e.com/api/planets/14/",
        "language": "Shyriiwook",
        "name": "Human3",
        "people": [
          "https://swapi.py4e.com/api/people/13/"
        ],
        "films": [
          "https://swapi.py4e.com/api/films/1/",
          "https://swapi.py4e.com/api/films/2/"
        ],
        "skin_colors": ["gray"],
        "url": "https://swapi.py4e.com/api/species/3/"
      }
      const entity = new SpeciesEntity()

      mockFinderRepository.findByName = jest.fn().mockResolvedValueOnce(null)
      mockWritingRepository.create = jest.fn()
      await controller.create(input)
      expect(mockWritingRepository.create).toBeCalledWith(Object.assign(entity, input));
    });
    it('should throw if theres a species whose name is already taken"', async () => {
      const input = {
        "average_height": 2.1,
        "average_lifespan": 400,
        "classification": "Mammal",
        "designation": "Sentient",
        "eye_colors": ["blue", "green", "yellow", "brown", "golden", "red"],
        "hair_colors": ["black", "brown"],
        "homeworld": "https://swapi.py4e.com/api/planets/14/",
        "language": "Shyriiwook",
        "name": "Human3",
        "people": [
          "https://swapi.py4e.com/api/people/13/"
        ],
        "films": [
          "https://swapi.py4e.com/api/films/1/",
          "https://swapi.py4e.com/api/films/2/"
        ],
        "skin_colors": ["gray"],
        "url": "https://swapi.py4e.com/api/species/3/"
      }
      expect.assertions(1)
      mockFinderRepository.findByName = jest.fn().mockResolvedValueOnce(input)
      try {
        await controller.create(input)
      } catch (error) {
        expect(error).toBeInstanceOf(DuplicateSpeciesError)
      }
    });
  });
});
