import type { FC, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'email' | 'password' | 'number';
  label: string;
  name: string;
  className?: string;
};

export const Input: FC<InputProps> = ({ label, name, type = 'text', className, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className={clsx('font-medium', {
          'text-red-600': fieldError,
          'text-gray-700': !fieldError,
        })}
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        {...props}
        {...register(name)}
        className={clsx(
          'p-2 rounded transition-colors',
          fieldError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
          className
        )}
      />

      {fieldError && (
        <p className="text-sm text-red-500 mt-1" role="alert">
          {fieldError.message as string}
        </p>
      )}
    </div>
  );
};
