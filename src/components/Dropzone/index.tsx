import { forwardRef, ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  children?: ReactNode;
  onSelect: (files: File[]) => void;
  dragActiveComponent?: ReactNode;
}

const Dropzone = forwardRef(
  ({ children, onSelect, dragActiveComponent }: Props, ref: any) => {
    const onDrop = useCallback(async (acceptedFiles: any) => {
      onSelect(acceptedFiles);
    }, [onSelect]);

    const { getRootProps, isDragActive } = useDropzone({
      onDrop,
      noKeyboard: true,
    });

    const onClick = (evt: any) => {
      if (evt.isDefaultPrevented()) {
        return;
      }
    };

    return (
      <div  {...getRootProps()} className="dropzone" onClick={onClick}>
        {isDragActive && dragActiveComponent}
        {children}
      </div>
    );
  }
);

export default Dropzone;
