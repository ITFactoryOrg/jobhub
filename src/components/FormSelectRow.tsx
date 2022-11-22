import React from 'react';

interface IProps {
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<string>;
  labelText?: string;
}

const FormSelectRow = ({
  value,
  handleChange,
  options,
  name,
  labelText,
}: IProps) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {options.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelectRow;
