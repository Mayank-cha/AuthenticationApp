import styled from "styled-components";

export const HomeWrap = styled.div` z-index: 100;
background-color: rgba(40,57,101,.9);
position: absolute;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
}`;

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  /* position:absolute; */
  max-height: 640px;
  max-width: 800px;
  padding: 48px;
  box-shadow: 5px 2px 16px 5px;
  /* background:rgba(40,57,101,.9); */
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

export const ImageContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  input {
    display: none;
  }
`;

export const InformationContainer = styled.div`
  flex: 1;
  .group {
    .input,
    .button,
    .label {
      display: block;
      width: 100%;
    }

    .input,
    .button {
      border: none;
      padding: 15px 20px;
      border-radius: 25px;
      background: rgba(255, 255, 255, 0.1);
    }

    .button {
      background: #1161ee;
    }

    .label {
      color: #aaa;
      font-size: 12px;
      text-transform: uppercase;
    }
  }
`;
