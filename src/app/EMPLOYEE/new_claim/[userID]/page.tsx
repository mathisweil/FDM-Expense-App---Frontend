import { sendClaim } from "@/app/actions";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { redirect } from "next/navigation";

export default function ClaimForm({
  params,
}: {
  params: { userID: number };
}) {
  return (
    <div className="flex flex-col justify-evenly md:mx-[10%]">
      <Header title="Expense Claim" divStyle="text-center my-4 md:text-left" />
      <form
        action={async (formData) => {
          'use server';
          await sendClaim(formData);
          redirect("/");
        }}
        className="flex flex-col justify-between gap-2 items-center rounded min-h-[850px] h-dvh md:justify-evenly md:min-h-[750px] md:bg-[#D9D9D9] md:shadow-md md:h-[125vh]"
      >
        <input
          type="number"
          id="employee_id"
          name="employee_id"
          value={params.userID}
          className="hidden"
        />
        <div className="w-[90%] md:w-[80%]">
          <label htmlFor="amount" className="">
            Amount
          </label>
          <div className="relative">
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0"
              placeholder="Value"
              className="pl-2 py-1 border-2 border-b-4 border-black rounded-sm shadow w-full"
              required
            />
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
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
        <div className="flex flex-col w-[90%] md:w-[80%]">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            className="pl-2 py-1 border-2 border-b-4 border-black rounded-sm shadow min-h-[150px] max-h-[210px]"
          />
        </div>
        <div className="grid grid-rows-2 auto-cols-auto gap-1 w-[90%] md:w-[80%]">
          <label htmlFor="receipt" className="font-medium" />
          <input type="file" id="receipt" name="receipt" />
        </div>
        <div className="flex items-center w-[90%] md:w-[80%]">
          <input
            type="checkbox"
            id="acknowledgement"
            name="acknowledgement"
            className="h-10 w-10 mr-2"
          />
          <label
            htmlFor="acknowledgement"
            className="ml-2 block text-sm text-gray-900"
          >
            I hereby declare that the information provided is true to the best
            of my knowledge and that the expenses claimed were incurred in the
            performance of my official duties.
          </label>
        </div>
        <Button type="submit" text="Submit" style="my-2 w-[90%] md:w-[80%]" />
      </form>
    </div>
  );
}


