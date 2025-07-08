import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import { useUserStore } from '@/stores/user.store.ts';
import { UPLOAD } from '@/constants.ts';
import { Button } from '@/components/ui/button';
import logo from "@/assets/images/logo.png"
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
        <div className="min-h-screen flex items-center justify-center  p-4 w-full">
        <div className="w-full h-screen  bg-[url('https://imgix.obi.de/api/disc/cms/public/dam/DE-AT-Assets/bauen/werkzeug-pflege/1-werkzeugpflege-1061173208.jpg?crop=focalpoint&fit=crop&fp-x=0.673&fp-y=0.42&fp-z=1&w=1920&auto=format%2Ccompress&h=1079')] bg-cover bg-center fixed">
  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-teal-400 opacity-60" />
</div>
          
            <form onSubmit={handleLogin} className="p-6 relative z-10 pt-6 pb-10 shadow-md w-full max-w-md space-y-4 bg-white">
                <img
                className='max-w-[200px] mx-auto'
                src={logo}
                
                />
                <h1 className='text-4xl  text-red-600 text-center'>Welcome to DQS</h1>
                <h1 className='text-lg  text-red-2100 text-center pb-2'>Please sign in to your account</h1>

                <label htmlFor='email'>
                        Email *
                </label>
                <input
                id='email'
                    className="w-full p-2 border rounded mt-2 mb-6"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor='password'>
                    Password *
                </label>
                <input
                id='password'

               className="w-full p-2 border rounded mt-2 mb-6"
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
