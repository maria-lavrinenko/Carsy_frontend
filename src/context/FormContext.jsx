import React, { createContext, useContext, useState, useEffect } from "react";
import myApi from "../service/service";

const FormContext = createContext();

export function useForm() {
  return useContext(FormContext);
}

function FormContextWrapper({ children }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <FormContext.Provider value={{ isSubmitted, setIsSubmitted }}>
      {children}
    </FormContext.Provider>
  );
}

export default FormContextWrapper;
