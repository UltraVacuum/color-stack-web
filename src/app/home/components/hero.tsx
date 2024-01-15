import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

import './hero.css';

const TopPolygon = () => {
    return (
        <svg
            className='absolute bottom-0 overflow-hidden'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x='0'
            y='0'
        >
            <polygon
                className='text-blueGray-200 fill-current'
                points='0 0 0 100 2560 0'
            ></polygon>
        </svg>
    )
}

const BottomPolygon = () => {
    return (
        <svg
            className='absolute bottom-0 overflow-hidden'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x='0'
            y='0'
        >
            <polygon
                className='text-blueGray-200 fill-current'
                points='2560 0 2560 100 0 100'
            ></polygon>
        </svg>
    )
}

export default function Hero() {
    return (
        <div className='relative pt-16 pb-32 flex content-center items-center justify-center h-screen'>
            <Image
                className='absolute top-0 left-0 bottom-0 right-0 w-full h-full'
                src="/home/hero.png"
                alt="backgrounds"
                fill={true}
                unoptimized={true}
                style={{ objectFit: 'cover' }}
            />
            <div
                className='w-full h-full absolute top-0 left-0 bottom-0 right-0 
                opacity-50 bg-black'
            />
            <div className='container relative mx-auto'>
                <div className='items-center flex flex-wrap'>
                    <div className='w-full lg:w-10/12 px-4 ml-auto mr-auto text-center'>
                        <div className='pr-12'>
                            <h1 className='text-white font-semibold text-8xl'>
                                Match your design with all colors.
                            </h1>
                            <p className="flex w-full justify-center items-center text-zinc-50 text-4xl pb-6 pt-8 ">
                                <span>
                                    Get started by exploring all the world&rsquo;s page&nbsp;
                                </span>
                                <Button className="bg-green-400 text-4xl p-8 font-mono font-bold" variant="secondary">
                                    <Link href="/colors" className="">
                                        COLORS
                                    </Link>
                                </Button>
                            </p>
                            <p className='mt-4 text-2xl text-slate-100'>
                                Get ideas of all the colors from world most popular pages.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className='top-0 left-0 bottom-auto right-0 w-full absolute pointer-events-none overflow-hidden h-20'
                style={{ transform: 'translateZ(0px)', height: '54px' }}
            >
                <TopPolygon />
            </div>
            <div
                className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-20'
                style={{ transform: 'translateZ(0px)', height: '54px' }}
            >
                <BottomPolygon />
            </div>
        </div >

    )
}
