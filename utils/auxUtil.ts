import { CharacterResponse } from '@interfaces/character.interface';

export const clearCharacter = (array: Array<any>): CharacterResponse[] => {
  return array.map(
    ({
      _id,
      name,
      status: { nameStatus },
      species: { nameSpecie },
      gender: { nameGender },
      image,
      state,
      create,
      stars,
    }) => ({
      _id,
      name,
      status: nameStatus,
      species: nameSpecie,
      gender: nameGender,
      image,
      state,
      create,
      stars,
    }),
  );
};

export const clearOneCharacter = (character) => {
  return {
    _id: character._id,
    name: character.name,
    status: character.status.nameStatus,
    species: character.species.nameSpecie,
    gender: character.gender.nameGender,
    image: character.image,
    state: character.state,
    create: character.create,
    stars: character.stars,
  };
};

export const clearUsers = (array) => {
  const clearInfo = array.map((index) => ({
    idUser: index._id,
    idLevel: index.idLevel._id,
    nameUser: index.idLevel.nameLevel,
    nameLevel: index.nameUser,
    emailUser: index.emailUser,
    photoUser: index.photoUser,
    statusUser: index.statusUser,
  }));
  return clearInfo;
};

export const clearOneUser = (user) => {
  return {
    idUser: user._id,
    idLevel: user.idLevel._id,
    nameUser: user.idLevel.nameLevel,
    nameLevel: user.nameUser,
    emailUser: user.emailUser,
    photoUser: user?.photoUser,
    statusUser: user.statusUser,
  };
};
