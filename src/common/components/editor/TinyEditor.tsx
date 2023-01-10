import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import FieldContainer from '../InputField/FieldContainer';
import { baseUrl } from 'common/utils/cloudinaryHelper';

interface TinyEditorProps {
  required?: boolean;
  label?: string;
  value: string;
  error?: string;
  name: string;
  placeHolder?: string;
  onChange: (value: string) => void;
}

export const TinyEditor = ({
  required,
  label,
  value,
  error,
  name,
  onChange
}: TinyEditorProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <FieldContainer required={required} label={label} error={error}>
      <Editor
        apiKey={import.meta.env.VITE_TINY_EDITOR_KEY}
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        value={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | preview fullscreen | ' +
            'table image | ' +
            'link anchor | ' +
            'bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_file_types: 'jpg,svg,png,webp',
          file_picker_types: 'image',
          automatic_uploads: true,
          images_upload_handler: (blobInfo, process) =>
            new Promise((resolve, reject) => {
              const url = `${baseUrl}/image/upload`;

              const formData = new FormData();
              formData.append('file', blobInfo.blob());
              formData.append('upload_preset', 'my_upload');
              // formData.append('return_delete_token', 'true');

              const request = new XMLHttpRequest();
              request.open('POST', url);

              request.upload.onprogress = (e) => {
                process((e.loaded / e.total) * 100);
              };

              request.onload = () => {
                if (request.status === 403) {
                  reject({
                    message: 'HTTP Error: ' + request.status,
                    remove: true
                  });
                  return;
                }

                if (request.status < 200 || request.status >= 300) {
                  reject('HTTP Error: ' + request.status);
                  return;
                }

                const { public_id: deleteToken, secure_url } = JSON.parse(
                  request.response
                );

                resolve(secure_url);
              };

              request.onerror = () => {
                reject(
                  'Image upload failed due to a XHR Transport error. Code: ' +
                    request.status
                );
              };

              request.send(formData);
            }),
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.addEventListener('change', (event) => {
              const target = event.target as HTMLInputElement;
              const file = target.files?.item(0);

              if (!file) return;

              const reader = new FileReader();
              reader.addEventListener('load', () => {
                const id = 'blobid' + new Date().getTime();

                const blobCache = editorRef.current?.editorUpload.blobCache;

                if (!blobCache) return;

                const base64 = (reader.result as string).split(',')[1];
                const blobInfo = blobCache.create(id, file as Blob, base64);
                blobCache.add(blobInfo);

                cb(blobInfo?.blobUri(), { title: file.name });
              });

              reader.readAsDataURL(file);
            });

            input.click();
          }
        }}
        onEditorChange={onChange}
        textareaName={name}
      />
    </FieldContainer>
  );
};
