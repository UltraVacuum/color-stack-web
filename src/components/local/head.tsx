import Head from "next/head";
import { keywords, description } from "./seo";

export default function SiteHead() {
    return (
        <Head>
            <title>Color Stack</title>
            <meta name='keywords' content={keywords} />
            <meta
                name="description"
                content={description}
            />
        </Head>
    );
}
