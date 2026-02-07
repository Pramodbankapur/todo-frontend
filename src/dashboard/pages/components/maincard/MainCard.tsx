import { useState } from "react";
import styles from "./MainCard.module.css";
import getRelativeTime from './Utils/getRelativeTime'

export default function MainCard() {

    type Todos = {
        id: number;
        title: string;
        desc: string;
        priority: 'High' | 'Medium' | 'Low';
        status: 'Pending' | 'Completed' | 'In Progress';
        completed: boolean;
        createdAt: number;
        updatedAt: number;
    }[];

    const initialState: Todos = [
        {
            id: 1,
            title: "Attend Nishcal’s Birthday Party",
            desc: "Buy gifts on the way and pick up cake.",
            priority: "High",
            status: "In Progress",
            completed: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        {
            id: 2,
            title: "Finish React Dashboard",
            desc: "Complete main UI and polish components.",
            priority: "Medium",
            status: "Pending",
            completed: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        {
            id: 3,
            title: "Team Standup Meeting",
            desc: "Discuss blockers and sprint tasks.",
            priority: "Low",
            status: "Completed",
            completed: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
    ];
    // todo States
    const [tasks, setTasks] = useState(initialState);

    // toggle Function
    function toggleTask(id: number) {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, completed: !task.completed, status: task.completed ? 'Pending' : 'Completed', updatedAt: Date.now() } : task
            )
        )
    }

    function addTask() {
        if (!newTask.title.trim()) return;

        setTasks(prev => [...prev, {
            id: Date.now(),
            title: newTask.title,
            desc: newTask.desc,
            completed: false,
            priority: newTask.priority,
            status: 'Pending',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }]);
        setNewTask({
            title: '',
            desc: '',
            priority: 'Medium'
        })
        setIsModalOpen(false);
    }

    function searchTodos(input: string) {
        [...tasks.filter(todo => todo.title === input.toLocaleLowerCase() ?
            <p>{todo.title}</p> : ''
        )]
    }

    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = tasks.length - completedCount;
    const [newTask, setNewTask] = useState<{
        title: string;
        desc: string;
        priority: "High" | "Medium" | "Low";
    }>({
        title: "",
        desc: "",
        priority: "Medium",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(tasks.map(item => getRelativeTime(item.createdAt)));

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
                                        <span className={styles.createdDate}>
                                            Created • {getRelativeTime(task.createdAt)}
                                        </span>

                                        {task.updatedAt !== task.createdAt && (
                                            <small className={styles.updated}>
                                                Updated {getRelativeTime(task.updatedAt)}
                                            </small>
                                        )}

                                    </div>
                                    <p
                                        className={`${styles.priority} ${styles[task.priority.toLowerCase()]
                                            }`}
                                    >
                                        {task.priority}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* ADD BUTTON */}
                        <button className={styles.addTaskBtn} onClick={() => setIsModalOpen(true)}>+ Add Task</button>
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
                                    <div style={{display:'flex',}}>
                                        <h5>{task.title}</h5>
                                        <p>{task.desc}</p>
                                        <div>
                                        <p>complted at {getRelativeTime(task.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Adding a new Todo */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Add New Task</h3>

                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={(e) =>
                                setNewTask(prev => ({ ...prev, title: e.target.value }))
                            }
                        />

                        <textarea
                            placeholder="Task description"
                            value={newTask.desc}
                            onChange={(e) =>
                                setNewTask(prev => ({ ...prev, desc: e.target.value }))
                            }
                        />

                        <select
                            value={newTask.priority}
                            onChange={(e) =>
                                setNewTask(prev => ({
                                    ...prev,
                                    priority: e.target.value as "High" | "Medium" | "Low",
                                }))
                            }
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        <div className={styles.modalActions}>
                            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className={styles.primary} onClick={addTask}>
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
