import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import InputField from "../../customField/InputField/InputField";
import SelectField from "../../customField/selectField/SelectField";
import * as Yup from "yup";
import axios from "axios";
import { url_database } from "../../api";
export const Profile = () => {
  const { user } = useGlobalContext();
  const [disabledEdit, setDisabledEdit] = useState(true);
  return (
    <div className="min-height">
      <Formik
        initialValues={{
          firstname: user.firstname,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          address: user.address,
          password: user.password,
          gender: user.gender,
        }}
        validationSchema={Yup.object({
          firstname: Yup.string().required("Vui lòng nhập trường này"),
          lastname: Yup.string().required("Vui lòng nhập trường này"),
          address: Yup.string().required("Vui lòng nhập trường này"),

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
          //   passwordConfirmation: Yup.string().oneOf(
          //     [Yup.ref("password"), null],
          //     "Passwords must match"
          //   ),
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
          } catch (err) {
            console.log(err.response);
          }
        }}
      >
        <Form className={"form-register text-left m-auto"}>
          <h1 className="text-2xl">Quản lý tài khoản</h1>
          <div className="container-2field">
            <FastField name="firstname">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Nguyễn"
                  label="Họ"
                  disabled={disabledEdit}
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
                  disabled={disabledEdit}
                />
              )}
            </FastField>
          </div>
          <div className="container-2field">
            <FastField name="phone">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, 0123456789"
                  label="Phone"
                  disabled={disabledEdit}
                />
              )}
            </FastField>
            <FastField name="gender">
              {(props) => (
                <SelectField
                  {...props}
                  disabled={disabledEdit}
                  label="Giới tính"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </SelectField>
              )}
            </FastField>
          </div>
          <FastField name="address">
            {(props) => (
              <InputField
                {...props}
                type="text"
                placeholder="e.g,PVD"
                label="Address"
                disabled={disabledEdit}
              />
            )}
          </FastField>
          <FastField name="email">
            {(props) => (
              <InputField
                {...props}
                type="email"
                placeholder="e.g, Cuteo@gmail.com"
                label="Email"
                disabled={disabledEdit}
              />
            )}
          </FastField>
          <FastField name="password">
            {(props) => (
              <InputField
                disabled={disabledEdit}
                type="password"
                {...props}
                placeholder="e.g, ................"
                label="Mật khẩu"
              />
            )}
          </FastField>
          {/* <FastField name="passwordConfirmation">
            {(props) => (
              <InputField
                type="password"
                {...props}
                placeholder="e.g, ................"
                label="Xác nhận mật khẩu"
              />
            )}
          </FastField> */}
          <button
            className="bg-black transition text-white p-2 mt-5 border-2 border-solid border-black"
            onClick={() => setDisabledEdit(false)}
          >
            Chỉnh sửa thông tin
          </button>
          <button className="ml-2 bg-white transition text-black border-2 border-solid border-black p-2 mt-5">
            Thây đổi mật khẩu
          </button>
        </Form>
      </Formik>
    </div>
  );
};
