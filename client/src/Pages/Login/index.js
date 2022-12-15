import "./index.css";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
import Register from "../register3";
import InputField from "../../customField/InputField/InputField";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { url_database } from "../../api";
const LoginPage = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const { setUser, setJwt } = useGlobalContext();
  const refPassword = useRef();
  const refPhoneEmail = useRef();
  return (
    <>
      <div className="page-login text-left">
        <div className="container-form">
          <h1 className="text-3xl">Đăng nhập</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string().required("Vui lòng nhập trường này"),
              password: Yup.string()
                .min(6, "Mật khẩu ít nhất 6 ký tự")
                .required("Vui lòng nhập trường này"),
            })}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                console.log(`${url_database}/auth/login`);
                const data = await axios.post(
                  `${url_database}/auth/login`,
                  values
                );
                setJwt(data.data.result.accessToken);
                setUser(data.data.result.user);
              } catch (err) {
                const res = err.response.data;
                if (!res.phoneEmail) {
                  setFieldError("email", "Email không dúng");
                  values.password = "";
                  values.email = "";
                  refPhoneEmail.current.focus();
                } else {
                  setFieldError("password", "Mật khẩu không chính xác");
                  values.password = "";
                  refPassword.current.focus();
                }
              }
              setSubmitting(false);
            }}
          >
            <Form className="formLogin">
              <FastField name="email">
                {(props) => (
                  <InputField
                    {...props}
                    type="email"
                    placeholder="Email"
                    label="Email"
                    ref={refPhoneEmail}
                  />
                )}
              </FastField>
              <FastField name="password">
                {(props) => (
                  <InputField
                    {...props}
                    type="password"
                    placeholder="Mật khẩu"
                    label="Mật khẩu"
                    ref={refPassword}
                  />
                )}
              </FastField>
              <button type="submit" className="button-primary">
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => setOpenRegister(true)}
                className="button-secondary"
              >
                Đăng ký
              </button>
              <a className="forget-password">Quên mật khẩu</a>
            </Form>
          </Formik>
        </div>
      </div>
      {openRegister && <Register setOpenRegister={setOpenRegister} />}
    </>
  );
};

export default LoginPage;
