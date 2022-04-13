import {  MAX_FILE_SIZE } from "../consts";
import localstorage from "../services/localstorage";


const validateFilesBeforeUpload = (files: File[]) => {
  let error = false;
  files.forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      error = true;
    }
  });
  return error;
};

const addUserFolderDirectoryToCommand = (command: string[], index?: number) => {
  if(command.length === 0){
    return ''
  }
  const directory = localstorage.getDirectoryId()
  const result = command.map((value, i) => {
    if (index && i === index) {
      return `${directory}/${value}`;
    }
    const fileExtension = value.split(".")[1];
    if (!fileExtension) {
      return value;
    }
    if (value.split(".")[0] === "stdlib") {
      return "~/ton/crypto/smartcont/stdlib.fc";
    }
    return `${directory}/${value}`;
  });
  return result.join(" ");
};


export { validateFilesBeforeUpload, addUserFolderDirectoryToCommand };
