const USER_API =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const userService = {
  getUsers: async () => {
    const response = await fetch(USER_API);
    if (!response.ok) {
      throw new Error(
        `status code: ${response.status}, ${response.statusText}`
      );
    }

    return response.json();
  },
};
