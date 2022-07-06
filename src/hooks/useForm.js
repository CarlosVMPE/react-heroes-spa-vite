

import { useState } from "react";

/* Custom Form Hook */
/* 
  Set an instance, you need to pass the values for your form:
  const { description, onInputChange, onResetForm } = useForm({
        description: ''
    });
*/
/*
  If you can use it, you need to set a tag "name" to your input
  eg:
  <input type="text" placeholder="abc"
                name="description"
                value={description}
                onChange={onInputChange} />
*/
export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    };
};
