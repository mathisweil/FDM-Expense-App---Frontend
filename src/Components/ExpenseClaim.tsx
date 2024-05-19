"use client";

import Image from "next/image";
import { useState, ChangeEvent } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import { Claim } from "@/types/Claim";
import { User } from "@/types/User";
import { updateClaim } from "@/lib/claimsAPI";

interface claimProps {
  details: Claim;
  employee_id: number;
  manager: boolean;
  processed: boolean;
}

const ExpenseClaim = ({
  details: {
    claim_id,
    amount,
    currency,
    type,
    receipt,
    status,
    date,
    claimed_by,
    approved_by,
    approved_on,
    comment,
  },
  employee_id,
  manager,
  processed,
}: claimProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addComment, setAddComment] = useState("");

  const handleDownload = async () => {
    if (!receipt) {
      alert("No receipt found");
      return;
    }
    console.log(receipt);
    const fileUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/receipts/Screenshot_2024-04-16_at_17.17.52.png`;
    const fileName = "Screenshot_2024-04-16_at_17.17.52.png";

    try {
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddComment(e.target.value);
  };

  const acceptClaim = (manager: "MANAGER" | "FINANCE") => {
    const userConfirmed = confirm("Are you sure you want to proceed?");
    if (userConfirmed) {
      const claim: Partial<Claim> = {
        status: manager === "MANAGER" ? "APPROVED" : "PROCESSED",
        comment: addComment,
      };
      updateClaim(claim, claim_id, employee_id);
    }
  };

  const rejectClaim = (manager: "MANAGER" | "FINANCE") => {
    const userConfirmed = confirm("Are you sure you want to proceed?");
    if (userConfirmed) {
      const claim: Partial<Claim> = {
        status: manager === "MANAGER" ? "REJECTED" : "REJECTEDF",
        comment: addComment,
      };
      updateClaim(claim, claim_id, employee_id);
    }
  };

  return (
    <div className="bg-white cursor-pointer rounded  hover:scale-[1.01] transition-transform duration-300 hover:shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-2 py-3 w-full"
      >
        <div className="flex items-center">
          <Image
            src={`/${status}.svg`}
            alt={status}
            width={35}
            height={35}
            className="bg-gray-100 rounded-full p-1 mx-1"
          />
          <div className="ml-2 text-left md:ml-3">
            <h1 className="text-lg">{type}</h1>
            <p className="text-sm text-gray-500">
              {manager ? (claimed_by + ", " + date) : date}
            </p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-xl flex">
            {currency}
            {amount}
            <Image
              src={`/${isOpen ? "drop_up" : "drop_down"}.svg`}
              alt="Arrow"
              width={24}
              height={24}
            />
          </h1>
        </div>
      </button>
      <div className={`${isOpen ? "" : "hidden"} text-gray-600 pb-3`}>
        <div className="flex flex-col gap-1 grid-rows-2 mx-6 whitespace-nowrap md:flex-row md:flex-wrap md:justify-between">
          <div className="flex justify-between md:block">
            <h2 className="font-medium">Amount</h2>
            <p>
              {currency}
              {amount}
            </p>
          </div>
          <div className="flex justify-between md:block">
            <h2 className="font-medium">Category</h2>
            <p>{type}</p>
          </div>
          <div
            className={`${
              manager ? "flex md:block" : "hidden"
            } justify-between`}
          >
            <h2 className="font-medium">Claimed by</h2>
            <p>{claimed_by}</p>
          </div>
          <div className="flex justify-between md:block">
            <h2 className="font-medium">Claimed on</h2>
            <p>{date}</p>
          </div>
          {manager && approved_by && (
            <div className="flex md:block justify-between">
              <h2 className="font-medium">Approved by</h2>
              <p>{approved_by}</p>
            </div>
          )}
          {manager && approved_by && (
            <div className="flex justify-between md:block">
              <h2 className="font-medium">Approved on</h2>
              <p>{approved_on}</p>
            </div>
          )}
          <div className="flex justify-between md:flex-col">
            <h2 className="font-medium">Receipts</h2>
            <Image
              src="/upload.svg"
              width={32}
              height={32}
              alt="Upload"
              onClick={handleDownload}
              className="cursor-pointer ml-4"
            />
          </div>
        </div>
        <div className="ml-6 mt-2">
          {manager && comment && <h2 className=""><span className="font-medium">Comment: </span>{comment}</h2>}
          {(status === "REJECTED" || status === "APPROVED") && processed && (
            <h2
              className={`md:text-sm text-xs mt-2 ${
                status === "REJECTED" ? "text-[#e74c3c]" : "text-[#4CAF50]"
              }`}
            >
              This claim has been {status}.
            </h2>
          )}
        </div>
        {!processed && manager && (
          <>
            <div className="mx-2 mt-4">
              <textarea
                id="comment"
                name="comment"
                placeholder="Add a comment"
                value={addComment}
                onChange={handleChange}
                className="pl-2 py-1 border-2 border-b-4 border-black rounded-sm shadow h-[50px] w-full"
              />
            </div>
            <div className="flex w-full gap-1 px-2">
              <Button
                text={`${
                  approved_by || approved_on
                    ? "Process"
                    : "Approve"
                } Claim`}
                onClick={() => {
                  acceptClaim(
                    approved_by || approved_on
                      ? "FINANCE"
                      : "MANAGER"
                  );
                }}
                style="w-1/2"
              />
              <Button
                text="Reject Claim"
                onClick={() => {
                  rejectClaim(
                    approved_by || approved_on
                      ? "FINANCE"
                      : "MANAGER"
                  );
                }}
                style="w-1/2"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ExpenseClaim;
