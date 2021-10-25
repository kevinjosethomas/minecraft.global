import axios from "axios";

const GetUserByID = async (id) => {
  try {
    const user = await axios.get(`${process.env.API_URL}/user/${id}`);

    return [user.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const GetUserTransactions = async (id, token) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/user/${id}/transactions`);

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const EditUser = async (id, parameters, token) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}/edit`,
      parameters,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return [response.data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};

export { GetUserByID, GetUserTransactions, EditUser };
