import React, { useRef, useState } from "react";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputField from "../../../../customField/InputField/InputField";
import SelectField from "../../../../customField/selectField/SelectField";
export const AddAdmin = () => {
  const [goToLogin, setGoToLogin] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const refPhone = useRef();
  return (
    <div className="flex p-[40px] text-left">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
          gender: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Vui lòng nhập trường này"),
          lastName: Yup.string().required("Vui lòng nhập trường này"),
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
        <Form className=" max-w-md p-4 border-2 border-solid border-black">
          <h1 className="text-3xl">Đăng ký tài khoản Admin</h1>
          <div className="container-2field">
            <FastField name="firstName">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Nguyễn"
                  label="Họ"
                />
              )}
            </FastField>
            <FastField name="lastName">
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
                  <option value="nam">Nam</option>
                  <option value="nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </SelectField>
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
        </Form>
      </Formik>
    </div>
  );
};
