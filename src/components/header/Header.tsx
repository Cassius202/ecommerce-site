import NotificationBar from "./NotificationBar";
import { getHeaderProfile } from "@/utils/actions/header.actions";
import MainNavBar from "./MainNavbar";

export default async function Header() {
  const profile = await getHeaderProfile();
  const isLoggedIn = !!profile;

  return (
    <header className="fixed top-0 left-0 w-full z-50 font-sans">
      {/* Notification Bar */}
      <NotificationBar />
      <MainNavBar profile={profile} isLoggedIn={isLoggedIn} />
    </header>
  );
}
