import axios from "axios";

const GetServerByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${id}`);

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const ReportServer = async (id, parameters, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/server/${id}/report`,
      parameters,
      {
        headers: { Authorization: token },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { GetServerByID, ReportServer };
