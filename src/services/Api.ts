import axios from "axios";
import Cookies from "universal-cookie";

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const COOKIE = "ton_shell_id";

class Api {
  async excecute(command: string) {
    const cookie = await this.getCookie();
    try {
      console.log(command);
      const res = (
        await axios.post(
          `${ENDPOINT}/command`,
          { command },
          {
            headers: {
              [COOKIE]: cookie,
            },
          }
        )
      ).data;
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async uploadFile(files: File[]) {
    const cookie = await this.getCookie();
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
        [COOKIE]: cookie,
      },
    });
  }

  async getCookie() {
    const cookie = new Cookies().get(COOKIE);
    if (!cookie) {
      const cookie = await axios.get(`${ENDPOINT}/cookie`);
        
      new Cookies().set(COOKIE, cookie.data)
      return cookie.data
    } else {
      return cookie
    }
  }

  async getCommands() {
    const cookie = await this.getCookie();
    console.log(cookie);
    
    try {
      const result = await axios.get(`${ENDPOINT}/commands`, {
        headers: {
          [COOKIE]: cookie,
        },
      });

      return result.data;
    } catch (error) {}
  }

  async deleteFile(fileName: string) {
    const res = await axios.post(`${ENDPOINT}/delete`, { fileName });
  }
}

export default new Api();
