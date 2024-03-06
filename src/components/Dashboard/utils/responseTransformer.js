import { capitalizeFirstLetter } from "./helper";

const responseTransformer = (userList) =>
  userList.map((user) => {
    return {
      ...user,
      role: capitalizeFirstLetter(user.role),
      isSelected: false,
    };
  });

export default responseTransformer;
