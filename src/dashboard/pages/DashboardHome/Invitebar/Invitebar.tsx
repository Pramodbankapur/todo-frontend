import { FiPlus } from "react-icons/fi";
import styles from "./Invitebar.module.css";
import avatar from '../../components/Assets/Avatar.svg'

export default function Invitebar() {
  return (
    <div className={styles.inviteBar}>
      
      {/* LEFT */}
      <div className={styles.text}>
        <h3 className={styles.greeting}>
          Hello, <span>Sundar</span>
        </h3>
        <p className={styles.subtext}>
          Manage your tasks efficiently
        </p>
      </div>

      {/* RIGHT (avatars + button together) */}
      <div className={styles.actions}>
        <div className={styles.avatars}>
          <img src={avatar} className={styles.avatar} />
          <img src={avatar} className={styles.avatar} />
          <img src={avatar} className={styles.avatar} />
        </div>

        <button className={styles.inviteBtn}>
          <FiPlus size={16} />
          Invite
        </button>
      </div>

    </div>
  );
}
