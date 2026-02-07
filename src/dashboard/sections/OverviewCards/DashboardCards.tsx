import DashboardCard from "../../pages/components/Card/DashboardCard";
import { FiCheckSquare, FiActivity, FiCheckCircle } from "react-icons/fi";
import styles from "./DashboardCards.module.css";

export default function DashboardCards() {
  return (
    <div className={styles.wrapper}>
      <DashboardCard
        icon={<FiCheckSquare size={18} />}
        title="Todo"
        description="You have 12 pending tasks"
      />
      <DashboardCard
        icon={<FiActivity size={18} />}
        title="Task Status"
        description="75% tasks completed"
      />
      <DashboardCard
        icon={<FiCheckCircle size={18} />}
        title="Completed Tasks"
        description="32 tasks done"
      />
    </div>
  );
}
