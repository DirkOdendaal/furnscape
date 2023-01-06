import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineDelete } from "react-icons/ai";

const UploadAndDisplayImage = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setImages(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [images]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpeg"] },
    maxFiles: 4,
  });

  return (
    <div className="image-outer-dropzone">
      <div {...getRootProps()} className="image-dropzone">
        <input {...getInputProps()} />
        <p>Upload Product Images</p>
        <em>(Max 4 Images)</em>
      </div>
      <div className="images">
        {images.map((img, index) => (
          <div key={index} className="zoned-images">
            <Image
              alt=""
              className="product-image"
              width={100}
              height={100}
              src={URL.createObjectURL(img)}
            />
            <div className="space-top">
              <AiOutlineDelete className="action-button-delete" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadAndDisplayImage;
