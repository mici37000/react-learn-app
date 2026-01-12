import { useState, ChangeEvent } from "react";

// Generic type for form values
type FormValues = Record<string, string | number | boolean>;

// Hook return type
interface UseFormReturn<T extends FormValues> {
  values: T;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  setValues: React.Dispatch<React.SetStateAction<T>>;
  resetForm: () => void;
}

function useForm<T extends FormValues>(initialValues: T): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle checkboxes
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setValues((prev) => ({ ...prev, [name]: checked }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, setValues, resetForm };
}

export default useForm;
