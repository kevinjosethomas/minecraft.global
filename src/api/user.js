import axios from "axios";

const GetUserByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/user/${id}`);

    return [response.data.payload, null];
  } catch (e) {
    console.log(e);
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

export { GetUserByID, EditUser };
