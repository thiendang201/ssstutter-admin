import {
  CloudImageProps,
  makeDeleteRequest,
  makeUploadRequest
} from 'common/utils/cloudinaryHelper';
import {
  FilePondFile,
  ProcessServerConfigFunction,
  ActualFileObject,
  ProgressServerConfigFunction,
  ProcessServerChunkTransferOptions
} from 'filepond';
import * as React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FieldContainer from 'common/components/InputField/FieldContainer';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

interface ImageFieldProps {
  required?: boolean;
  label?: string;
  value: string[] | string;
  error?: string;
  name: string;
  placeHolder?: string;
  allowMultiple?: boolean;
  maxFile?: number;
  keyReload?: number;
  onChange: (value: CloudImageProps) => void;
  onRevert: (value: string) => void;
}

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

const ImageField = ({
  required,
  label,
  error,
  value,
  allowMultiple = false,
  maxFile = 1,
  keyReload,
  onChange,
  onRevert
}: ImageFieldProps) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [allowProccess, setAllowProcess] = React.useState(false);
  // const allowProccess = !value.length || value.length < maxFile;

  const fetchImage = (url: string) => fetch(url).then((res) => res.blob());

  const fetchAllImage = async () => {
    if (value.length === 0) {
      setFiles([]);
      return;
    }

    if (!Array.isArray(value)) {
      const image = await fetchImage(value);
      setFiles([image as unknown as File]);
      return;
    }

    const blobs: Blob[] = [];

    for (let i of value) {
      const blob = await fetchImage(i);
      blobs.push(blob);
    }

    setFiles(blobs as unknown as File[]);
  };

  React.useEffect(() => {
    setAllowProcess(false);
    fetchAllImage();
  }, [keyReload, value]);

  React.useEffect(() => {
    setAllowProcess(!files.length);
  }, [files]);

  const handleUpdateFile = (files: FilePondFile[]) => {
    setFiles(files as unknown as File[]);
  };

  const revert = (
    token: string,
    successCallback: () => void,
    errorCallback: (message: string) => void
  ) => {
    makeDeleteRequest({
      token,
      successCallback,
      errorCallback,
      onRevert
    });
  };

  const process: ProcessServerConfigFunction = (
    fieldName: string,
    file: ActualFileObject,
    metadata: {
      [key: string]: any;
    },
    load: (
      p:
        | string
        | {
            [key: string]: any;
          }
    ) => void,
    error: (errorText: string) => void,
    progress: ProgressServerConfigFunction,
    abort: () => void,
    transfer: (transferId: string) => void,
    options: ProcessServerChunkTransferOptions
  ) => {
    const abortRequest = makeUploadRequest({
      file,
      fieldName,
      successCallback: load,
      errorCallback: error,
      progressCallback: progress,
      onChange
    });

    return {
      abort: () => {
        abortRequest();
        abort();
      }
    };
  };

  return (
    <FieldContainer required={required} label={label} error={error}>
      <FilePond
        files={files}
        instantUpload={allowProccess}
        acceptedFileTypes={['image/*']}
        onupdatefiles={handleUpdateFile}
        allowMultiple={allowMultiple}
        maxFiles={maxFile}
        server={{
          process,
          revert
        }}
        name='file'
        labelIdle='Kéo & thả ảnh của bạn vào đây hoặc <span class="filepond--label-action">duyệt file</span>'
        className=''
      />
    </FieldContainer>
  );
};

export default ImageField;
