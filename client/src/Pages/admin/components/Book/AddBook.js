import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputField from "../../../../customField/InputField/InputField";
import SelectField from "../../../../customField/selectField/SelectField";
import { FaFileImage } from "react-icons/fa";
import { url_database } from "../../../../api";
import { useGlobalContext } from "../../../../context";
export const AddBook = () => {
  const [fileImg, setFileImg] = useState(null);
  const [typeBooks, setTypebook] = useState([]);
  const { jwt } = useGlobalContext();
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(`${url_database}/type-book`);
        setTypebook(data.data.result.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div className="flex p-[10px] text-left">
      <Formik
        initialValues={{
          // file: null,
          publishedYear: "",
          summary: "",
          name: "",
          author: "",
          price: "",
          inStock: "",
          typeBookId: "",
        }}
        validationSchema={Yup.object({
          // file: Yup.mixed().required("Vui lòng thêm file ảnh"),
          summary: Yup.string().required("Vui lòng nhập trường này"),
          name: Yup.string().required("Vui lòng nhập trường này"),
          price: Yup.number().required("Vui lòng nhập trường này"),
          publishedYear: Yup.number().required("Vui lòng nhập trường này"),
          inStock: Yup.number().required("Vui lòng nhập trường này"),
          author: Yup.string().required("Vui lòng nhập trường này"),
          typeBookId: Yup.number().required("Vui lòng chọn loại sách"),
        })}
        onSubmit={async (values, { setValues, resetForm }) => {
          try {
            if (fileImg) {
              const formData = new FormData();
              formData.append("image", fileImg);
              console.log(fileImg);
              const res = await axios.post(`${url_database}/upload`, formData);
              const picture = res.data.result.url;
              // console.log({ ...values, picture: picture });
              await axios.post(
                `${url_database}/book`,
                {
                  ...values,
                  picture: picture,
                },
                { headers: { Authorization: `Bearer ${jwt}` } }
              );
            }
            resetForm();
          } catch (err) {
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
            <FastField name="publishedYear">
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
            <FastField name="price">
              {(props) => (
                <InputField
                  type="number"
                  {...props}
                  placeholder="e.g, 35000 VNĐ"
                  label="Giá sản phẩm"
                />
              )}
            </FastField>
            <FastField name="typeBookId">
              {(props) => (
                <SelectField {...props} label="Loại sách">
                  <option value="">Chọn loại sách</option>
                  {typeBooks.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </SelectField>
              )}
            </FastField>
          </div>
          <div className="container-2field">
            <FastField name="author">
              {(props) => (
                <InputField
                  type="text"
                  {...props}
                  placeholder="e.g, Es"
                  label="Tên tác giả"
                />
              )}
            </FastField>
            <FastField name="inStock">
              {(props) => (
                <InputField
                  type="number"
                  {...props}
                  placeholder="e.g, 50"
                  label="Thêm lượng sách"
                />
              )}
            </FastField>
          </div>
          <FastField name="summary">
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
          <Field name="file">
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
                    onChange={(e) => setFileImg(e.target.files[0])}
                  />
                </label>

                {fileImg && (
                  <img
                    className="h-[150px] m-auto"
                    src={URL.createObjectURL(fileImg)}
                  />
                )}
                <ErrorMessage
                  name="file"
                  component="div"
                  className="message-error"
                />
              </>
            )}
          </Field>
          <button type="submit" className="button-primary">
            Thêm sách
          </button>
        </Form>
      </Formik>
    </div>
  );
};
