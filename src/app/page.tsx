'use client';
import { Input } from "@headlessui/react";
import Image from "next/image";

export default function Home() {

  const imageLoader = async () => {
    const data = await fetch('/api/ads');
    console.log(await data.json())
    return ''
  }

  return (
    <div className="container ml-auto mr-auto">
      <div className="w-3/5 mt-40 h-40 m-auto border text-center overflow-hidden relative">
        <a href="#" title=""><Image src={"/images/ads/ad04.png"} onClick={imageLoader} alt={"this is an ad."} fill className="object-cover" /></a>
      </div>
      <div className="w-3/5 mt-10 m-auto">
        <Input type="text" placeholder="一切皆可查..." name="search" className="m-auto w-full pl-5 h-16 text-gray-700 bg-amber-50 border border-gray-800 rounded-2xl data-focus:bg-blue-100 data-hover:shadow" />
      </div>
      <div className="flex justify-start w-3/5 m-auto mt-5 gap-2 text-sm pl-5 text-gray-400">
        <span>热搜词汇：</span><a href="">* Next</a><a href="">* React</a>
      </div>
    </div>
  );
}
