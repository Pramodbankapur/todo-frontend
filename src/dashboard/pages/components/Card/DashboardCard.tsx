import styles from "./DashboardCard.module.css";

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function DashboardCard({
  icon,
  title,
  description,
}: DashboardCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>{icon}</div>

      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
