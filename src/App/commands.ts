import Api from "../services/Api";
import { addUserFolderDirectoryToCommand } from "./util";


const exampleCommands = {
  func: "func -o wallet-v3-code.fif -SPA stdlib.fc wallet-v3-code.fc",
  fift: "fift -s new-wallet-v3.fif 0 698983191 new-wallet-v3",
  liteClient: "lite-client -C global-config.json -c 'sendfile new-wallet-v3-query.boc'  "
};



const getCommands = (terminal: any, uploadRef: any) => {
  return {
    download: {
      description: "Get file",

      fn: async (fileName?: string) => {
        if (!fileName) {
          return;
        }
        terminal.pushToStdout("Downloading...");

        try {
          await Api.getFile(fileName);
          return "Done";
        } catch (error: any) {
          return error.message;
        }
      },
    },
    runExample: {
      description: "Run example",

      fn: async () => {
        terminal.pushToStdout("Starting example...");

        try {
          await Api.runExample();
          terminal.pushToStdout(`type: ${exampleCommands.func}`);
        } catch (error: any) {
          return error.message;
        }
      },
    },
    func: {
      description: "Copile func file",
      fn: async (...params: string[]) => {
        terminal.pushToStdout("Compiling...");
        const command = addUserFolderDirectoryToCommand(params);

        try {
          const res = await Api.contractCommand(`~/liteclient-build/crypto/func ${command}`);

          terminal.pushToStdout(res || 'Done');
          if (terminal.isExample) {
            terminal.pushToStdout(`type: ${exampleCommands.fift}`);
          }
        } catch (error: any) {
          return error.message;
        }
      },
    },

    ls: {
      description: "Print directory files",

      fn: async (...params: string[]) => {
        terminal.pushToStdout("Loading...");
        const command = addUserFolderDirectoryToCommand(params);
        try {
          const res = await Api.excecute(`ls ${command}`);
          if (!res) {
            return "Empty Directory";
          }

          return res;
        } catch (error: any) {
          return error.message;
        }
      },
    },
    fift: {
      description: "Build fift",

      fn: async (...params: string[]) => {
        terminal.pushToStdout("Compiling...");
        const command = addUserFolderDirectoryToCommand(params, params.length - 1);

        try {
          const res = await Api.contractCommand(`~/liteclient-build/crypto/fift ${command}`);
          terminal.pushToStdout(res);

          if (terminal.isExample) {
            terminal.pushToStdout(`type: ${exampleCommands.liteClient}`);
          }
        } catch (error: any) {
          return error.message;
        }
      },
    },
    "lite-client": {
      description: "Publish contract",
      fn: async (...params: string[]) => {
        const command = addUserFolderDirectoryToCommand(params);
        terminal.pushToStdout("Publishing...");

        try {
          const result = await Api.contractCommand(`~/liteclient-build/lite-client/lite-client ${command}`);
          if (terminal.isExample) {
            terminal.isExample = false;
          }
          return result;
        } catch (error: any) {
          return error.messgae;
        }
      },
    },
    rm: {
      description: "Remove directory files",
      fn: async (...params: string[]) => {
        const command = addUserFolderDirectoryToCommand(params);
        terminal.pushToStdout("Loading...");
        try {
          const result = await Api.excecute(`rm ${command}`);
          return result;
        } catch (error: any) {
          return error.message;
        }
      },
    },
    commands: {
      description: "All commands",
      fn: async () => {
        return ["ls, rm", "func", "fift", "lite-client"];
      },
    },
    upload: {
      description: "All commands",
      fn: async () => {
        uploadRef.click();
      },
    },
  };
};

export { getCommands };
