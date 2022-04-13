import { useCallback, useEffect, useRef, useState } from "react";
import { MAX_FILE_SIZE } from "../consts";
import Api from "../services/Api";
import { getCommands } from "./commands";
import { validateFilesBeforeUpload } from "./util";
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function useAppLogic() {
  const [uploadFilesLoading, setUploadFilesLoading] = useState(false);
  const [filesError] = useState(false);
  const [commands, setCommands] = useState<any>({});
  const [filesUploadSuccess, setFilesUploadSuccess] = useState(false);
  const [terminalLoading, setTerminalLoading] = useState(true);
  const terminalRef = useRef<any>(null);
  const uploadRef = useRef<any>(null);

  const hideFilesUploadingSuccess = useCallback(() => {
    setFilesUploadSuccess(false);
  }, []);

  const uploadFiles = useCallback(async (files: File[]) => {
    const errorsInFiles = validateFilesBeforeUpload(files);

    if (errorsInFiles) {
      terminalRef.current.pushToStdout(
        `File size limit is ${MAX_FILE_SIZE / 1000000} MB`
      );
      return;
    }

    terminalRef.current.pushToStdout("Uploading...");
    try {
      await Api.uploadFile(files);
      terminalRef.current.pushToStdout("Files uploaded");
    } catch (error) {
      terminalRef.current.pushToStdout("Error while uploading");
    }
  }, []);

  const createCommands = useCallback(async () => {
    const list = getCommands(terminalRef.current, uploadRef.current);
    setCommands(list);
    await Api.verifyCookie();
    setTerminalLoading(false);
  }, []);

  const uploadFromInput = useCallback(
    (e: any) => {
      const files = e.target.files;
      const result: File[] = [];
      Object.keys(files).forEach(function (key, index) {
        result.push(files[key]);
      });
      uploadFiles(result);
    },
    [uploadFiles]
  );

  useEffect(() => {
    createCommands();
  }, [createCommands]);

  const startExample = async () => {
    terminalRef.current.isExample = true;
    terminalRef.current.props.commands.runExample.fn();
  };

  return {
    uploadFilesLoading,
    setUploadFilesLoading,
    uploadFiles,
    commands,
    createCommands,
    filesError,
    filesUploadSuccess,
    hideFilesUploadingSuccess,
    terminalLoading,
    terminalRef,
    uploadRef,
    uploadFromInput,
    startExample,
  };
}

export default useAppLogic;
