import { commandsDictionary, MAX_FILE_SIZE } from "../consts";

const createCommads = (commands: any) => {
  const obj: any = {};
  commands.forEach((command: string) => {
    console.log(command);

    obj[command] = commandsDictionary[command];
  });
  obj.commands = commands.join(", ");
  return obj;
};

const validateFilesBeforeUpload = (files: File[]) => {
  let error = false;
  files.forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      error = true;
    }
  });
  return error;
};

export { createCommads, validateFilesBeforeUpload };
