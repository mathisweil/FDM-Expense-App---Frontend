import ViewClaims from "@/Components/ViewClaims";
import { Claim } from "@/types/Claim";
import { getClaims } from "@/lib/claimsAPI";

export default async function FinanceClaim({ params }: { params: { userID: number } }) {
  const permission = "MANAGER";

  const currentClaims: Claim[] = await getClaims(permission, params.userID, true); 
  const pastClaims: Claim[] = await getClaims(permission, params.userID, false);

  return (
    <div className="flex flex-col gap-2 my-2 md:my-0 md:gap-0 md:grid md:grid-cols-[auto_1fr]">
      <ViewClaims claims={currentClaims} employee_id={params.userID} pastClaims={pastClaims} permission={permission}/>
    </div>
  );
};