const regex = /[:'`]/gi;

const standardMovieName = (name) => name.replaceAll(regex, "");

export default standardMovieName;
