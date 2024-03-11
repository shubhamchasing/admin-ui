import { capitalizeFirstLetter } from "../../../utils/commonFunctions";

const responseTransformer = (userList) =>
  userList.map((user) => {
    return {
      ...user,
      role: capitalizeFirstLetter(user.role),
      isSelected: false,
    };
  });

export default responseTransformer;
