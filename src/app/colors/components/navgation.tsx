export const Navgation = () => {
    return (
        <div className='sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75'>
            <div className='max-w-8xl mx-auto'>
                <div className='py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0'>
                    <div className='relative flex items-center'>
                        <a
                            className='mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto'
                            href='/'
                        >
                            <span className='sr-only'>Color Stack</span>
                        </a>
                        <div className='relative' data-headlessui-state=''>
                            <button
                                className='text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5'
                                id='headlessui-menu-button-:Racr6:'
                                type='button'
                                aria-haspopup='true'
                                aria-expanded='false'
                                data-headlessui-state=''
                            >
                                Color Stack
                            </button>
                        </div>

                        <div className='relative hidden lg:flex items-center ml-auto'>
                            <nav className='text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200'>
                                <ul className='flex space-x-8'>
                                    <li>
                                        <a
                                            className='hover:text-sky-500 dark:hover:text-sky-400'
                                            href='/docs/installation'
                                        >
                                            Docs
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href='https://tailwindui.com/?ref=top'
                                            className='hover:text-sky-500 dark:hover:text-sky-400'
                                        >
                                            Components
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className='hover:text-sky-500 dark:hover:text-sky-400'
                                            href='/blog'
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className='hover:text-sky-500 dark:hover:text-sky-400'
                                            href='/showcase'
                                        >
                                            Showcase
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <div className='flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800'>
                                <label
                                    className='sr-only'
                                    id='headlessui-listbox-label-:Rpkcr6:'
                                    data-headlessui-state=''
                                >
                                    Theme
                                </label>
                                <button
                                    type='button'
                                    id='headlessui-listbox-button-:R19kcr6:'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                    data-headlessui-state=''
                                    aria-labelledby='headlessui-listbox-label-:Rpkcr6: headlessui-listbox-button-:R19kcr6:'
                                >
                                    <span className='dark:hidden'>

                                    </span>
                                    <span className='hidden dark:inline'>

                                    </span>
                                </button>
                                <a
                                    href='https://github.com/tailwindlabs/tailwindcss'
                                    className='ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300'
                                >
                                    <span className='sr-only'>Tailwind CSS on GitHub</span>
                                </a>
                            </div>
                        </div>
                        <button
                            type='button'
                            className='ml-auto text-slate-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-slate-600 lg:hidden dark:text-slate-400 dark:hover:text-slate-300'
                        >
                            <span className='sr-only'>Search</span>
                        </button>
                        <div className='ml-2 -my-1 lg:hidden'>
                            <button
                                type='button'
                                className='text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                            >
                                <span className='sr-only'>Navigation</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex items-center p-4 border-b border-slate-900/10 lg:hidden dark:border-slate-50/[0.06]'>
                    <button
                        type='button'
                        className='text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                    >
                        <span className='sr-only'>Navigation</span>
                    </button>
                    <ol className='ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0'>
                        <li className='flex items-center'>
                            Flexbox &amp; Grid
                        </li>
                        <li className='font-semibold text-slate-900 truncate dark:text-slate-200'>
                            Grid Template Columns
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}
