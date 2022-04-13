import { DIRECTORY_NAME } from "../consts";

class LocalStorage {
  setDirectoryId(id: string) {
    localStorage.setItem(DIRECTORY_NAME, id);
  }
  getDirectoryId(){
    return localStorage.getItem(DIRECTORY_NAME);
  }
}

export default new LocalStorage();
