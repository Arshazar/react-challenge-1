import { LoginForm } from '@/components/elements';

export default function Login() {
  return (
    <div className="container flex justify-center items-center">
      <div className="w-96 h-96 rounded-lg text-white p-4 aspect-square bg-gradient-to-br from-teal-600 to-cyan-600">
        <h1 className="font-bold text-5xl w-full text-center mt-3 mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
