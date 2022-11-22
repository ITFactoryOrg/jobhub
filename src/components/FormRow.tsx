import React from 'react';

interface IProps {
  name: string;
  value: string;
  labelText?: string;
  type: 'text' | 'email' | 'number' | 'password' | 'checkbox' | 'radio';
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow = ({ type, name, value, handleChange, labelText }: IProps) => {
  return (
    <div className='form-row'>
      <label className='form-label' htmlFor={name}>
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        className='form-input'
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
