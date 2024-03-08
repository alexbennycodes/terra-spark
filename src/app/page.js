"use client";

import { Card } from "@/components/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useRef } from "react";

async function getCountries({ pageParam = 0 }) {
  const res = await fetch(`/api/countries?limit=15&page=${pageParam}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default function Home() {
  const {
    data: countries,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });

  const intObserver = useRef();

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
    <main className="flex min-h-screen flex-col items-center justify-between pt-36">
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
        {countries?.pages?.map((page) =>
          page.results.map((country) => (
            <Card imageUrl={country.flags.svg} key={country.name?.common}>
              <p className="font-bold text-xl">{country.name?.common}</p>
              <p className="font-normal text-sm">{country.region}</p>
            </Card>
          ))
        )}
        {hasNextPage && (
          <>
            <Skeleton className="h-[250px] w-full rounded-xl" ref={bottomRef} />
            <Skeleton className="h-[250px] w-full rounded-xl" />
            <Skeleton className="h-[250px] w-full rounded-xl" />
          </>
        )}
      </div>
    </main>
  );
}
