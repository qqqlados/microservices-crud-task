import { useState, type FC, useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { Input } from "../Input";
import { Form } from "../Form";
import { Loader } from "../Loader";
import { UserService } from "../../services/user.service";
import { toast } from "react-toastify";
import type { IUpdateUser, IUser } from "../../types/user";
import Cookies from "js-cookie";
import { apiUsers } from "../../utils/axios";
import { setUserId } from "../../utils/auth";

type AccountEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AccountEditModal: FC<AccountEditModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const methods = useForm<IUpdateUser>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const fetchUserDataByEmail = async (email: string) => {
    try {
      const res = await apiUsers.get(`/me`, { params: { email } as any });
      const me: { data: IUser } = res?.data as any;
      if (!me) return;
      setUserId(me.data.id);
      setUser(me.data);
      methods.reset({ name: user!.name ?? "", email: user!.email ?? "" });
    } catch (e) {
      toast.error("An unexpected error occurred");
    }
  };

  console.log(user);

  useEffect(() => {
    const fillTheForm = async () => {
      const raw = Cookies.get("user") || "{}";
      let parsed: any = null;
      try {
        parsed = JSON.parse(raw);
      } catch (e) {
        parsed = null;
      }
      if (!parsed?.email) return;
      await fetchUserDataByEmail(parsed.email);
    };
    fillTheForm();
  }, [isOpen]);

  const onSubmit = async (data: FieldValues) => {
    const userId = user!.id;
    try {
      setLoading(true);
      const res = await UserService.updateUser(userId, data as any);
      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Account updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`} onClose={onClose}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle absolute right-4 top-4"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Edit account</h3>

        <Form methods={methods} onSubmit={onSubmit}>
          <Input label="Name" name="name" type="text" placeholder="Your name" />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />

          <div className="modal-action">
            <button
              type="submit"
              disabled={loading || !methods.formState.isDirty}
              className="btn btn-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </Form>
        {loading && <Loader />}
      </div>
    </dialog>
  );
};

export default AccountEditModal;
