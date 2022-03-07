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

const FetchUserAdvertisements = async (token) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/a/user/slots`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const FetchUserProducts = async (token) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/a/user/products`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const CreateNewProduct = async (name, url, image, token) => {
  try {
    const formdata = new FormData();

    formdata.append("image", image);
    formdata.append("name", name);
    formdata.append("url", url);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/a/product/new`,
      formdata,
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
    const formdata = new FormData();

    if (image.preview.startsWith("blob:")) {
      formdata.append("image", image);
    }

    formdata.append("name", name);
    formdata.append("url", url);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/a/product/${product_id}`,
      formdata,
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
      `${process.env.NEXT_PUBLIC_API_URL}/a/product/${product_id}`,
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

const CreateAdvertisementSession = async (
  product_id,
  week_id,
  location,
  token
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/stripe/session/advertisement?dev=${process.env.NEXT_PUBLIC_DEV}`,
      {
        product_id,
        week_id,
        location,
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

export {
  FetchAdvertisementPrices,
  FetchUserAdvertisements,
  FetchWeeeklyAdvertisements,
  FetchUserProducts,
  CreateNewProduct,
  EditProduct,
  DeleteProduct,
  CreateAdvertisementSession,
};
