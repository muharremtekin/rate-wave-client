// "use client"
// import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { SearchModal } from '@/app/components'
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { FaSquareInstagram, FaLinkedin, FaSquareXTwitter, FaYoutube, FaMedium, FaSquareGithub } from "react-icons/fa6";
// import { FaRegEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { LuPlusCircle } from "react-icons/lu";
// import api from '@/services/api'
// import { UserData } from '@/types/user'

// import Header from '@/app/components/common/header'




// function Page() {
//     const [showLastPassword, setShowLastPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [lastPassword, setLastPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [isMatching, setIsMatching] = useState<null | boolean>(null);
//     const [certificates, setCertificates] = useState([
//         { id: 1, degree: "", name: "", institution: "", startDate: "", endDate: "", link: "" }
//     ]);
//     const [userData, setUserData] = useState<UserData | null>(null);


//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState<{ id: number; name: string; surname: string; title: string; profilePic: string; url: string; }[]>([]);

//     // Fetch user data
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await api.get<UserData>(`/users/me`);
//                 console.log('User data:', response.data);
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 // Hata durumunu yönetin
//             }
//         };
//         fetchUserData();
//     }, []);


//     const handleSearchClick = () => {
//         setIsModalOpen(true);
//         document.body.style.overflow = 'hidden';
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         document.body.style.overflow = 'auto';
//     };




//     const addCertificate = () => {
//         const newId = certificates.length ? certificates[certificates.length - 1].id + 1 : 1;
//         setCertificates([...certificates, { id: newId, degree: "", name: "", institution: "", startDate: "", endDate: "", link: "" }]);
//     };

//     const removeCertificate = (id: number) => {
//         if (userData?.qualifications) {
//             setCertificates(certificates.filter(certificate => certificate.id !== id));
//         }
//     };


//     const toggleShowLastPassword = () => {
//         setShowLastPassword(!showLastPassword);
//     };

//     const toggleShowNewPassword = () => {
//         setShowNewPassword(!showNewPassword);
//     };

//     const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newPass = e.target.value;
//         setNewPassword(newPass);
//         setIsMatching(newPass === confirmPassword);
//     };

//     const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const confirmPass = e.target.value;
//         setConfirmPassword(confirmPass);
//         setIsMatching(newPassword === confirmPass);
//     };


//     return (
//         <div className='w-5/6 mx-auto mt-6 mb-10'>
//             {/* <div className='flex flex-row justify-between items-center'>
//                 <div className='flex flex-col items-start'>
//                     <h2 className='text-3xl font-bold text-slate-600'>Welcome <span className='font-light'>Mtkn</span></h2>
//                     <p className='text-sm font-light'>Edit your profile!</p>
//                 </div>
//                 <div className='flex flex-row items-center gap-x-4'>
//                     <div className='h-10 w-10 rounded-lg bg-white p-1 flex justify-center items-center text-2xl cursor-pointer' onClick={handleSearchClick}>
//                         <IoSearch className='text-[#bdbec1]' />
//                     </div>
//                     <Link href={"/profile/mtkn"}>
//                         <Image className='h-10 w-10 object-cover rounded-lg' src={"/mtkn.jpeg"} width={100} height={100} quality={100} alt='Profile Photo' />
//                     </Link>
//                 </div>
//             </div> */}
//             <Header  />
//             <div className='bg-white my-10 p-4 rounded-lg'>
//                 <div>
//                     {/* <div className='w-full h-40 lg:h-64  relative'>
//                         <Image className='w-full h-full object-cover rounded ' src={"/default-bg.jpeg"} width={2000} height={1000} quality={100} alt='Profile Photo' />
//                         <div className='absolute flex flex-row items-center gap-x-4 rounded-xl p-3 backdrop-blur-sm bottom-3 right-4 lg:bottom-6 lg:right-8 text-white'>
//                             <button>
//                                 <RiDeleteBin6Line className='text-lg lg:text-2xl' />
//                             </button>
//                             <button>
//                                 <FaRegEdit className='text-lg lg:text-2xl' />
//                             </button>
//                         </div>
//                     </div> */}

