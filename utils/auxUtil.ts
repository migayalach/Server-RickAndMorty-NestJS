export const clearCharacter = (array) => {
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
