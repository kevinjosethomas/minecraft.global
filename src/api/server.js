import axios from "axios";

const GetServerByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/server/${id}`);

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const ReportServer = async (id, report, proof, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/server/${id}/report`,
      {
        report: report,
        proof: proof,
      },
      {
        headers: { Authorization: token },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { GetServerByID };
