import React, { useRef, useState } from "react";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputField from "../../../../customField/InputField/InputField";
import SelectField from "../../../../customField/selectField/SelectField";
import { FaFileImage } from "react-icons/fa";
export const AddBook = () => {
  const [errorRegister, setErrorRegister] = useState(false);
  return (
    <div className="flex p-[40px] text-left">
      <Formik
        initialValues={{
          file: null,
          PublishedYear: "",
          Sumary: "",
          name: "",
          Author: "",
          Price: "",
          numberBooks: "",
          TypeBook: "",
        }}
        validationSchema={Yup.object({
          file: Yup.mixed().required("Vui lòng thêm file ảnh"),
          Sumary: Yup.string().required("Vui lòng nhập trường này"),
          name: Yup.string().required("Vui lòng nhập trường này"),
          Price: Yup.number().required("Vui lòng nhập trường này"),
          PublishedYear: Yup.number().required("Vui lòng nhập trường này"),
          numberBooks: Yup.number().required("Vui lòng nhập trường này"),
          Author: Yup.string().required("Vui lòng nhập trường này"),
          TypeBook: Yup.string().required("Vui lòng chọn loại sách"),
        })}
        onSubmit={(values, { setValues }) => {
          try {
            console.log(values);
          } catch (err) {
            setTimeout(() => {
              setErrorRegister(false);
            }, 3000);
            setErrorRegister(true);
            console.log(err.response);
          }
        }}
      >
        <Form className=" max-w-md p-4 border-2 border-solid border-black">
          <h1 className="text-3xl">Thêm sách</h1>
          <div className="container-2field">
            <FastField name="name">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Es"
                  label="Tên sách"
                />
              )}
            </FastField>
            <FastField name="PublishedYear">
              {(props) => (
                <InputField
                  type="number"
                  {...props}
                  placeholder="e.g, 1980"
                  label="Năm xuất bản"
                />
              )}
            </FastField>
          </div>
          <div className="container-2field">
            <FastField name="Price">
              {(props) => (
                <InputField
                  type="number"
                  {...props}
                  placeholder="e.g, 35000 VNĐ"
                  label="Giá sản phẩm"
                />
              )}
            </FastField>
            <FastField name="TypeBook">
              {(props) => (
                <SelectField {...props} label="Giới tính">
                  <option value="">Chọn giới tính</option>
                  <option value="nam">Thảm hiểm</option>
                  <option value="nữ">Đào núi</option>
                  <option value="Khác">Lấp biển</option>
                </SelectField>
              )}
            </FastField>
          </div>
          <div className="container-2field">
            <FastField name="Author">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Es"
                  label="Tên tác giả"
                />
              )}
            </FastField>
            <FastField name="numberBooks">
              {(props) => (
                <InputField
                  type="number"
                  {...props}
                  placeholder="e.g, 50"
                  label="Số lượng sách"
                />
              )}
            </FastField>
          </div>
          <FastField name="Sumary">
            {(props) => (
              <>
                <label htmlFor={props.field.name}>Thông tin về sách</label>
                <textarea
                  {...props.field}
                  className="w-full border-solid border-2 border-l-neutral-500 p-1 rounded min-h-[100px]"
                  placeholder="Giớ thiệu về sách"
                />
                <ErrorMessage
                  name="Sumary"
                  component="div"
                  className="message-error"
                />
              </>
            )}
          </FastField>
          <FastField name="file">
            {(props) => (
              <>
                {/* <label htmlFor={props.field.name}>
                  Ảnh bìa sách
                  <input {...props.field} type="file" className="hidden file" />
                </label> */}
                <label className="file flex items-center">
                  <div className="mr-2">Ảnh bìa sách</div> <FaFileImage />
                  <input
                    {...props.field}
                    type="file"
                    name="file"
                    className="opacity-0"
                  />
                </label>
                <ErrorMessage
                  name="file"
                  component="div"
                  className="message-error"
                />
              </>
            )}
          </FastField>
          <button type="submit" className="button-primary">
            Thêm sách
          </button>
        </Form>
      </Formik>
    </div>
  );
};
