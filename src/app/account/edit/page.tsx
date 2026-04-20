// This is a Server Component by default
import { getUserDetails} from "../actions";
import { redirect } from "next/navigation"
import EditUserProfileForm from "./EditUserProflieForm";

export default async function EditProfilePage() {
  const profile = await getUserDetails();

  if (!profile) {
    redirect("/login");
  }

  // Pass the plain object to the Client Component
  return <EditUserProfileForm initialData={profile} />;
}
