import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UsersService } from 'src/users/users.service';
import { CharactersService } from 'src/characters/characters.service';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Favorites } from '@schemas/favorites.schema';
import { response } from 'helpers/pagination';
import { Status } from '@schemas/status.schema';
import { Species } from '@schemas/species.schema';
import { Gender } from '@schemas/gender.schema';
import { clearFavorites } from 'utils/auxUtil';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites.name) private favoritesModel: Model<Favorites>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
    @InjectModel(Species.name) private speciesModel: Model<Species>,
    @InjectModel(Gender.name) private genderModel: Model<Gender>,
    private readonly userService: UsersService,
    private readonly character: CharactersService,
  ) {}

  private async existFavorite(idUser, idCharacter) {
    const dataFavorite = await this.favoritesModel.findOne({
      idUser: new Types.ObjectId(idUser),
      idCharacter: new Types.ObjectId(idCharacter),
    });
    if (dataFavorite) {
      throw new HttpException(
        `Sorry, this character currently exist, please don't repeat`,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    return;
  }

  private async addedDetail(array) {
    const data = await Promise.all(
      array.map(async (index) => ({
        idFavorite: index._id,
        idUser: index.idUser,
        idCharacter: index.idCharacter._id,
        nameCharacter: index.idCharacter.name,
        statusData: await this.statusModel.findById(index.idCharacter.status),
        speciesData: await this.speciesModel.findById(
          index.idCharacter.species,
        ),
        genderData: await this.genderModel.findById(index.idCharacter.gender),
        image: index.idCharacter.image,
        state: index.idCharacter.state,
        create: index.idCharacter.create,
        stars: index.idCharacter.stars,
      })),
    );
    return clearFavorites(data);
  }

  async create(createFavoriteDto: CreateFavoriteDto) {
    try {
      await this.userService.findOne(createFavoriteDto.idUser);
      await this.character.findOne(createFavoriteDto.idCharacter);
      await this.existFavorite(
        createFavoriteDto.idUser,
        createFavoriteDto.idCharacter,
      );
      const clearData = {
        idCharacter: new Types.ObjectId(createFavoriteDto.idCharacter),
        idUser: new Types.ObjectId(createFavoriteDto.idUser),
      };
      const newFavorite = new this.favoritesModel(clearData);
      await newFavorite.save();
      return 'return all';
    } catch (error) {
      if (error?.status === 404 || error?.status === 405) {
        throw error;
      }
      // console.error('Unexpected error:', error);
      throw new HttpException(
        'So sorry something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(idUser, page?) {
    try {
      if (!page) {
        page = 1;
      }
      await this.userService.findOne(idUser);
      const results = await this.favoritesModel
        .find({
          idUser: new Types.ObjectId(idUser),
        })
        .populate(
          'idCharacter',
          '_id name status species gender image state create stars',
        )
        .populate({
          path: 'idCharacter',
          populate: {
            path: 'species',
            model: 'Species',
            select: '_id nameSpecie',
          },
        })
        .populate({
          path: 'idCharacter',
          populate: {
            path: 'gender',
            model: 'Gender',
            select: '_id nameGender',
          },
        })
        .populate({
          path: 'idCharacter',
          populate: {
            path: 'status',
            model: 'Status',
            select: '_id nameStatus',
          },
        });

      return response(clearFavorites(results), page, 'favorites?');
      // !Before
      // !return response(await this.addedDetail(results), page, 'favorites?');
    } catch (error) {
      if (error?.status === 404) {
        throw error;
      }
      // console.error('Unexpected error:', error);
      throw new HttpException(
        'So sorry something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(idUser: string, idFavorite: string) {
    try {
      await this.userService.findOne(idUser);
      await this.favoritesModel.findByIdAndDelete(idFavorite);
      return await this.findAll(idUser);
    } catch (error) {
      if (error?.status === 404) {
        throw error;
      }
      // console.error('Unexpected error:', error);
      throw new HttpException(
        'So sorry something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
