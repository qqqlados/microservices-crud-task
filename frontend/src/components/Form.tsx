import type { FC, ReactNode } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";

type FormProps = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: (data: any) => void;
};

export const Form: FC<FormProps> = ({ children, methods, onSubmit }) => {
  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
