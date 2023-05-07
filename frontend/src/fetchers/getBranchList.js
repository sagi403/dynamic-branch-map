import branch from "../api/branch";

export const getBranchList = async () => {
  try {
    const { data } = await branch.get("/branches");
    return data;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};