//                     <div className='my-8 text-xl font-normal px-0 lg:px-10'><p>General Settings</p></div>
//                     <div className='w-full h-px px-10 bg-slate-200 mb-6'></div>
//                     <div>
//                         <form className='px-2 lg:px-10 mb-10'>
//                             <div className='flex flex-row items-start lg:items-center justify-between w-full '>
//                                 <div className='flex flex-col lg:flex-row items-start lg:items-center gap-x-4'>
//                                     <div className='w-20 h-20 lg:h-24 lg:w-24 '>
//                                         <Image
//                                             className='h-full w-full object-cover rounded-full'
//                                             src={userData?.profilePicture ?? ""}
//                                             width={100}
//                                             height={100}
//                                             quality={100}
//                                             alt='Profile Photo'
//                                         />
//                                     </div>
//                                     <div>
//                                         <p className='text-2xl font-bold'>{userData?.firstName + " " + userData?.lastName}</p>
//                                         <p className='text-xs font-light'>{userData?.profession}</p>
//                                     </div>
//                                 </div>
//                                 <div className='flex flex-row gap-x-4'>
//                                     <button>
//                                         <RiDeleteBin6Line className='text-lg lg:text-2xl text-red-400' />
//                                     </button>
//                                     <button>
//                                         <FaRegEdit className='text-lg lg:text-2xl text-blue-400 ' />
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                         <form className='px-2 lg:px-10 mb-10'>
//                             <div className=' grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-10'>
//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='name'>Name</label>
//                                     <input defaultValue={userData?.firstName} type='text' name='name' id='name' placeholder='Name' className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>
//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='surname'>Surname</label>
//                                     <input defaultValue={userData?.lastName} type='text' name='surname' id='surname' placeholder='Surname' className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>

//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='title'>Title</label>
//                                     <input defaultValue={userData?.profession} type='text' name='title' id='title' placeholder='Title' className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>
//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='experience'>Experience</label>
//                                     <input defaultValue={userData?.yearsOfExperience} type='number' name='experience' id='experience' placeholder='Experience' className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>

//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='phoneNumber'>Phone Number</label>
//                                     <input defaultValue={userData?.phoneNumbers[0]['number'] ?? ""} type='text' name='phoneNumber' id='phoneNumber' placeholder='Phone Number' className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>
//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='officeNumber'>Office Number</label>
//                                     <input defaultValue={userData?.phoneNumbers[1]['number'] ?? ""} type='text' name='officeNumber' id='officeNumber' placeholder='Office Number' className='px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>

//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='linkedin'>LinkedIn</label>
//                                     <div className='relative w-full'>
//                                         <input type='text' name='linkedin' id='linkedin' placeholder='LinkedIn' className=' w-full pl-12 pr-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                         <FaLinkedin className='absolute top-1/2 -translate-y-1/2 left-1 text-4xl text-[#0077B5] ' />
//                                     </div>
//                                 </div>

//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='instagram'>Instagram</label>
//                                     <div className='relative w-full'>
//                                         <input type='text' name='instagram' id='instagram' placeholder='Instagram' className=' w-full pl-12 pr-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                         <FaSquareInstagram className='absolute top-1/2 -translate-y-1/2 left-1 text-4xl text-[#c13584] ' />
//                                     </div>
//                                 </div>

//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='twitter'>Twitter</label>
//                                     <div className='relative w-full'>
//                                         <input type='text' name='twitter' id='twitter' placeholder='Twitter' className=' w-full pl-12 pr-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                         <FaSquareXTwitter className='absolute top-1/2 -translate-y-1/2 left-1 text-4xl text-black ' />
//                                     </div>
//                                 </div>

//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='youtube'>Youtube</label>
//                                     <div className='relative w-full'>
//                                         <input type='text' name='youtube' id='youtube' placeholder='Youtube' className=' w-full pl-12 pr-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                         <FaYoutube className='absolute top-1/2 -translate-y-1/2 left-1 text-4xl text-[#FF0000] ' />
//                                     </div>
//                                 </div>

