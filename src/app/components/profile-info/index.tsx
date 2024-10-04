import { PhoneNumber, phoneTypeToString, Qualification } from '@/types/user'
import Link from 'next/link'
import React from 'react'
import { FaPhone } from 'react-icons/fa6'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { LuExternalLink } from 'react-icons/lu'
import { PiCertificateFill } from 'react-icons/pi'

interface ProfileInfoProps {
    name: string;
    title: string;
    about: string;
    mail: string;
    rate: number;
    star: number;
    reviewCount: number;
    qualifications: Qualification[];
    numbers: PhoneNumber[];
}


function index({ name, title, about, mail, rate, star, reviewCount, numbers, qualifications }: ProfileInfoProps) {

    const renderStars = (star: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= star) {
                stars.push(<IoIosStar key={i} className='text-yellow-500' />);
            } else {
                stars.push(<IoIosStarOutline key={i} className='text-black' />);
            }
        }
        return stars;
    };

    return (
        <div>
            <div className='px-10'>
                <div className='hidden lg:flex flex-col items-center my-6'>
                    <h4 className='text-2xl font-semibold'>About</h4>
                    {/* <p className='text-xs font-light'>{title}</p> */}
                </div>

                <div className=' h-px w-11/12 opacity-25 mx-auto bg-slate-400 mb-6'></div>

                <div className='flex flex-col items-center mb-6 mt-0 lg:my-6'>
                    <p className='text-sm font-light p-3 text-center'>{about}</p>
                </div>

                <div className='h-px w-20 mx-auto bg-slate-400'></div>

                <div className='flex flex-col place-items-start my-6 '>

                    {
                        qualifications.map((qualification) => (
                            <div className='py-1' key={qualification.id}>
                                <div className='flex text-base font-normal items-center gap-x-2'>
                                    <Link href={qualification.verificationLink}><PiCertificateFill className='text-2xl' /></Link>
                                    <Link href={qualification.verificationLink}>{qualification.name}</Link>
                                    <Link href={qualification.verificationLink} target='_blank' className='font-light text-xs'><LuExternalLink /></Link>
                                </div>
                                <div className='flex flex-row gap-x-4 items-center mt-1'>
                                    <Link href={qualification.verificationLink} className='font-light text-xs'>{qualification.institution}  </Link>
                                </div>
                                <span className='text-xs font-extralight'>({qualification.startDate + " - " + qualification.endDate})</span>
                            </div>
                        ))

                    }
                </div>
                <div className='h-px w-20 mx-auto bg-slate-400'></div>
                <div className='flex flex-col items-center'>

                    {
                        numbers.map((number) => (
                            <div key={number.id} className='flex text-sm font-normal items-center gap-x-2 mt-2'>
                                <Link href={`tel:${number.number}`}><FaPhone className='text-lg' /></Link>
                                <Link href={`tel:${number.number}`}>{number.number} <span className='text-xs font-light'>({phoneTypeToString(number.type)})</span> </Link>
                            </div>
                        ))
                    }
                </div>
                <div className='h-px w-20 mx-auto bg-slate-400'></div>
                <div className='flex flex-row items-center justify-center gap-x-4 my-6'>
                    <div className='text-5xl'>
                        <p>{rate}/<span className='font-light text-4xl'>5</span></p>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row'>
                            {renderStars(star)}
                        </div>
                        <div className='text-xs font-light'>
                            <p>{reviewCount} Reviews</p>
                        </div>
                    </div>
                </div>
                <div className='h-px w-20 mx-auto bg-slate-400'></div>
                <div className="flex justify-center text-center mb-20">
                    {/* Add bottom margin for better visibility */}
                    <div className="flex justify-center text-sm font-normal items-center gap-x-2 my-6 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded w-2/3 text-center">
                        <Link href={`mailto:${mail}`}>
                            <IoMail className="text-xl" />
                        </Link>
                        <Link href={`mailto:${mail}`} className="">
                            İletişime Geç
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index;
