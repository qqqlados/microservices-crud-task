import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Form } from "../components/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signUpSchema,
  type SignUpFormValues,
} from "../lib/schemas/auth.schema";
import { UserService } from "../services/user.service";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader } from "../components/Loader";

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setLoading(true);
      const res = await UserService.createUser(data);
      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("User created successfully");
      navigate("/users");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="w-100 flex flex-col gap-5 mt-10 relative">
        <h1 className="font-bold text-xl text-left">Sign up</h1>

        <Form methods={methods} onSubmit={onSubmit}>
          <Input
            name="email"
            label="Create your email"
            type="email"
            placeholder="you@example.com"
          />
          <Input
            name="name"
            label="Create your name"
            type="text"
            placeholder="John Doe"
          />
          <Input
            name="password"
            label="Create your password"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            aria-disabled={loading || !methods.formState.isValid}
            disabled={loading || !methods.formState.isValid}
            className="bg-blue-600 text-white p-2 rounded mt-4 transition-colors hover:bg-blue-700 disabled:bg-blue-400 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </Form>

        {loading && <Loader />}

        <p>
          Already registered?{" "}
          <Link
            to="/auth/sign-in"
            className="text-blue-600 hover:underline transition-colors duration-200"
          >
            Sign in.
          </Link>
        </p>
      </div>
    </div>
  );
};