//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='medium'>Medium</label>
//                                     <div className='relative w-full'>
//                                         <input type='text' name='medium' id='medium' placeholder='Medium' className=' w-full pl-12 pr-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                         <FaMedium className='absolute top-1/2 -translate-y-1/2 left-1 text-4xl text-[#000000] ' />
//                                     </div>
//                                 </div>

//                                 <div className='flex flex-col mb-6'>
//                                     <label className='font-light text-sm mb-1' htmlFor='github'>GitHub</label>
//                                     <div className='relative w-full'>
//                                         <input type='text' name='github' id='github' placeholder='GitHub' className=' w-full pl-12 pr-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                         <FaSquareGithub className='absolute top-1/2 -translate-y-1/2 left-1 text-4xl text-[#000000] ' />
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className='flex flex-col mb-6'>
//                                 <label className='font-light text-sm mb-1' htmlFor='biography'>Biography</label>
//                                 <textarea defaultValue={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"} placeholder='Biography' name='biography' id='biography' className="min-h-32 max-h-60 resize-y px-3 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20"></textarea>
//                             </div>
//                             <button className='text-base rounded text-center font-normal text-white bg-blue-600 w-1/2 lg:w-1/4 py-2 '>Update</button>
//                         </form>
//                     </div>
//                     <div className=' mt-24 my-8 text-xl font-normal px-0 lg:px-10'><p>Certificate Settings</p></div>
//                     <div className='w-full h-px px-10 bg-slate-200 mb-6'></div>
//                     <form className="px-2 lg:px-10 mb-10">
//                         {userData?.qualifications.map((certificate, index) => (
//                             <div key={certificate.id} className='grid grid-cols-1 lg:grid-cols-2 gap-x-10 bg-[#808080] bg-opacity-10 p-4 rounded pt-10 relative mb-10'>
//                                 <button type="button" onClick={() => removeCertificate(Number(certificate.id))} className='absolute top-4 right-4 text-xl text-red-400'>
//                                     <RiDeleteBin6Line />
//                                 </button>
//                                 <div className='flex flex-col mb-6'>
//                                     <label htmlFor={`degree-${certificate.id}`} className='font-light text-sm mb-1'>Degree</label>
//                                     <select name="degree" id={`degree-${certificate.id}`} className='w-full px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20'>
//                                         <option value="Diploma">Diploma</option>
//                                         <option value="Certificate">Certificate</option>
//                                         <option value="Degree">Degree</option>
//                                         <option value="License">License</option>
//                                     </select>
//                                 </div>
//                                 <div className='flex flex-col mb-6'>
//                                     <label htmlFor={`certificate-name-${certificate.id}`} className='font-light text-sm mb-1'>Certificate Name</label>
//                                     <input type='text' name='certificate-name' id={`certificate-name-${certificate.id}`} placeholder='Certificate Name' className=' w-full px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>
//                                 <div className='flex flex-col mb-6'>
//                                     <label htmlFor={`instution-${certificate.id}`} className='font-light text-sm mb-1'>İnstution</label>
//                                     <input type='text' name='instution' id={`instution-${certificate.id}`} placeholder='İnstution' className=' w-full px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>
//                                 <div className='flex flex-col mb-6'>
//                                     <label htmlFor={`start-date-${certificate.id}`} className='font-light text-sm mb-1'>Start Date</label>
//                                     <input type='date' name='start-date' id={`start-date-${certificate.id}`} className=' w-full px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>
//                                 <div className='flex flex-col mb-6'>
//                                     <label htmlFor={`certificate-link-${certificate.id}`} className='font-light text-sm mb-1'>Certificate Link</label>
//                                     <input type='text' name='certificate-link' id={`certificate-link-${certificate.id}`} placeholder='Certificate Link' className=' w-full px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>
//                                 <div className='flex flex-col mb-6'>
//                                     <label htmlFor={`end-date-${certificate.id}`} className='font-light text-sm mb-1'>End Date</label>
//                                     <input type='date' name='end-date' id={`end-date-${certificate.id}`} className=' w-full px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20' />
//                                 </div>
//                             </div>
//                         ))}

