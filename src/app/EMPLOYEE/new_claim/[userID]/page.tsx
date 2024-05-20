import Header from "@/components/Header";
import SendClaim from "@/components/SendClaim";
import { User } from "@/types/User";
import { getUser } from "@/lib/usersAPI";

export default async function ExpenseClaim({
  params,
}: {
  params: { userID: number };
}) {
  const details: User = await getUser(params.userID);

  return (
    <div className="flex flex-col justify-evenly md:mx-[10%]">
      <Header title="Expense Claim" divStyle="text-center my-4 md:text-left" />
      <SendClaim details={details} />
    </div>
  );
}
