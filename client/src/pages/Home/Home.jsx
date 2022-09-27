import React, { useState } from "react";
import {
  HomeWrap,
  HomeContainer,
  ImageContainer,
  InformationContainer,
} from "./HomeStyle.js";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home({ response, setResponse }) {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    setData({ ...response.data });
  }, []);

  const handleUpdate = async () => {
    // console.log("Simple sign up");
    const api = "http://localhost:3737";
    const body = {
      ...data,
    };
    console.log(body);
    await axios
      .post(`${api}/update`, body)
      .then((res) => {
        console.log(res);
        setResponse({ ...(res?.data || "") });
      })
      .catch((error) => {
        console.log(error);
        setResponse({ ...(error?.data || "") });
        navigate("/");
      });

    await axios
      .post(`${api}/image_update`, body)
      .then((res) => {
        console.log(res);
        setResponse({ ...(res?.data || "") });
      })
      .catch((error) => {
        console.log(error);
        setResponse({ ...(error?.data || "") });
        navigate("/");
      });
  };

  const signout = () => {
    setResponse({});
    navigate("/login");
  };

  const imageUrl = response.data.image_url;
  return (
    <HomeWrap>
      <HomeContainer>
        <ImageContainer>
          <input
            id="input-image-upload"
            type="file"
            accept=".jpeg,.png,.jpg,.svg"
          />
          <label id="image-upload" htmlFor="input-image-upload">
            <img src={imageUrl} />
          </label>
        </ImageContainer>
        <InformationContainer>
          <div className="group">
            <label for="user" className="label">
              Username
            </label>
            <input
              id="user"
              type="text"
              className="input"
              value={data.name}
              onChange={(event) => {
                setData({
                  ...data,
                  name: event.target.value,
                });
              }}
            />
          </div>

          <div className="group">
            <label for="phone-number" className="label">
              Phone number
            </label>
            <input
              id="phone-number"
              type="text"
              className="input"
              value={data.phone}
              onChange={(event) => {
                setData({
                  ...data,
                  phone: event.target.value,
                });
              }}
            />
          </div>

          <div className="group">
            <label for="email" className="label">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="input"
              value={data.email}
              onChange={(event) => {
                setData({
                  ...data,
                  email: event.target.value,
                });
              }}
            />
          </div>

          <div className="group">
            <label for="change-password" className="label">
              Change Password
            </label>
            <input
              id="change-password"
              type="text"
              className="input"
              value={data?.password}
              onChange={(event) => {
                setData({
                  ...data,
                  password: event.target.value,
                });
              }}
            />
          </div>

          <div className="group">
            <label for="image-url" className="label">
              Image url
            </label>
            <input
              id="image-url"
              type="text"
              className="input"
              value={data?.image_url}
              onChange={(event) => {
                setData({
                  ...data,
                  image_url: event.target.value,
                });
              }}
            />
          </div>

          <div className="group">
            <label for="bio" className="label">
              Bio
            </label>
            <input
              id="bio"
              type="textarea"
              className="input"
              value={data?.bio}
              onChange={(event) => {
                setData({
                  ...data,
                  bio: event.target.value,
                });
              }}
            />
          </div>

          <div className="group group-button">
            <input
              type="submit"
              className="button"
              value="Update"
              onClick={() => handleUpdate()}
            />
            <input
              type="submit"
              className="button"
              value="Sign out"
              onClick={() => signout()}
            />
          </div>

          {/* <div className="group" onClick={() => signout()}>
            <input type="submit" className="button" value="Sign out" />
          </div> */}
        </InformationContainer>
      </HomeContainer>
    </HomeWrap>
  );
}

export default Home;
