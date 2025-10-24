import type { FC, ReactNode } from 'react';
import { FormProvider, type UseFormReturn } from 'react-hook-form';

type FormProps = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  className?: string;
};

export const Form: FC<FormProps> = ({ children, methods, onSubmit, className }) => {
  return (
    <FormProvider {...methods}>
      <form className={`w-full flex flex-col gap-4 ${className}`} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
