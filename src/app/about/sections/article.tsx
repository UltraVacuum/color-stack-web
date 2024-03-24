import Link from 'next/link'
export const CrxUrl = 'https://chromewebstore.google.com/detail/color-stack/odejgpnelfibbifobdffndebnbielcdl?ref=color-stack'

export default function Article() {
    return (
        <div className="container">
            <h1 className="text-8xl text-black font-black tracking-wide text-">
                Your Ultimate Tool for Crafting Seamless Color Palettes.
            </h1>

            <p className="text-2xl font-light my-8 text-justify">
                In the world of design, color is paramount. It sets the mood, conveys emotion, and ties everything together harmoniously. However, finding the perfect color palette can be a daunting task, especially when starting from scratch. That's where Color Stack comes in, revolutionizing the way designers create their color schemes.
            </p>

            <h2 className="text-4xl text-green-400 font-light">
                What is Color Stack?
            </h2>
            <p className="text-2xl font-light my-8 text-justify">
                Color Stack is a web application designed to simplify the process of creating cohesive color palettes. It works with browser extension by collecting the theme colors from any web page and presenting them in an easily accessible format. Whether you're browsing a website, a blog, or an online store, Color Stack extension extracts the predominant colors used and compiles them into a convenient palette for your use.
            </p>

            <h2 className="text-4xl text-green-400 font-light">
                How Does Color Stack Work?
            </h2>

            <p className="text-2xl font-light my-8 text-justify">
                Using Color Stack extension is as simple as it gets. you can get the <a className="underline decoration-indigo-500 font-bold" href={CrxUrl} target="_blank">extension</a> on google extension store, Upon visiting the website, you can collect the page theme color instantly, then Color Stack gets to work, analyzing the colors used throughout the site on you collection.
            </p>
            <p className="text-2xl font-light my-8 text-justify">
                The extracted colors are then displayed on the this site, organized neatly for quick reference. Each color is accompanied by its hexadecimal code, making it easy to replicate in design software or other projects. Additionally, users have the option to save palettes for future use or share them with colleagues and clients.
            </p>

            <h2 className="text-4xl text-green-400 font-light">
                Why Choose Color Stack?
            </h2>

            <div className="text-2xl font-light my-8 text-justify">
                <p>
                    Color Stack offers several advantages over traditional methods of color palette creation:
                </p>
                <hr className="my-8" />

                <span className="text-sky-500">Efficiency: </span>
                <p>
                    Gone are the days of manually inspecting web pages for color inspiration. With Color Stack, designers can gather relevant colors with just a few clicks, significantly speeding up their workflow.
                </p>
                <hr className="my-8" />

                <span className="text-sky-500">Consistency: </span>
                <p>
                    By extracting colors directly from existing designs or websites, Color Stack ensures that the resulting palette is harmonious and cohesive. This promotes consistency across various design elements and enhances the overall aesthetic appeal.
                </p>
                <hr className="my-8" />

                <span className="text-sky-500">Versatility: </span>
                <p>
                    Whether you're working on a website, an app interface, or a marketing campaign, Color Stack can adapt to your needs. Its flexibility makes it a valuable tool for designers across different industries and disciplines.
                </p>
                <hr className="my-8" />

                <span className="text-sky-500">Collaboration: </span>
                <p>
                    Design is often a collaborative process, involving input from multiple stakeholders. With Color Stack's sharing feature, designers can easily exchange color palettes with team members, clients, and collaborators, fostering better communication and alignment.
                </p>
            </div>

            <h2 className="text-4xl text-green-400 font-light">
                Conclusion
            </h2>
            <p className="text-2xl font-light my-8 text-justify">
                In the fast-paced world of design, efficiency is key. With Color Stack, designers can streamline their workflow, save time, and unleash their creativity like never before. By harnessing the power of existing color schemes, Color Stack empowers designers to create stunning visuals with ease. Whether you're a seasoned professional or just starting out, Color Stack is the ultimate tool for building beautiful, cohesive color palettes. Try it today and elevate your designs to new heights!
            </p>
        </div>
    )
}
