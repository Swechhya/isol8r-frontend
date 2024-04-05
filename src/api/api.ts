import axios, { AxiosResponse } from "axios";

interface ClientConfig {
  id: string;
  secret: string;
}

const { VITE_API_URL } = import.meta.env;

export const submitClientConfig = async (
  response: ClientConfig
): Promise<AxiosResponse<any, any> | null> => {
  const url = `${VITE_API_URL}/submit-client-config`;
  const resp = await axios
    .post(url, response)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return resp;
};
