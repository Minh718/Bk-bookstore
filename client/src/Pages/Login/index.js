import "./index.css";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
import Register from "../register3";
import InputField from "../../customField/InputField/InputField";
import axios from "axios";
const LoginPage = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const refPassword = useRef();
  const refPhoneEmail = useRef();
  return (
    <>
      <div className="page-login text-left">
        {/* <div className="slide-film">
          <h1>Buy book heere</h1>
        </div> */}
        <div className="container-form">
          <h1 className="text-3xl">Đăng nhập</h1>
          <Formik
            initialValues={{
              phoneEmail: "",
              password: "",
            }}
            validationSchema={Yup.object({
              phoneEmail: Yup.string().required("Vui lòng nhập trường này"),
              password: Yup.string()
                .min(8, "Mật khẩu ít nhất 8 ký tự")
                .required("Vui lòng nhập trường này"),
            })}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                // const data = await axios.post(
                //   `${url_database}/users/login`,
                //   values
                // );
                // // console.log(data);
                // setUser(data.data);
              } catch (err) {
                const res = err.response.data;
                console.log(res);
                if (!res.phoneEmail) {
                  setFieldError(
                    "phoneEmail",
                    "Email hoặc số điện thoại không dúng"
                  );
                  values.password = "";
                  values.phoneEmail = "";
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
              <FastField name="phoneEmail">
                {(props) => (
                  <InputField
                    {...props}
                    type="text"
                    placeholder="Email hoặc số điện thoại"
                    label="Email hoặc số điện thoại"
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
                outline
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
