export const searchUsers = (array, keyword) => {
  const searchTerm = keyword.toLowerCase();
  return array.filter(value => {
    console.log(value)
    return value.name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.username.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.city.toLowerCase().match(new RegExp(searchTerm, 'g'))
  });
};

export const searchPosts = (array, keyword) => {
  const searchTerm = keyword.toLowerCase();
  return array.filter(value => {
    console.log(value)
    return value.title.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
          value.body.toLowerCase().match(new RegExp(searchTerm, 'g'))
  });
};
