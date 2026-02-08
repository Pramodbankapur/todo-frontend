import { useEffect, useState } from "react";
import styles from "./MainCard.module.css";
import getRelativeTime from './Utils/getRelativeTime'
import { Topbar } from "../../../component/Topbar";

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

    // States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"All" | "Completed" | "Pending">("All");
    const [sortBy, setSortBy] = useState<"Newest" | "Oldest" | "Priority">("Newest");




    const STORAGE_KEY = "todo_tasks";
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

    const [tasks, setTasks] = useState<Todos>(() => {
        try {
            const stroed = localStorage.getItem(STORAGE_KEY);
            return stroed ? JSON.parse(stroed) : initialState;
        }
        catch {
            return initialState;
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks])

    // Visible Tasks
    // 🔍 SEARCH
    const visibleTasks = (tasks
        .filter(task => task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.desc.toLowerCase().includes(search.toLowerCase())))
        // Filter
        .filter(task => {
            if (filter === 'Completed') return task.completed;
            if (filter === 'Pending') return !task.completed;
            return true;
        })
        // Sort
        .sort((a, b) => {
            if (sortBy === 'Newest') return b.createdAt - a.createdAt;
            if (sortBy === "Oldest") return a.createdAt - b.createdAt;
            // Priority sort
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

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

    const totalTasks = tasks.length;
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = totalTasks - completedCount;

    const [newTask, setNewTask] = useState<{
        title: string;
        desc: string;
        priority: "High" | "Medium" | "Low";
    }>({
        title: "",
        desc: "",
        priority: "Medium",
    });

    console.log(tasks.map(item => getRelativeTime(item.createdAt)));

    return (<div>
        <Topbar value={search} onChange={setSearch}/>
        <div className={styles.mainCard}>

            <div className={styles.grid}>
                {/* LEFT COLUMN */}
                <div className={styles.left}>
                    <div>
                        <div className={styles.controls}>
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className={styles.searchInput}
                            />

                            <select value={filter} onChange={e => setFilter(e.target.value as any)}>
                                <option value="All">All</option>
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                            </select>

                            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
                                <option value="Newest">Newest</option>
                                <option value="Oldest">Oldest</option>
                                <option value="Priority">Priority</option>
                            </select>
                        </div>

                    </div>
                    <div className={styles.todoCard}>
                        <div className={styles.todoHeader}>
                            <h3>To-Do</h3>
                            <span>20 June · Today</span>
                        </div>

                        <div className={styles.todoList}>
                            {visibleTasks.filter(t => !t.completed).map(task => (
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

                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressCompleted}
                                style={{
                                    width: totalTasks
                                        ? `${(completedCount / totalTasks) * 100}%`
                                        : "0%",
                                }}
                            />
                        </div>

                        <small className={styles.progressLabel}>
                            {completedCount} of {totalTasks} tasks completed
                        </small>
                    </div>



                    <div className={styles.completedTasks}>
                        <h4 className={styles.sectionTitle}>Completed Tasks</h4>

                        <div className={styles.completedList}>
                            {tasks.filter(t => t.completed).map(task => (
                                <div key={task.id} className={styles.completedItem}>
                                    <input type="checkbox" checked readOnly />
                                    <div style={{ display: 'flex', }}>
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
    </div>
    );
}
