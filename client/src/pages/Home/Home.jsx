import React from "react";
import {
  HomeWrap,
  HomeContainer,
  ImageContainer,
  InformationContainer,
} from "./HomeStyle.js";
import Testing from "../../images/testing.jpeg";

function Home() {
  const fetchUserData = () => {};
  const imageUrl = "";

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
            <img src={Testing || imageUrl} />
          </label>
        </ImageContainer>
        <InformationContainer>
          <div className="group">
            <label for="user" className="label">
              Username
            </label>
            <input id="user" type="text" className="input" />
          </div>

          <div className="group">
            <label for="phone-number" className="label">
              Phone number
            </label>
            <input id="phone-number" type="text" className="input" />
          </div>

          <div className="group">
            <label for="email" className="label">
              Email
            </label>
            <input id="email" type="text" className="input" />
          </div>

          <div className="group">
            <label for="change-password" className="label">
              Change Password
            </label>
            <input id="change-password" type="text" className="input" />
          </div>

          <div className="group">
            <label for="image-url" className="label">
              Image url
            </label>
            <input id="image-url" type="text" className="input" />
          </div>

          <div className="group">
            <label for="bio" className="label">
              Bio
            </label>
            <input id="bio" type="textarea" className="input" />
          </div>

          <div className="group">
            <input type="submit" className="button" value="Update" />
          </div>
        </InformationContainer>
      </HomeContainer>
    </HomeWrap>
  );
}

export default Home;
