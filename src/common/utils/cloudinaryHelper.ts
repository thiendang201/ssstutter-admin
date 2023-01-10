import { ActualFileObject } from 'filepond';

export const baseUrl = `https://api.cloudinary.com/v1_1/tdclound201`;

export interface CloudImageProps {
  delete_token: string;
  link: string;
}

interface UploadRequestProps {
  file: ActualFileObject;
  fieldName: string;
  progressCallback: (
    lengthComputable: boolean,
    loaded: number,
    total: number
  ) => void;
  successCallback: (deleteToken: string) => void;
  errorCallback: (message: string) => void;
  onChange: (value: CloudImageProps) => void;
}

interface DeleteRequestProps {
  token: string;
  successCallback: () => void;
  errorCallback: (message: string) => void;
  onRevert: (value: string) => void;
}

export const makeUploadRequest = ({
  file,
  fieldName,
  progressCallback,
  successCallback,
  errorCallback,
  onChange
}: UploadRequestProps) => {
  const url = `${baseUrl}/image/upload`;

  const formData = new FormData();
  formData.append(fieldName, file);
  formData.append('upload_preset', 'my_upload');
  // formData.append('return_delete_token', 'true');

  const request = new XMLHttpRequest();
  request.open('POST', url);

  request.upload.onprogress = (e) => {
    progressCallback(e.lengthComputable, e.loaded, e.total);
  };

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      const { public_id: deleteToken, secure_url } = JSON.parse(
        request.response
      );
      onChange({
        delete_token: deleteToken,
        link: secure_url
      });
      successCallback(deleteToken);
    } else {
      errorCallback(request.responseText);
    }
  };

  request.send(formData);

  return () => {
    request.abort();
  };
};

export const makeDeleteRequest = ({
  token,
  successCallback,
  errorCallback,
  onRevert
}: DeleteRequestProps) => {
  const url = `${baseUrl}/image/destroy`;

  const request = new XMLHttpRequest();
  request.open('POST', url);

  request.setRequestHeader('Content-Type', 'application/json');

  onRevert(token);

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      successCallback();
    } else {
      errorCallback(request.responseText);
    }
  };

  request.send(
    JSON.stringify({
      public_id: token,
      // signature: '',
      api_key: '938399516944169',
      api_secret: 'nuONKiIJij4iMPUr7P1J_nxQ7qY'
    })
  );
};
