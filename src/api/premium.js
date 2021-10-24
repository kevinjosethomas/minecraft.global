import axios from "axios";

const CreatePremiumSession = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/premium/session?dev=${process.env.NEXT_PUBLIC_DEV}`
    );

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

export { CreatePremiumSession };
