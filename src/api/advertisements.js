import axios from "axios";

const FetchAdvertisementPrices = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/a/prices`);

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchWeeeklyAdvertisements = async () => {
  try {
    const response = await axios.get(`${process.env.API_URL}/a/slots`);

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchUserProducts = async (user_id, token) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/a/user/${user_id}/products`,
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

const CreateNewProduct = async (name, url, image, token) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/a/product/new`,
      {
        name,
        url,
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

const EditProduct = async (product_id, name, url, image, token) => {
  try {
    const response = await axios.put(
      `${process.env.API_URL}/a/product/${product_id}`,
      {
        name,
        url,
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

const DeleteProduct = async (product_id, token) => {
  try {
    const response = await axios.delete(
      `${process.env.API_URL}/a/product/${product_id}`,
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

export {
  FetchAdvertisementPrices,
  FetchWeeeklyAdvertisements,
  FetchUserProducts,
  CreateNewProduct,
  EditProduct,
  DeleteProduct,
};
