import Link from 'next/link'
import React from 'react'
import { BsPhoneFill } from 'react-icons/bs'
import { FaPhone } from 'react-icons/fa6'
import { IoIosStar, IoIosStarOutline } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { LuExternalLink } from 'react-icons/lu'
import { PiCertificateFill } from 'react-icons/pi'

function index({ name, title, about, degree, degreeLink, degreeSchool, degreeDate, mobile, office, mail, rate, star, reviews }) {

    const renderStars = (star) => {
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
            <div className=''>
                <div className='hidden lg:flex flex-col items-center my-6'>
                    <h3 className='text-2xl font-semibold'>{name}</h3>
                    <p className='text-xs font-light'>{title}</p>
                </div>
                <div className=' h-px w-11/12 opacity-25 mx-auto bg-slate-400 mb-6'></div>
                <div className='flex flex-col items-center mb-6 mt-0 lg:my-6'>
                    <p className='text-sm font-light p-3 text-center'>{about}</p>
                </div>
                <div className='h-px w-20 mx-auto bg-slate-400'></div>
                <div className='flex flex-col items-center my-6'>
                    <div className='flex text-base font-normal items-center gap-x-2'>
                        <Link href={degreeLink}><PiCertificateFill className='text-2xl' /></Link>
                        <Link href={degreeLink}>{degree}</Link>
                        <Link href={degreeLink} target='_blank' className='font-light text-xs'><LuExternalLink /></Link>
                    </div>
                    <div className='flex flex-row gap-x-4 items-center mt-1'>
                        <Link href={degreeLink} className='font-light text-xs'>{degreeSchool} <span className='text-xs font-extralight'>({degreeDate})</span> </Link>
                    </div>
                </div>
                <div className='h-px w-20 mx-auto bg-slate-400'></div>
                <div className='flex flex-col items-center'>
                    <div className='flex text-sm font-normal items-center gap-x-2 mt-6 mb-2'>
                        <Link href={`tel:${mobile}`}><BsPhoneFill className='text-lg' /></Link>
                        <Link href={`tel:${mobile}`}>{mobile} <span className='text-xs font-light'>(Mobile)</span> </Link>
                    </div>
                    <div className='flex text-sm font-normal items-center gap-x-2 mb-6'>
                        <Link href={`tel:${office}`}><FaPhone className='text-lg' /></Link>
                        <Link href={`tel:${office}`}>{office} <span className='text-xs font-light'>(Office)</span> </Link>
                    </div>
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
                            <p>{reviews} Reviews</p>
                        </div>
                    </div>
                </div>
                <div className='h-px w-20 mx-auto bg-slate-400'></div>
                <div className='flex justify-center text-center '>
                    <div className='flex justify-center text-sm font-normal items-center gap-x-2 my-6 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded w-2/3 text-center'>
                        <Link href={`mailto:${{mail}}`}><IoMail className='text-xl' /></Link>
                        <Link href={`mailto:${{mail}}`} className=''>İletişime Geç</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index;
