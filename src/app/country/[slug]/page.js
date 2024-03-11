import Navbar from "@/components/Navbar";
import { InfoItem } from "@/components/info-item";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getSpecificCountry = async (code) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/country/${code}`
    );

    if (!res.ok) return { error: await res.json() };
    const data = await res.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

const Page = async ({ params }) => {
  const countryCode = params.slug;
  const { data, error } = await getSpecificCountry(countryCode);

  return (
    <div className="min-h-screen">
      <Navbar />

      {error ? (
        <div className="shadow overflow-hidden sm:rounded-lg pb-8 container mt-36">
          <div className="text-center pt-8">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <h1 className="text-6xl font-medium py-8">oops! {error.message}</h1>
          </div>
        </div>
      ) : (
        <CountryDetails countryData={data} />
      )}
    </div>
  );
};

export default Page;

const CountryDetails = ({ countryData }) => {
  const data_imgUrl = countryData?.flags?.svg;
  const data_nativeName = countryData?.name?.nativeName
    ? Object.values(countryData?.name?.nativeName)[1]
      ? Object.values(countryData?.name?.nativeName)[1].common
      : Object.values(countryData?.name?.nativeName)[0].common
    : "N/A";

  const data_Currencies = countryData?.currencies
    ? Object.values(countryData?.currencies)
    : "N/A";

  const data_Languages = countryData.languages
    ? Object.values(countryData.languages).join(", ")
    : "N/A";
  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-36 container mx-auto">
      <div className="lg:px-16">
        <div className="relative h-[300px]">
          <Image
            src={data_imgUrl}
            alt={countryData?.flags?.alt}
            className="shadow-lg rounded-lg"
            fill
          />
        </div>
      </div>
      <div>
        <h1 className="uppercase text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-5">
          {countryData?.name?.common}
        </h1>
        <InfoItem title="Official Name" value={countryData?.name?.official} />
        <InfoItem title="Common Name" value={countryData?.name?.common} />
        <InfoItem title="Native Name" value={data_nativeName} />
        <InfoItem title="Captial" value={countryData?.capital || "N/A"} />
        <InfoItem title="Continents" value={countryData?.continents} />
        <InfoItem
          title="Map"
          value={
            <Link
              href={countryData?.maps?.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 lowercase text-sm md:text-lg"
            >
              {countryData?.maps?.googleMaps}
            </Link>
          }
          className="border-none"
          valueClassName="whitespace-nowrap overflow-hidden text-ellipsis w-[35vw] lg:w-[300px] text-blue-500"
        />
      </div>
      <div>
        <InfoItem title="population" value={countryData?.population} />
        <InfoItem
          title="Area"
          value={
            <>
              {countryData?.area} km<sup>2</sup>
            </>
          }
        />
        <InfoItem title="region" value={countryData?.region} />
        <InfoItem title="Sub region" value={countryData?.subregion || "N/A"} />
      </div>
      <div>
        <InfoItem title="languages" value={data_Languages} />
        <InfoItem
          title="Currencies"
          value={
            <>
              {data_Currencies !== "N/A"
                ? data_Currencies?.map((currency) => {
                    return (
                      <p key="currency.name">{`${currency.name}  - (${currency.symbol})`}</p>
                    );
                  })
                : data_Currencies}
            </>
          }
        />
        <InfoItem
          title="time zones"
          value={
            <div className="flex flex-wrap space-x-2">
              {countryData?.timezones?.map((timezone, i) => {
                return <p key={timezone}>{timezone} </p>;
              })}
            </div>
          }
        />
        <InfoItem
          title="borders"
          value={
            <div className="flex gap-2 flex-wrap">
              {countryData?.borders
                ? countryData?.borders?.map((border) => (
                    <Link
                      href={`/country/${border}`}
                      key={border}
                      className="px-3 py-1 bg-primary rounded-md text-sm lg:text-base "
                    >
                      {border}
                    </Link>
                  ))
                : "N/A"}
            </div>
          }
        />
      </div>
    </div>
  );
};
