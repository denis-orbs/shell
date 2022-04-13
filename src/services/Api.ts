import axios from "axios";
import fileDownload from "js-file-download";
import localstorage from "./localstorage";
import { DIRECTORY_NAME } from "../consts";

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class Api {
  async excecuteBase(path: string, args: string) {
    const directoryId = localstorage.getDirectoryId();
    if (!directoryId) {
      return;
    }
    try {
      const res = (
        await axios.post(
          `${ENDPOINT}/${path}`,
          { args },
          {
            headers: {
              [DIRECTORY_NAME]: directoryId,
            },
          }
        )
      ).data;
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async runExample() {
    return this.excecuteBase("run-example", "");
  }

  async contractCommand(command: string) {
    console.log(command);

    return this.excecuteBase("contract-command", command);
  }

  async excecute(command: string) {
    console.log(command);
    
    return this.excecuteBase("command", command);
  }

  async getFile(fileName: string) {
    const result = await this.excecuteBase("get-file", fileName);

    return fileDownload(result, fileName);
  }

  async uploadFile(files: File[]) {
    const directoryId = localstorage.getDirectoryId();
    if (!directoryId) {
      return;
    }
    const formData = new FormData();
    if (files.length > 1) {
      files.forEach((file) => {
        formData.append(`files`, file);
      });
    } else {
      const file = files[0];
      formData.append(`file`, file);
    }

    return axios.post(`${ENDPOINT}/upload`, formData, {
      headers: {
        [DIRECTORY_NAME]: directoryId,
      },
    });
  }

  async verifyCookie() {
    const directoryId = localstorage.getDirectoryId();
    if (!directoryId) {
      const cookie = await axios.get(`${ENDPOINT}/cookie`);
      localstorage.setDirectoryId(cookie.data);

      return cookie.data;
    } else {
      return directoryId;
    }
  }


  async deleteFile(fileName: string) {
    return axios.post(`${ENDPOINT}/delete`, { fileName });
  }
}

export default new Api();
