import Api from "../services/Api";

const commandsDictionary: any = {
  ls: async () => {
    const res = await  Api.excecute("ls");
    return res
  },
  rm: async (value: string) => {
    const res = await  Api.excecute(`rm ${value}`);
    return   res
  },
};

const MAX_FILE_SIZE = 1000000

export { commandsDictionary, MAX_FILE_SIZE };
