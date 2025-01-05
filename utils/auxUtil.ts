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

// !BEFORE
// export const clearFavorites = (array) => {
//   console.log(array);

//   const data = array.map((index) => ({
//     idFavorite: index.idFavorite,
//     idStatus: index.statusData._id,
//     idSpecies: index.speciesData._id,
//     idGender: index.genderData._id,
//     idUser: index.idUser,
//     idCharacter: index.idCharacter,
//     nameCharacter: index.nameCharacter,
//     status: index.statusData.nameStatus,
//     species: index.speciesData.nameSpecie,
//     gender: index.genderData.nameGender,
//     image: index.image,
//     state: index.state,
//     create: index.create,
//     stars: index.stars,
//   }));
//   return data;
// };

export const clearFavorites = (array) => {
  return array.map((index) => ({
    idFavorite: index._id,
    idStatus: index.idCharacter.status._id,
    idSpecies: index.idCharacter.species._id,
    idGender: index.idCharacter.gender._id,
    idUser: index.idUser,
    idCharacter: index.idCharacter._id,
    nameCharacter: index.idCharacter.name,
    status: index.idCharacter.status.nameStatus,
    species: index.idCharacter.species.nameSpecie,
    gender: index.idCharacter.gender.nameGender,
    image: index.idCharacter.image,
    state: index.idCharacter.state,
    create: index.idCharacter.create,
    stars: index.idCharacter.stars,
  }));
};
