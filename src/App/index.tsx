import LoadingScreen from "../components/LoadingScreen";
import useAppLogic from "./useAppLogic";
import Terminal from "../components/Terminal";
import Dropzone from "../components/Dropzone";
import DropContent from "./DropContent";

const App = () => {
  const {
    uploadFiles,
    commands,
    terminalLoading,
    terminalRef,
    uploadRef,
    uploadFromInput,
    startExample
  } = useAppLogic();

  return (
    <div className="app">
      <LoadingScreen show={terminalLoading} />
      <button className="start-example" onClick={startExample}>Start example</button>
      <div className="app-grid">
        <input
          type="file"
          ref={uploadRef}
          onChange={uploadFromInput}
          multiple={true}
        />
        <Dropzone onSelect={uploadFiles} dragActiveComponent={<DropContent />}>
          <Terminal ref={terminalRef} commands={commands} />
        </Dropzone>
      </div>
    </div>
  );
};

export default App;
