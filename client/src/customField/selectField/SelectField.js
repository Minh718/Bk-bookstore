import { ErrorMessage } from "formik";
import React from "react";
import "./style.css";
export default function SelectField({ field, value, meta, form, ...props }) {
  return (
    <div className="container-select">
      <label htmlFor={field.name}>{props.label}</label>
      <select {...field} {...props} />
      <ErrorMessage
        name={field.name}
        component="div"
        className="message-error"
      />
    </div>
  );
}
