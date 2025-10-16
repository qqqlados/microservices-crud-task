import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Form } from '../components/Form';
import { useForm, type FieldValues } from 'react-hook-form';

export const SignUp = () => {
  const methods = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log('Form data:', data);
  };

  return (
    <div className="grid place-items-center">
      <div className="w-100 flex flex-col gap-5 mt-10">
        <h1 className="font-bold text-xl text-left">Sign up</h1>

        <Form methods={methods} onSubmit={onSubmit}>
          <Input name="email" label="Create your email" type="email" />
          <Input name="username" label="Create your name" type="text" />
          <Input name="password" label="Create your password" type="password" />
        </Form>

        <p>
          Already registered?{' '}
          <Link to="/sign-in" className="text-blue-600 hover:underline transition-colors duration-200">
            Sign in.
          </Link>
        </p>
      </div>
    </div>
  );
};
