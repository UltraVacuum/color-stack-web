import _ from 'lodash';
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { revelJson } from "@/lib/utils";
import { ClipCopy } from '@/components/local/clip-copy'

const nestColors = (arr: any, len: number) => {
  const n = arr.length - len
  if (n >= 0) return _.slice(arr, 0, len)
  const fillColor = {
    hex: '#FFFFFF',
    color: 'rgb(255,255,255)',
    count: 0,
    isFake: 1,
  }
  const fills = _.fill(new Array(Math.abs(n)), fillColor)
  return _.concat(arr, fills)
}

export const ColorItem = (props: any) => {
  const { color: { color: rgb, count, hex, isFake } } = props;
  return (
    <Popover >
      <PopoverTrigger>
        <div className="w-8 h-8 border border-slate-300	border-dotted rounded-sm"
          style={{ background: hex }}>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {
          isFake ?
            <div className="px-4 py-2 font-mono font-medium text-xs">
              <p>blank spaces.</p>
            </div> :
            <div className="font-mono font-medium text-xs text-sky-500 leading-6">
              <ClipCopy text={hex}>
                <span>HEX: {hex}</span>
              </ClipCopy>
              <ClipCopy text={rgb}>
                <span>RGB: {rgb}</span>
              </ClipCopy>
              <p className="px-3 py-1.5 text-black">
                counts
                <span
                  className="text-sky-500 mx-1"
                >{count}</span>
                elements.
              </p>
            </div>
        }
      </PopoverContent>
    </Popover>
  );
};

export const ColorList = ({ colors }: any) => {
  const rc = nestColors(colors, 25)
  return (
    <div className="relative">
      <div className="grid grid-cols-5 gap-2">
        {rc.map((color: any, index: any) => {
          return <ColorItem color={color} key={index} />
        })}
      </div>
    </div>
  );
};

export const ColorHead = ({ page }: { page: any }) => {
  return (
    <header id="header" className="relative z-20">
      <Link href={`/explore/${page.id}`}>
        <h1 className="text-sm leading-6 font-mono text-sky-500 truncate ...">
          {page.page_title || "un titled"}
        </h1>
        <p className="text-sm  text-slate-900 truncate ...">
          {page.page_url}
        </p>
      </Link>
      <p className="mt-2 text-base  text-slate-700"></p>
    </header>
  )
}

export const ColorCard = ({ page }: { page: any }) => {
  const showColors = revelJson(page.pres_colors)

  return (
    <div className="card">
      <ColorHead page={page} />
      <ColorList colors={showColors} />
    </div>
  )
}
