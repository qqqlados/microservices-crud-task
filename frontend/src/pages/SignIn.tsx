import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  type SignInFormValues,
} from "../lib/schemas/auth.schema";
import { Input } from "../components/Input";
import { Form } from "../components/Form";
import { useState } from "react";
import { UserService } from "../services/user.service";
import { toast } from "react-toastify";
import { Loader } from "../components/Loader";

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setLoading(true);
      const res = await UserService.signIn(data.email, data.password);
      console.log(res);
      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Successful login");
      navigate("/users");
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="w-100 flex flex-col gap-5 mt-10">
        <h1 className="font-bold text-xl text-left">Sign in</h1>

        <Form methods={methods} onSubmit={onSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </Form>

        {loading && <Loader />}

        <p>
          Haven't created account yet?{" "}
          <Link
            to="/auth/sign-up"
            className="text-blue-600 hover:underline transition-colors duration-200"
          >
            Register.
          </Link>
        </p>
      </div>
    </div>
  );
};
