import React from "react";

const GalleryImage = ({image}) => {
  return (
    <>
      <div
        style={{
          boxShadow: "2px 2px 6px rgba(0 ,0,0,0.5)",
          border: "1px solid aqua",
          borderRadius: "8px",
          margin: "5px",
        }}
      >
        <img
          style={{
            height: "300px",
            width: "100%",
            overflow: "hidden",
            borderRadius: "8px 8px 0 0",
          }}
          src={image.imageUrl}
          alt="img"
        ></img>
        <h4 style={{ marginLeft: "10px" }}>{image.title}</h4>
        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        ></div>
        {image.tags.map((tag) => {
          return (
            <>
              <span style={{ marginLeft: "3px" }}>#{tag}</span>{" "}
            </>
          );
        })}
      </div>
    </>
  );
};

export default GalleryImage;
