import { LoginForm } from '@/components/elements';

export default function Login() {
  return (
    <div className="container flex justify-center items-center h-screen w-screen">
      <div className="w-96 h-fit rounded-lg text-white p-4 bg-gradient-to-br from-teal-500 to-cyan-700">
        <h1 className="font-bold text-5xl w-full text-center mt-3 mb-6 leading-tight">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
