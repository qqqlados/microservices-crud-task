import { useState, type FC, useEffect } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import { Input } from '../Input';
import { Form } from '../Form';
import { Loader } from '../Loader';
import { UserService } from '../../services/user.service';
import { toast } from 'react-toastify';
import type { IUpdateUser } from '../../types/user';
import { getUserCookie } from '../../utils/auth';

type AccountEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AccountEditModal: FC<AccountEditModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const methods = useForm<IUpdateUser>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const user = getUserCookie();

  useEffect(() => {
    const fillTheForm = async () => {
      if (user) {
        methods.reset({ name: user.name ?? '', email: user!.email ?? '' });
      }
    };
    fillTheForm();
  }, [isOpen]);

  const onSubmit = async (data: FieldValues) => {
    if (user && user.id) {
      const userId = user.id;
      try {
        setLoading(true);
        const res = await UserService.updateUser(userId, data as any);
        if (res.error) {
          toast.error(res.error);
          return;
        }

        toast.success('Account updated successfully');
        onClose();
      } catch (error) {
        console.error(error);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`} onClose={onClose}>
      <div className="modal-box">
        <button className="btn btn-sm btn-circle absolute right-4 top-4" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Edit account</h3>

        <Form methods={methods} onSubmit={onSubmit}>
          <Input label="Name" name="name" type="text" placeholder="Your name" />
          <Input label="Email" name="email" type="email" placeholder="you@example.com" />

          <div className="modal-action">
            <button type="submit" disabled={loading || !methods.formState.isDirty} className="btn btn-primary disabled:opacity-70 disabled:cursor-not-allowed">
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
