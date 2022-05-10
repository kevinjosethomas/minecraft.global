import axios from "axios";

const CreatePremiumSession = async (server_id, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/stripe/session/premium?dev=${process.env.NEXT_PUBLIC_DEV}`,
      {
        server_id: server_id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const GetAnalyticsPlugin = async () => {
  try {
    const response = await axios.get(
      "https://api.github.com/repos/minecraft-global/minecraft-global-analytics/releases/latest"
    );

    return [response.data.assets[0].browser_download_url, null];
  } catch (e) {
    return [null, e];
  }
};

const CancelPremiumSubscription = async (id, token) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/stripe/premium/cancel`,
      {
        server_id: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { CreatePremiumSession, GetAnalyticsPlugin, CancelPremiumSubscription };
