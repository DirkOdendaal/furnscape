import Image from "next/image";
import React, { useState, useEffect } from "react";

const UploadAndDisplayImage = () => {
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setImages([]);
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div>
      <div>
        {images.map((img, index) => (
          <Image
            key={index}
            alt=""
            width={150}
            height={150}
            src={URL.createObjectURL(img)}
          />
        ))}
      </div>
      <input type="file" multiple onChange={handleChange} />
    </div>
  );
};

export default UploadAndDisplayImage;
