"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import Header from "@/Components/Header";
import FilterMenu from "@/Components/FilterMenu";
import SearchBar from "@/Components/SearchBar";
import ExpenseClaim from "@/Components/ExpenseClaim";
import { Claim } from "@/types/Claim";
import { User } from "@/types/User";

interface ViewClaimsProps {
  claims: Claim[];
  pastClaims: Claim[];
  permission: "FINANCE" | "MANAGER" | "EMPLOYEE";
  employee_id: number;
}

const ViewClaims = ({
  claims,
  employee_id,
  pastClaims,
  permission,
}: ViewClaimsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleFilterChange = (
    filters: Record<string, boolean | number[] | number>
  ) => {
    // Filter claims based on the selected filters
    console.log(filters);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // Add search logic here
  };

  // Handler for processing a claim
  const handleProcess = (id: string) => {};

  // Handler for rejecting a claim
  const handleReject = (id: string) => {};

  return (
    <>
      <aside className={`${isOpen ? "" : "hidden"} md:block md:col-start-1 md:row-span-2 md:row-start-1 md:b`}>
        <FilterMenu onFilterChange={handleFilterChange} />
      </aside>
      <div className="order-first flex gap-4 items-center md:justify-between md:col-start-2 md:px-2 md:h-fit">
        <Header title="Claims" divStyle="hidden md:block" />
        <Image
          src={`/menu${isOpen ? "_open" : ""}.svg`}
          onClick={() => setIsOpen(!isOpen)}
          alt="Filter"
          width={70}
          height={70}
          className="md:hidden cursor-pointer"
        />
        <SearchBar
          placeholder="Search Claims"
          value=""
          handleChange={handleSearch}
          divStyle="w-full md:w-[50%]"
        />
      </div>
      <main className="order-last md:col-start-2 md:px-2">
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="mb-1">
            {permission === "FINANCE"
              ? "Process"
              : permission === "MANAGER"
              ? "Approve"
              : "Current"}{" "}
            claims
          </h2>
          {claims &&
            claims.map((claim, index) => (
              <ExpenseClaim
                key={index}
                details={claim}
                employee_id={employee_id}
                manager={
                  permission === "MANAGER" || permission === "FINANCE"
                    ? true
                    : false
                }
                processed={false}
              />
            ))}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="my-1">Past claims</h2>
          {pastClaims &&
            pastClaims.map((claim, index) => (
              <ExpenseClaim
                key={index}
                details={claim}
                employee_id={employee_id}
                manager={
                  permission === "MANAGER" || permission === "FINANCE"
                    ? true
                    : false
                }
                processed={true}
              />
            ))}
        </div>
      </main>
    </>
  );
};

export default ViewClaims;
