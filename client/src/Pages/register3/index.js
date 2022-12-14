import React, { useRef, useState } from "react";
import "./style.css";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { url_database } from "../../api/index";
import InputField from "../../customField/InputField/InputField";
import SelectField from "../../customField/selectField/SelectField";
export default function Register({ setOpenRegister }) {
  console.log(url_database);
  const [goToLogin, setGoToLogin] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const refPhone = useRef();
  const handleGoToLogin = () => {
    // setTimeout(() => {
    setGoToLogin(true);
    setTimeout(() => {
      setOpenRegister(false);
    }, 380);
    // }, 2000);
  };
  console.log(refPhone);
  if (isSuccess) {
    return (
      <div className="container-register">
        <div
          className={!goToLogin ? "form-register" : "form-register closeForm"}
        >
          <h1 style={{ color: "#54B435" }}>Đăng ký thành công</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container-register text-left">
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          city: "",
          street: "",
          password: "",
          gender: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object({
          firstname: Yup.string().required("Vui lòng nhập trường này"),
          lastname: Yup.string().required("Vui lòng nhập trường này"),
          city: Yup.string().required("Vui lòng nhập trường này"),
          street: Yup.string().required("Vui lòng nhập trường này"),

          email: Yup.string()
            .email("Trường này phải là email")
            .required("Vui lòng nhập trường này"),
          gender: Yup.string().required("Chọn giới tính"),

          phone: Yup.string()
            .required("Phone is required")
            .matches(/[0-9]/, "Số điện thoại chỉ bao gồm các chữ số")
            .min(10, "Số điện thoại không đúng")
            .max(10, "Số điện thoại không đúng"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum."),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
        })}
        onSubmit={async (values, { setValues }) => {
          try {
            const {
              firstname,
              lastname,
              email,
              gender,
              city,
              street,
              phone,
              password,
            } = values;
            console.log(values);
            await axios.post(`${url_database}/auth/register`, {
              firstname,
              lastname,
              email,
              gender,
              address: `Đường ${street}, Thành phố ${city}`,
              phone,
              password,
            });
            setIsSuccess(true);
            setTimeout(() => {
              handleGoToLogin();
            }, 2000);
          } catch (err) {
            values.phone = "";
            values.email = "";
            refPhone.current.focus();
            setTimeout(() => {
              setErrorRegister(false);
            }, 3000);
            setErrorRegister(true);
            console.log(err.response);
          }
        }}
      >
        <Form
          className={!goToLogin ? "form-register" : "form-register closeForm"}
        >
          <h1 className="text-2xl">Đăng ký tài khoản</h1>
          <div className="container-2field">
            <FastField name="firstname">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Nguyễn"
                  label="Họ"
                />
              )}
            </FastField>
            <FastField name="lastname">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Lâm"
                  label="Name"
                />
              )}
            </FastField>
          </div>
          <div className="container-2field">
            {errorRegister && (
              <p className="error-register">
                Số điện thoại hay email đã được sử dụng
              </p>
            )}
            <FastField name="phone">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, 0123456789"
                  label="Phone"
                  ref={refPhone}
                />
              )}
            </FastField>
            <FastField name="gender">
              {(props) => (
                <SelectField {...props} label="Giới tính">
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </SelectField>
              )}
            </FastField>
          </div>
          <div className="container-2field">
            <FastField name="street">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Quang Bửu"
                  label="Đường"
                />
              )}
            </FastField>
            <FastField name="city">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Đà nẵng"
                  label="Thành phố"
                />
              )}
            </FastField>
          </div>
          <FastField name="email">
            {(props) => (
              <InputField
                {...props}
                type="email"
                placeholder="e.g, Cuteo@gmail.com"
                label="Email"
              />
            )}
          </FastField>
          <FastField name="password">
            {(props) => (
              <InputField
                type="password"
                {...props}
                placeholder="e.g, ................"
                label="Mật khẩu"
              />
            )}
          </FastField>
          <FastField name="passwordConfirmation">
            {(props) => (
              <InputField
                type="password"
                {...props}
                placeholder="e.g, ................"
                label="Xác nhận mật khẩu"
              />
            )}
          </FastField>
          <button type="submit" className="button-primary">
            Đăng ký
          </button>
          <button
            type="button"
            className="button-secondary"
            onClick={handleGoToLogin}
          >
            Đi đến đăng nhập
          </button>
        </Form>
      </Formik>
    </div>
  );
}
