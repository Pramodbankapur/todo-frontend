import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/component/Sidebar";
import { Topbar } from "../dashboard/component/Topbar";
import styles from './DashboardLayout.module.css'


export default function DashboardLayout() {
  return (
    <div className={styles.dashboardRoot}>
      {/* FULL WIDTH TOPBAR */}
      <Topbar />

      {/* BELOW TOPBAR */}
      <div className={styles.dashboardBody}>
        <Sidebar />

        <main className={styles.mainArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
