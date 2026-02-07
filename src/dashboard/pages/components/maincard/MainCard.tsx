import { useState } from "react";
import styles from "./MainCard.module.css";

export default function MainCard() {

    type TodoState = {
        id: number;
        title: string;
        desc: string;
        priority: 'High' | 'Medium' | 'Low';
        status: 'Pending' | 'Completed' | 'In Progress';
        completed: boolean;
    }[];


    const initialState: TodoState = [
        {
            id: 1,
            title: "Attend Nishcal’s Birthday Party",
            desc: "Buy gifts on the way and pick up cake.",
            priority: "High",
            status: "In Progress",
            completed: false,
        },
        {
            id: 2,
            title: "Finish React Dashboard",
            desc: "Complete main UI and polish components.",
            priority: "Medium",
            status: "Pending",
            completed: false,
        },
        {
            id: 3,
            title: "Team Standup Meeting",
            desc: "Discuss blockers and sprint tasks.",
            priority: "Low",
            status: "Completed",
            completed: true,
        },
    ];
    // todo States
    const [tasks, setTasks] = useState(initialState);

    const completed = [
        {
            title: "Buy groceries",
            desc: "Milk, eggs, vegetables.",
        },
        {
            title: "Morning workout",
            desc: "30 minutes cardio.",
        },
    ];

    // toggle Function
    function toggleTask(id: number) {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.status } : task
            )
        )
    }

    const completedCount = tasks.filter(t=>t.completed).length;
    const pendingCount = tasks.length-completedCount;

    return (
        <div className={styles.mainCard}>
            <div className={styles.grid}>

                {/* LEFT COLUMN */}
                <div className={styles.left}>
                    <div className={styles.todoCard}>
                        <div className={styles.todoHeader}>
                            <h3>To-Do</h3>
                            <span>20 June · Today</span>
                        </div>

                        <div className={styles.todoList}>
                            {tasks.filter(t => !t.completed).map(task => (
                                <div key={task.id} className={styles.todoItem}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                        onChange={() => toggleTask(task.id)}
                                    />

                                    <div className={styles.todoContent}>
                                        <h4>{task.title}</h4>
                                        <p>{task.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* ADD BUTTON */}
                        <button className={styles.addTaskBtn}>+ Add Task</button>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className={styles.right}>
                    <div className={styles.taskStatus}>
                        <h4 className={styles.sectionTitle}>Task Status</h4>

                        <div className={styles.statusRow}>
                            <span>Completed</span>
                            <strong>{completedCount}</strong>
                        </div>

                        <div className={styles.statusRow}>
                            <span>Pending</span>
                            <strong>{pendingCount}</strong>
                        </div>
                    </div>

                    <div className={styles.completedTasks}>
                        <h4 className={styles.sectionTitle}>Completed Tasks</h4>

                        <div className={styles.completedList}>
                            {tasks.filter(t => t.completed).map(task => (
                                <div key={task.id} className={styles.completedItem}>
                                    <input type="checkbox" checked readOnly />

                                    <div>
                                        <h5>{task.title}</h5>
                                        <p>{task.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
