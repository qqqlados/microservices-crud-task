import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInFormValues } from '../lib/schemas/auth.schema';
import { Input } from '../components/Input';
import { Form } from '../components/Form';

export const SignIn = () => {
  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log('Valid Form Data:', data);
  };

  return (
    <div className="grid place-items-center">
      <div className="w-100 flex flex-col gap-5 mt-10">
        <h1 className="font-bold text-xl text-left">Sign in</h1>

        <Form methods={methods} onSubmit={onSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />

          <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition-colors">
            Sign In
          </button>
        </Form>

        <p>
          Haven't created account yet?{' '}
          <Link to="/sign-up" className="text-blue-600 hover:underline transition-colors duration-200">
            Register.
          </Link>
        </p>
      </div>
    </div>
  );
};
