"use client";

import Navbar from "@/components/Navbar";
import { Card } from "@/components/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

async function getCountries({ pageParam = 0, query = "" }) {
  const res = await fetch(
    `/api/countries?limit=15&page=${pageParam}&query=${query}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);

  const {
    data: countries,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["countries", debouncedQuery],
    queryFn: ({ pageParam }) =>
      getCountries({ pageParam, query: debouncedQuery }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    enabled: true,
  });

  const intObserver = useRef();

  const handleQueryChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const bottomRef = useCallback(
    (entry) => {
      if (isFetching) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (entry) intObserver.current.observe(entry);
    },
    [isFetching, hasNextPage]
  );

  return (
    <>
      <Navbar onSearch={handleQueryChange} />

      <main className="flex min-h-screen flex-col items-center justify-between py-36">
        {error && (
          <div className="mx-auto w-full container mb-8">
            <div className="bg-red-50 border-l-8 border-red-500 rounded-lg overflow-hidden">
              <div className="flex items-center">
                <div className="flex items-start px-6 py-4">
                  <div className="ml-2">
                    <svg
                      className="h-8 w-8 text-red-500 mr-2 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-red-900 pl-6 font-semibold text-lg">
                    <h4>Something went wrong</h4>
                    <div className="mb-4">
                      <p className="text-md font-bold text-red-500 text-sm">
                        {JSON.stringify(error)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container grid md:grid-cols-2 xl:grid-cols-3 gap-10">
          {countries?.pages?.map((page, i) =>
            page.results.map((country) => (
              <Link
                key={country.cca3}
                href={`/country/${country.cca3}`}
                data-scroll
                data-scroll-speed="0.3"
              >
                <Card imageUrl={country.flags.svg}>
                  <p
                    className="font-bold text-xl"
                    data-scroll
                    data-scroll-speed="0.7"
                  >
                    {country.name?.common}
                  </p>
                  <p
                    className="font-normal text-sm"
                    data-scroll
                    data-scroll-speed="0.7"
                  >
                    {country.region}
                  </p>
                </Card>
              </Link>
            ))
          )}
          {hasNextPage && (
            <>
              <Skeleton
                className="h-[250px] w-full rounded-xl"
                ref={bottomRef}
              />
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <Skeleton className="h-[250px] w-full rounded-xl" />
            </>
          )}
        </div>
      </main>
    </>
  );
}
