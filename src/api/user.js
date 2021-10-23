import axios from "axios";

const GetUserByID = async (id) => {
  try {
    const user = await axios.get(`${process.env.API_URL}/user/${id}`);

    return [user.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

export { GetUserByID };
