import branch from "../api/branch";

export const getBranchList = async () => {
  try {
    const { data } = await branch.get("/branches?populate=images");
    return data.data;
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    throw err;
  }
};
