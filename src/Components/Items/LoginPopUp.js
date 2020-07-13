/* eslint-disable */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import PopUp from '../../Style/PopUp';
import { BasicBtn } from '../../Style/BasicBtn';
import api from '../../Utils/LoginApi';

const LoginPopUpBlock = styled.div``;
const LoginForm = styled.form`
  padding: 48px 36px 0 36px;

  color: rgb(45, 49, 56);
  text-align: center;

  h3 {
    margin: 0 0 10px 0;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -1.16px;
  }
  input {
    width: 335px;

    margin-left: 14px;
    margin-right: 14px;
    padding: 22px 0;

    color: rgb(45, 49, 56);

    font-size: 16px;
    letter-spacing: 0.14px;
    text-align: center;
    font-weight: 200;

    border: 0;
    border-bottom: 1px solid rgb(217, 219, 224);
  }
  button {
    margin: 20px 0 0 0;
  }
`;

const Alert = styled.div`
  color: rgb(0, 204, 153);
`;

const LoggedInStatus = styled.div`
  color: black;
`;
const CartBtn = styled.div`
  color: black;
  width: 100%;
`;

const Input = ({ label, register, validation, pattern, ...rest }) => (
  <>
    <input name={label} ref={register(validation, pattern)} {...rest} />
  </>
);

const LoginPopUp = ({ setState, openState }) => {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const { register, handleSubmit, errors, reset, watch } = useForm();

  const onSubmit = async (_data) => {
    console.log(_data);

    try {
      const { data } = await api.post('/api/v1/members/login', {
        id: _data.email,
        password: _data.password,
      });
      console.log(data);
    } finally {
      reset();
      setLoggedIn(false);
    }
  };

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  return (
    <LoginPopUpBlock>
      {isLoggedIn && (
        <>
          <PopUp
            width="435px"
            height="512px"
            setState={setState}
            openState={openState}
          >
            <LoginForm onSubmit={handleSubmit(onSubmit)} method="POST">
              <h3>Log in</h3>
              <em>Enter your</em>
              <Input
                label="email"
                placeholder="email"
                register={register}
                validation={{
                  required: true,
                  minLength: 5,
                  pattern: /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                }}
              />
              {errors.email && <Alert>Not a valid email.</Alert>}
              <Input
                label="password"
                placeholder="password"
                register={register}
                validation={{ required: true, minLength: 8 }}
              />
              {errors.password && (
                <Alert>The password must be at least 8 characters long.</Alert>
              )}
              <BasicBtn
                active={watchEmail && watchPassword ? true : false}
                text="SIGN IN"
                width="363px"
                twidth="363px"
              />
            </LoginForm>
          </PopUp>
        </>
      )}
      <LoggedInStatus>
        {!isLoggedIn && <span>human</span>}
        {!isLoggedIn && (
          <CartBtn>
            <span>1</span>
          </CartBtn>
        )}
      </LoggedInStatus>
    </LoginPopUpBlock>
  );
};

export default LoginPopUp;
