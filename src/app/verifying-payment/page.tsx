import VerificationDisplay from "./VerificationPage";

export default async function VerificationPage({ searchParams }: { searchParams: Promise<{ reference?: string | null }> }) {
  const { reference } = await searchParams;

    const cleanReference = reference?.replace("/", "");
    

  return (
    <div className="bg-zinc-950 h-svh w-full flex flex-col justify-center items-center text-center">
      {reference ? (
        <VerificationDisplay reference={cleanReference} />
      ) : (
        <p className="text-white">No reference found.</p>
      )}
    </div>
  );
}