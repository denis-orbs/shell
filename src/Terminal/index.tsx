import { useCallback, useEffect } from "react";
import { ReactTerminal, TerminalContextProvider } from "react-terminal";
import { useDropzone } from "react-dropzone";
import FileUploadingNotification from "./Notifications/FileUploadingNotification";
import useTerminalLogic from "./useTerminalLogic";
import FileErrorNotification from "./Notifications/FileErrorNotification";
import FileUploadingSuccess from "./Notifications/FileUploadingSuccess";
import LoadingScreen from "../components/LoadingScreen";

const Fade = require("react-reveal/Fade");

function Terminal() {
  const {
    uploadFiles,
    uploadFilesLoading,
    commands,
    getCommands,
    filesError,
    filesUploadSuccess,
    terminalLoading
  } = useTerminalLogic();

  useEffect(() => {
    getCommands();
  }, []);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    uploadFiles(acceptedFiles);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
  });

  const onClick = (evt: any) => {
    if (evt.isDefaultPrevented()) {
      return;
    }
  };

  if (!commands) {
    return null;
  }

  return (
    <div className="terminal">
      <LoadingScreen show={terminalLoading} />
      <div className="terminal-grid">
      {isDragActive && (
        <div className="terminal-drop-text">
          <Fade>
            <section>
              <h3>Drop files</h3>
            </section>
          </Fade>
        </div>
      )}
      <div {...getRootProps()} className="dropzone" onClick={onClick}>
        <TerminalContextProvider>
          <ReactTerminal
            commands={commands}
            welcomeMessage="TonShell"
            showControlButtons={false}
            showControlBar={false}
            themes={{
              "my-custom-theme": {
                themeBGColor: "#272B36",
                themeColor: "#FFFEFC",
                themePromptColor: "#FFFEFC",
              },
            }}
            theme="my-custom-theme"
          />
        </TerminalContextProvider>
      </div>
      </div>
      <FileUploadingNotification show={uploadFilesLoading} />
      <FileErrorNotification show={filesError} />
      <FileUploadingSuccess show={filesUploadSuccess} />
    </div>
  );
}

export default Terminal;
