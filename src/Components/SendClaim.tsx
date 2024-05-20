"use client";

import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import { User } from "@/types/User";
import { Claim } from "@/types/Claim";
import { createClaim } from "@/lib/claimsAPI";

interface FormData {
  amount: number;
  currency: string;
  type: "Travel" | "Meal" | "Night Stay" | "Gift" | "Other" | "";
  description: string;
  acknowledgement: boolean;
}

interface SendClaimProps {
  details: User;
}

const SendClaim = ({
  details: { employee_id, first_name, last_name, email, phone, manager_id },
}: SendClaimProps) => {
  const [formData, setFormData] = useState<FormData>({
    amount: 0,
    currency: "GBP",
    type: "",
    description: "",
    acknowledgement: false,
  });

  const [receipt, setReceipt] = useState<File | undefined>(undefined);

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? value !== ""
            ? parseFloat(value)
            : ""
          : value,
    }));
  };

  //function that stores the image file
  function handleUploadFile(e: FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    console.log("file", target.files[0]);
    setReceipt(target.files[0]);
  }

  const handleSubmit = () => {
    if (!formData.acknowledgement) {
      alert("Please acknowledge the declaration");
    } else {
      const claim: Partial<Claim> = {
        employee_id: employee_id,
        amount: formData.amount,
        currency: formData.currency,
        type: formData.type !== "" ? formData.type : "Other",
        description: formData.description,
        receipt: receipt,
        claimed_by: first_name + " " + last_name,
      };
      createClaim(claim);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between gap-2 items-center rounded min-h-[850px] h-dvh md:justify-evenly md:min-h-[750px] md:bg-[#D9D9D9] md:shadow-md md:h-[125vh]"
    >
      <div className="flex gap-10 w-[90%] md:gap-20 md:justify-center md:w-[80%]">
        <div>
          <h2 className="font-medium">First Name</h2>
          <p>{first_name}</p>
        </div>
        <div>
          <h2 className="font-medium">Last Name</h2>
          <p>{last_name}</p>
        </div>
      </div>
      <div className="w-[90%] md:w-[80%]">
        <label htmlFor="amount" className="font-medium">
          Amount
        </label>
        <div className="relative">
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="Value"
            value={formData.amount}
            onChange={handleChange}
            className="pl-2 py-1 border-2 border-b-4 border-black rounded-sm shadow w-full"
            required
          />
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="bg-transparent absolute my-2 ml-[-67px] cursor-pointer focus:outline-none"
          >
            <option value="GBP">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;£</option>
            <option value="USD">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$</option>
            <option value="EUR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;€</option>
            <option value="JPY">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;¥</option>
            <option value="MXN">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₱</option>
            <option value="INR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹</option>
            <option value="CHF">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₣</option>
            <option value="AUD">&nbsp;&nbsp;&nbsp;A$</option>
            <option value="CAD">&nbsp;&nbsp;&nbsp;C$</option>
            <option value="HKD">HK$</option>
            <option value="SGD">&nbsp;&nbsp;&nbsp;S$</option>
          </select>
        </div>
      </div>
      <div className="w-[90%] md:w-[80%]">
        <label htmlFor="type" className="font-medium">
          Type of claim
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="pl-1 py-1 border-2 border-b-4 border-black rounded-sm shadow w-full"
          required
        >
          <option value="" disabled>
            --Select Option--
          </option>
          <option value="Travel">Travel</option>
          <option value="Meal">Meal</option>
          <option value="Night stay">Night Stay</option>
          <option value="Gift">Gift</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <TextArea
        label="Description"
        name="description"
        placeholder="Enter description"
        value={formData.description}
        onChange={handleChange}
      />
      <div className="grid grid-rows-2 auto-cols-auto gap-1 w-[90%] md:w-[80%]">
        <label htmlFor="receipt" className="font-medium" />
        <input
          type="file"
          id="receipt"
          name="receipt"
          onChange={handleUploadFile}
        />
      </div>
      <div className="flex items-center w-[90%] md:w-[80%]">
        <input
          id="declaration"
          name="acknowledgement"
          type="checkbox"
          checked={formData.acknowledgement}
          onChange={handleChange}
          className="h-10 w-10 mr-2"
        />
        <label
          htmlFor="declaration"
          className="ml-2 block text-sm text-gray-900"
        >
          I hereby declare that the information provided is true to the best of
          my knowledge and that the expenses claimed were incurred in the
          performance of my official duties.
        </label>
      </div>
      <Button type="submit" text="Submit" style="my-2 w-[90%] md:w-[80%]" />
    </form>
  );
};

export default SendClaim;
