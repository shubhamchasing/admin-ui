const responseTransformer = (userList) =>
  userList.map((user) => {
    return {
      ...user,
      isSelected: false,
    };
  });

export default responseTransformer;
