import DashboardCards from "../../sections/OverviewCards/DashboardCards";
import MainCard from "../components/maincard/MainCard";
import Invitebar from "./Invitebar/Invitebar"

export default function DashboardHome() {
  return (
    <div style={{ padding: "24px" }}>
      <Invitebar />
      <MainCard/>
    </div>
  );
}
