// "use client";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../context/AuthContext';
// import SideImage from '../../components/Login/SideImage';
// import LoginForm from '../../components/Login/LoginForm';

// const Page: React.FC = () => {
//     const [showPassword, setShowPassword] = useState<boolean>(false);
//     const [username, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const { login } = useAuth();
//     const router = useRouter();

//     const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

//     const handleSignIn = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('https://localhost:7037/api/authentication', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 login(data.token);
//                 router.push('/profile/' + data.userName);
//             } else {
//                 console.error('Login failed');
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//         }
//     };

//     return (
//         <div className='flex h-screen'>
//             <SideImage />
//             <LoginForm
//                 showPassword={showPassword}
//                 togglePasswordVisibility={togglePasswordVisibility}
//                 username={username}
//                 setUsername={setUsername}
//                 password={password}
//                 setPassword={setPassword}
//                 handleSignIn={handleSignIn}
//             />
//         </div>
//     );
// };

// export default Page;
