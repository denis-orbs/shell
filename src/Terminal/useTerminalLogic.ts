import { useEffect, useState } from "react";
import Api from "../services/Api";
import { createCommads, validateFilesBeforeUpload } from "./util";
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function useTerminalLogic() {
  const [uploadFilesLoading, setUploadFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState(false);
  const [commands, setCommands] = useState(undefined);
  const [filesUploadSuccess, setFilesUploadSuccess] = useState(false);
  const [terminalLoading, setTerminalLoading] = useState(true);

  const hideFilesUploadingSuccess = () => {
    setFilesUploadSuccess(false);
  };

  const uploadFiles = async (files: File[]) => {
    const errorsInFiles = validateFilesBeforeUpload(files);

    if (errorsInFiles) {
      setFilesError(true);
      await delay(3000);
      setFilesError(false);
    } else {
      try {
        setUploadFilesLoading(true);
        await Api.uploadFile(files);
        onFileUploadedSuccess();
      } catch (error) {
      } finally {
        await delay(1500);
        setUploadFilesLoading(false);
      }
    }
  };

  const onFileUploadedSuccess = async () => {
    await delay(2000);
    setFilesUploadSuccess(true);
    await delay(3000);
    setFilesUploadSuccess(false);
  };

  const getCommands = async () => {
    try {
      const result = await Api.getCommands();

      setCommands(createCommads(result));
    } catch (error) {
    } finally {
       await delay(1000)
      setTerminalLoading(false);
    }
  };

  return {
    uploadFilesLoading,
    setUploadFilesLoading,
    uploadFiles,
    commands,
    getCommands,
    filesError,
    filesUploadSuccess,
    hideFilesUploadingSuccess,
    terminalLoading
  };
}

export default useTerminalLogic;
