import { useState, useEffect } from 'react'
import cx from 'classnames'
import copy from 'clipboard-copy';
import { useToast } from "@/components/ui/use-toast"
import { CopyIcon } from '@radix-ui/react-icons'

import './clip-copy.css';

export const ClipCopy = ({ text }: { text: string }) => {
    const [copied, setCopy] = useState(false);
    const { toast } = useToast() //eslint-disable-line no-react-hook

    const handleCopyClick = async () => {
        try {
            const textCopied = await copy(text);
            setCopy(true)
        } catch (err) {
            toast({
                title: "Copy Failed",
                description: "Failed to copy text to clipboard:" + err,
            })
        }
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopy(false)
            }, 1000)
        }
    }, [copied])

    return (
        <div onClick={handleCopyClick}
            className={cx("copy w-20 px-2 rounded-sm flex items-center", {
                'text-green-500': copied,
            })}
        >
            <CopyIcon />
            <span className="ml-2 w-8">{copied ? 'copied' : 'copy'}</span>
        </div>
    );
};