//                         <div className='flex flex-row items-center justify-between'>
//                             <button type="button" className='text-base rounded text-center font-normal text-white bg-blue-600 w-1/2 lg:w-1/4 py-2 '>Update</button>
//                             <LuPlusCircle onClick={addCertificate} className='text-5xl bg-[#808080] bg-opacity-10 text-black p-2 rounded-full cursor-pointer' />
//                         </div>
//                     </form>
//                     <div className=' mt-24 my-8 text-xl font-normal px-10'><p>Security Settings</p></div>
//                     <div className='w-full h-px px-10 bg-slate-200 mb-6'></div>
//                     <form className="px-2 lg:px-10 mb-10" onSubmit={(e) => e.preventDefault()}>
//                         <div className="grid grid-cols-1 gap-x-0 lg:gap-x-10">
//                             <div className="flex flex-col mb-6 w-full lg:w-1/2 relative">
//                                 <label className="font-light text-sm mb-1" htmlFor="last-password">
//                                     Last Password
//                                 </label>
//                                 <input
//                                     type={showLastPassword ? 'text' : 'password'}
//                                     name="last-password"
//                                     id="last-password"
//                                     placeholder="Last Password"
//                                     className="px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20"
//                                     value={lastPassword}
//                                     onChange={(e) => setLastPassword(e.target.value)}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="absolute right-3 top-10"
//                                     onClick={toggleShowLastPassword}
//                                 >
//                                     {showLastPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </button>
//                             </div>

//                             <div className="flex flex-col mb-6 w-full lg:w-1/2 relative">
//                                 <label className="font-light text-sm mb-1" htmlFor="new-password">
//                                     New Password
//                                 </label>
//                                 <input type={showNewPassword ? 'text' : 'password'} name="new-password" id="new-password" placeholder="New Password" className="px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20" value={newPassword} onChange={handleNewPasswordChange} />
//                                 <button type="button" className="absolute right-3 top-10" onClick={toggleShowNewPassword}>
//                                     {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </button>
//                             </div>
//                             <div className="flex flex-col mb-6 w-full lg:w-1/2 relative">
//                                 <label className="font-light text-sm mb-1" htmlFor="confirm-password">New Password Again</label>
//                                 <input type={showNewPassword ? 'text' : 'password'} name="confirm-password" id="confirm-password" placeholder="New Password Again" className="px-4 py-2 font-light border border-slate-600 border-opacity-15 outline-none rounded bg-[#8080801b] text-black placeholder:text-black placeholder:opacity-20" value={confirmPassword} onChange={handleConfirmPasswordChange} />
//                             </div>

//                             <p className={`${isMatching === null ? 'text-gray-500' : isMatching ? 'text-green-500 ' : 'text-red-500'} text-sm mb-4 transition-all delay-100 ease-in-out`}>
//                                 {isMatching === null ? '' : isMatching ? 'Passwords Match!' : 'Passwords Not Match!'}
//                             </p>
//                         </div>
//                         <button className={`text-base rounded text-center font-normal text-white bg-blue-600 w-1/2 lg:w-1/4 py-2 transition-all delay-100 ease-in-out ${!isMatching ? "bg-blue-200 cursor-not-allowed" : "bg-blue-600"}`} type="submit" disabled={!isMatching}>
//                             Update
//                         </button>
//                     </form>

//                 </div>
//             </div>


//             <SearchModal
//                 isModalOpen={isModalOpen}
//                 closeModal={closeModal}
//                 searchTerm={searchTerm}
//                 setSearchTerm={setSearchTerm}
//                 searchResults={searchResults.map(result => ({
//                     userName: result.id,
//                     fullName: `${result.name} ${result.surname}`,
//                     profilePicture: result.profilePic,
//                     profession: result.title
//                 }))}
//             />
//         </div>
//     )
// }

// export default Page