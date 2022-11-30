import { ErrorMessage } from "formik";
import React from "react";
import "./style.css";
const InputField = React.forwardRef(({ field, meta, form, ...props }, ref) => {
  return (
    <div className="container-input">
      <label htmlFor={field.name}>{props.label}</label>
      <input
        {...field}
        {...props}
        ref={ref}
        className="form-control border-solid border-2 border-l-neutral-500 p-1 rounded"
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="message-error"
      />
    </div>
  );
});
export default InputField;
