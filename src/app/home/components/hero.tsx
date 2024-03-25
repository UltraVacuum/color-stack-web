import Link from 'next/link'
import HeroImage from './colors.png'

import './hero.css';

const TopPolygon = () => {
    return (
        <div className='w-full absolute top-0 bottom-auto left-0 right-0'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='none'
                version='1.1'
                viewBox='0 0 2560 450'
                x='0'
                y='0'
            >
                <polygon
                    className='text-blueGray-200 fill-current'
                    points='0,0 2560,0 2560,0 0,1000'
                ></polygon>
            </svg>
        </div>
    )
}

const BottomPolygon = () => {
    return (
        <div
            className='w-full absolute top-auto bottom-0 left-0 right-0'
        >
            <svg
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
        </div>
    )
}

export default function Hero({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className='relative h-screen bg-slate-100'>
            {/* <div
                className='w-full h-full absolute top-0 left-0 bottom-0 right-0 -z-50
                opacity-10 bg-gray-200'
            /> */}
            <TopPolygon />
            <BottomPolygon />
            <div className='md:flex md:items-center h-full'>
                <div className='container w-full h-full md:w-3/5 mx-auto z-10'>
                    <div className='text-black text-center rounded-xl px-16 py-16 mt-40'>
                        <h1 className='font-sans font-bold tracking-tighter text-6xl slogan'>
                            Design <span className='text-green-400'>Color </span>
                            in one <span className='text-sky-400'>Stack.</span>
                        </h1>
                        <div
                            className='w-full p-16 bg-center bg-no-repeat bg-cover mt-16 rounded-sm'
                            style={{
                                backgroundImage: `url(${HeroImage.src})`
                            }}
                        >
                            <div className='w-4/5 my-8 px-8 py-8 mx-auto bg-lime-400 bg-opacity-80 rounded-sm'>
                                <p className='text-2xl text-white font-medium opacity-100'>
                                    Get inspired by theme colors from all world most popular pages.
                                </p>
                            </div>
                            <Link
                                href="/explore"
                                className="bg-green-400 text-2xl text-white font-mono font-bold px-4 py-2 rounded-sm">
                                Explore
                            </Link>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </div >
    )
}
