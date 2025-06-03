import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { useUserStore } from '@/stores/user.store.ts';
import { UPLOAD } from '@/constants.ts';
import { Button } from '@/components/ui/button';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUser = useUserStore((state : { setUser: (user: any, token: string) => void }) => state.setUser);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Email and password are required.');
            return;
        }

        try {
            setIsLoading(true)
            const res = await axios.post('https://anton.markcoders.com/dynamic_qouting_system/api/login', {
                email,
                password,
            });

            const { user, tokens } = res.data;
            setUser(user, tokens.accessToken);
            toast.success('Login successful');
            navigate(UPLOAD);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.message || 'Login failed';
                toast.error(msg);
            } else {
                toast.error('Unexpected error');
            }
        }finally{
            setIsLoading(false)
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                <input
                    className="w-full p-2 border rounded"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button className="w-full" type="submit">{isLoading?"Login...":"Login"}</Button>
            </form>
            <Toaster richColors />
        </div>
    );
}

export default Auth;
