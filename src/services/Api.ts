import axios from "axios";

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

axios.defaults.withCredentials = true;

class Api {
  async excecute(command: string) {
    try {
      console.log(command);
      const res = (await axios.post(`${ENDPOINT}/command`, { command })).data;
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async uploadFile(files: File[]) {
    const formData = new FormData();
    if (files.length > 1) {
      files.forEach((file) => {
        formData.append(`files`, file);
      });
    } else {
      const file = files[0];
      formData.append(`file`, file);
    }

    return axios.post(`${ENDPOINT}/upload`, formData);
  }

  async getCommands() {
    try {
      const result = await axios.get(`${ENDPOINT}/commands`);
      return result.data;
    } catch (error) {}
  }

  async deleteFile(fileName: string) {
    const res = await axios.post(`${ENDPOINT}/delete`, { fileName });
  }
}

export default new Api();
