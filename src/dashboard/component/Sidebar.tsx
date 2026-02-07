import styles from "./Sidebar.module.css";
import {
  FiHome,
  FiCheckSquare,
  FiStar,
  FiGrid,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import avatarImg from "./../pages/components/Assets/Avatar.svg"; // your image

const menuItems = [
  { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
  { label: "Vital Task", icon: <FiStar />, path: "/tasks/vital" },
  { label: "My Task", icon: <FiCheckSquare />, path: "/tasks" },
  { label: "Task Categories", icon: <FiGrid />, path: "/categories" },
  { label: "Settings", icon: <FiSettings />, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      {/* Profile */}
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          <img src={avatarImg} alt="User avatar" />
        </div>
        <div>
          <p className={styles.name}>Sundar Gurung</p>
          <p className={styles.email}>sundargurung36@gmail.com</p>
        </div>
      </div>

      {/* Menu */}
      <nav className={styles.menu}>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${styles.menuItem} ${styles.active}`
                : styles.menuItem
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button className={styles.logout}>
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}
