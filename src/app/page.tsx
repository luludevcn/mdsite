'use client';
import { Input } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Home() {

  const [results, setResults] = useState([]);

  const imageLoader = async () => {
    const data = await fetch('/api/ads');
    console.log(await data.json())
    return ''
  }

  interface Result {
    slug: string;
    title: string;
  }

  async function search(value: string) {
    if (!value || !value.trim()) {
      setResults([]);
    } else {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      setResults(await response.json());
    }
  }

  const debounced = useDebouncedCallback((value) => { search(value) }, 500)


  return (
    <div className="container ml-auto mr-auto">
      <div className="w-3/5 mt-40 h-40 m-auto border text-center overflow-hidden relative">
        <a href="#" title=""><Image src={"/images/ads/ad04.png"} onClick={imageLoader} alt={"this is an ad."} fill className="object-cover" /></a>
      </div>
      <div className="w-3/5 mt-10 m-auto pl-2 pr-2 relative max-h-80 overflow-hidden bg-amber-50 border border-gray-800 rounded-2xl">
        <Input type="text" placeholder="一切皆可查..." onChange={(e) => debounced(e.target.value)} name="search" className="m-auto w-full pl-5 h-16 text-gray-700 dark:text-gray-300  data-focus:outline-0" />
        {results.length > 0 && (
          <div className="results border-t-1 pb-2 relative w-full top-0 max-h-56 overflow-y-scroll">
            <ul>
              {
                results.map((result: Result) => {
                  return <li className="text-sm pl-2.5 pt-0.5 hover:bg-blue-300" key={result.slug}><Link href={`/blog/${result.slug}`}>{result.title}</Link></li>
                })
              }

            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-start w-3/5 m-auto mt-5 gap-3 text-sm pl-5 text-gray-400">
        <span>热搜词汇：</span><a onClick={() => { debounced('next') }}>* Next</a><a onClick={() => { debounced('react') }}>* React</a><a onClick={() => { debounced('node') }}>* Node</a>
      </div>
    </div>
  );
}

