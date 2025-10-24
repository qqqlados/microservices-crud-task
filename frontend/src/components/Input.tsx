import type { FC, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import type { RegisterOptions } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'email' | 'password' | 'number' | 'submit';
  label?: string;
  name?: string;
  className?: string;
  rules?: RegisterOptions;
  placeholder?: string;
};

export const Input: FC<InputProps> = ({ label, name, type = 'text', className, rules, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (name) {
    const fieldError = errors[name];

    return (
      <div className="flex flex-col gap-3">
        <label htmlFor={name} className="font-medium text-left">
          {label}
        </label>

        <input
          id={name}
          type={type}
          {...props}
          {...register(name, rules)}
          className={clsx(
            'p-2 rounded transition-colors border placeholder-gray-300',
            fieldError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
            className
          )}
          autoComplete="off"
        />

        {fieldError && (
          <p className="text-sm text-red-500 mt-1" role="alert">
            {fieldError.message as string}
          </p>
        )}
      </div>
    );
  }

  return null;
};
