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
        <div className='relative h-screen md:flex md:items-center bg-slate-100'>
            <BottomPolygon />
            <div className='container w-full px-16 mx-auto z-10'>
                <div className='text-black text-center rounded-xl p-16'>
                    <h1 className='font-sans font-bold tracking-tighter text-6xl slogan'>
                        Design <span className='text-green-400'>Color </span>
                        in one <span className='text-sky-400'>Stack.</span>
                    </h1>
                    <div
                        className='w-full h-96 bg-center bg-no-repeat bg-cover mt-16 rounded-t-sm'
                        style={{
                            backgroundImage: `url(${HeroImage.src})`
                        }}
                    >
                    </div>
                    <div className="flex items-center px-8 py-4 mx-auto bg-lime-400 bg-opacity-90 rounded-b-sm">
                        <p className='text-2xl text-black font-medium opacity-100'>
                            Get inspired by theme colors from world most popular pages.
                        </p>
                        <Link
                            href="/explore"
                            className="bg-green-400 text-2xl text-white font-mono font-bold px-8 py-4 rounded-sm">
                            Explore
                        </Link>
                    </div>
                </div>
            </div>
            {children}
            <TopPolygon />
        </div >
    )
}
