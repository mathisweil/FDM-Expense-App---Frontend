"use client";

import { useState, ChangeEvent, FormEvent, use } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { User } from "@/types/User";
import { updateUser } from "@/lib/usersAPI";

interface Details {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tax_code: string;
  manager_id: number;
}

interface Address {
  address: string;
  postcode: string;
  city: string;
  country: string;
}

interface BankDetails {
  account_number: string;
  sort_code: string;
}

interface Password {
  password: string;
  confirmPassword: string;
}

interface UpdateUserProps {
  details: User;
}

const UpdateUser = ({
  details: {
    employee_id,
    first_name,
    last_name,
    permission,
    email,
    phone,
    address,
    postcode,
    city,
    country,
    account_number,
    sort_code,
    tax_code,
    manager_id,
  },
}: UpdateUserProps) => {
  const [details, setDetails] = useState<Details>({
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone: phone,
    tax_code: tax_code,
    manager_id: manager_id,
  });

  const [fullAddress, setFullAddress] = useState<Address>({
    address: address,
    postcode: postcode,
    city: city,
    country: country,
  });

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    account_number: account_number,
    sort_code: sort_code,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const [stateKey, propertyName] = e.target.name.split("-");
    const value = e.target.value;

    switch (stateKey) {
      case "details":
        setDetails((prevDetails) => ({
          ...prevDetails,
          [propertyName]: value,
        }));
        break;
      case "address":
        setFullAddress((prevFullAddress) => ({
          ...prevFullAddress,
          [propertyName]: value,
        }));
        break;
      case "bankDetails":
        setBankDetails((prevBankDetails) => ({
          ...prevBankDetails,
          [propertyName]: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (fields: string) => {
    switch (fields) {
      case "details":
        updateUser(details, employee_id);
        break;
      case "address":
        updateUser(fullAddress, employee_id);
        break;
      case "bankDetails":
        updateUser(bankDetails, employee_id);
        break;
      case "password":
        updateUser(bankDetails, employee_id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col md:mt-[-10px]">
      <Header title="Personal Details" divStyle="my-2" />
      <form
        onSubmit={() => {
          handleSubmit("details");
        }}
        className="flex flex-col gap-4 md:grid md:grid-cols-2 md:place-items-center"
      >
        <div className="md:w-[90%]">
          <InputField
            label="First Name"
            type="text"
            name="details-first_name"
            value={details.first_name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="Last Name"
            type="text"
            name="details-last_name"
            value={details.last_name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="Email"
            type="email"
            name="details-email"
            value={details.email}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="Phone Number"
            type="tel"
            name="details-phone"
            value={details.phone}
            onChange={handleChange}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="Tax Number"
            type="tel"
            name="details-tax_code"
            value={details.tax_code}
            onChange={handleChange}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="Manager ID"
            type="text"
            name="details-manager_id"
            value={details.manager_id.toString()}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          text="Update"
          style="w-full place-self-end mb-5 mt-2 md:w-40 md:mr-6 md:mb-0 md:col-start-2 md:row-start-4"
        />
      </form>
      <Header title="Address" divStyle="mb-2" />
      <form
        onSubmit={() => {
          handleSubmit("address");
        }}
        className="flex flex-col gap-4 md:grid md:grid-cols-2 md:place-items-center"
      >
        <div className="md:w-[90%]">
          <InputField
            label="Address"
            type="text"
            name="address-address"
            value={fullAddress.address}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="Zip Code"
            type="text"
            name="address-postcode"
            value={fullAddress.postcode}
            onChange={handleChange}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="City"
            type="text"
            name="address-city"
            value={fullAddress.city}
            onChange={handleChange}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="Country"
            type="text"
            name="address-country"
            value={fullAddress.country}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          text="Update"
          style="w-full place-self-end mb-5 mt-2 md:w-40 md:mr-6 md:mb-0 md:col-start-2"
        />
      </form>
      <Header title="Bank Details" divStyle="mb-2" />
      <form
        onSubmit={() => {
          handleSubmit("bankDetails");
        }}
        className="flex flex-col gap-4 md:grid md:grid-cols-2 md:place-items-center"
      >
        <div className="md:w-[90%]">
          <InputField
            label="Account Number"
            type="text"
            name="bankDetails-account_number"
            value={bankDetails.account_number}
            onChange={handleChange}
          />
        </div>
        <div className="md:w-[90%]">
          <InputField
            label="Sort Code"
            type="text"
            name="bankDetails-sort_code"
            value={bankDetails.sort_code}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          text="Update"
          style="w-full place-self-end mb-5 mt-2 md:w-40 md:mr-6 md:mb-0 md:col-start-2"
        />
      </form>
      <Header title="Change Password" divStyle="mb-2" />
      <form
        onSubmit={() => {
          handleSubmit("password");
        }}
        className="flex flex-col gap-4 md:grid md:grid-cols-2 md:place-items-center"
      >
        <div className="md:w-[90%]">
          <Button
            type="submit"
            text="Change Password"
            onClick={() => {
              handleSubmit("password");
            }}
            style="w-full place-self-end mb-5 mt-2 md:w-40 md:mr-6 md:mb-0 md:col-start-2"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
