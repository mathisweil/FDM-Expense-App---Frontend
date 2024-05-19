import ViewClaims from "@/Components/ViewClaims";
import { Claim } from "@/types/Claim";
import { getClaims } from "@/lib/claimsAPI";

export default async function FinanceClaim({ params }: { params: { userID: number } }) {
  const permission = "MANAGER";

  const currentClaims: Claim[] = await getClaims(permission, params.userID, true); 
  const pastClaims: Claim[] = await getClaims(permission, params.userID, false);

  return (
    <div className="flex flex-col gap-2 mt-2 md:grid md:grid-cols-[1fr_4.5fr] md:grid-rows-[auto_1fr] md:gap-0 md:mt-0 md:divide-x md:divide-black md:min-h-screen">
      <ViewClaims claims={currentClaims} employee_id={params.userID} pastClaims={pastClaims} permission={permission}/>
    </div>
  );
};