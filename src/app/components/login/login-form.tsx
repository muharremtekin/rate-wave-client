import React from 'react';
import Header from './header';
import PasswordField from './password-field';
import RememberMe from './remember-me';
import SignInButton from './signin-button';
import SignUpLink from './signup-link';
import InputField from '../common/input-field';

interface LoginFormProps {
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSignIn: (e: React.FormEvent) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({
    showPassword,
    togglePasswordVisibility,
    username,
    setUsername,
    password,
    setPassword,
    handleSignIn,
}) => (
    <div className='w-full lg:w-1/3 p-10'>
        <Header />
        <form className='py-6' onSubmit={handleSignIn}>
            <InputField
                label="Username"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
            <PasswordField
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                password={password}
                setPassword={setPassword}
            />
            <RememberMe />
            <SignInButton />
            <SignUpLink />
        </form>
    </div>
);

export default LoginForm;
