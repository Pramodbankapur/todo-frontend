import { FiBell, FiCalendar } from "react-icons/fi";
import styles from "./Topbar.module.css";

type SearchProps = {
    value:string;
    onChange:(value:string)=>void;
}

export function Topbar({value,onChange}:SearchProps) {

    const today = new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "numeric",
        year: "numeric",
    });

    return (
        <div className={styles.topbar}>
            {/* Title */}
            <h1 className={styles.title}>
                Dash<span>board</span>
            </h1>

            {/* Search */}
            <div className={styles.searchBox}>
                <input type="text" value={value} onChange={(e)=>onChange(e.target.value)} placeholder="Search your task here..." />
                <span className={styles.searchIcon}>🔍</span>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <button className={styles.iconBtn}>
                    <FiBell size={18} />
                    <span className={styles.badge}>3</span>
                </button>

                <div className={styles.dateBox}>
                    <FiCalendar size={16} />
                    <span>{today}</span>
                </div>

            </div>
        </div>
    );
}