import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import GalleryImage from "../compoenets/GalleryImage";
import { signOut } from "firebase/auth";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [input, setInput] = useState("");
  const [sortValue, setSortValue] = useState("");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/signup");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!input) {
      setFilteredImages(images);
      return;
    }

    const filtered = images.filter((image) => {
      return (
        image.title.toLowerCase().includes(input) || image.tags.includes(input)
      );
    });

    setFilteredImages(filtered);
  }, [input]);

  useEffect(() => {
    console.log(sortValue);
    if (!sortValue) {
      setFilteredImages(images);
      return;
    }

    if (sortValue === "desc") {
      filteredImages.sort(
        (a, b) =>
          a.title.localeCompare(b.title) - b.title.localeCompare(a.title)
      );
    } else if (sortValue === "asc") {
      filteredImages.sort(
        (a, b) =>
          b.title.localeCompare(a.title) - a.title.localeCompare(b.title)
      );
    }
  }, [sortValue]);

  useEffect(() => {
    const imagesRef = ref(db, `images`);

    const unsubscribe = onValue(imagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const loadedImges = Object.values(data);

        setImages(loadedImges);
        setFilteredImages(loadedImges);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user]);

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          placeholder="Search images by title or tags"
          type="text"
          value={input}
          style={{ padding: "10px", width: "300px" }}
          onChange={(e) =>
            debounce(setInput(e.target.value.toLowerCase()), 300)
          }
        ></input>

        <select onChange={(e) => setSortValue(e.target.value)}>
          <option value="">Sort</option>
          <option value="asc">title [asc]</option>
          <option value="desc">title [desc]</option>
        </select>

        <h4 style={{ cursor: "pointer" }} onClick={signOutHandler}>
          SignOut
        </h4>
      </div>
      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {images.length == 0 ? (
          <p>Loading images yet</p>
        ) : (
          filteredImages.map((image) => {
            return <GalleryImage image={image} />;
          })
        )}
      </div>
    </>
  );
};

export default Gallery;
