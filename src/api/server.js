import axios from "axios";

const GetServerByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${id}`);

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

export { GetServerByID };
