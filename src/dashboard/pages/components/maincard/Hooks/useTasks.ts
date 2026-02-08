import { useEffect, useMemo, useState } from "react";

export type Task = {
    id:number;
    title:string;
    desc:string;
    priority:'High'|'Medium'|'Low';
    completed:boolean;
    createdAt:number;
    updatedAt:number;
}

const STORAGE_KEY = "todo_tasks";

export function useTasks(){
    //  RAW DATA / LOCAL DATA
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

//   UI STATE
const [search,setSearch] = useState<string>('');
const [filter,setFilter] = useState<'All'|'Completed'|'Pending'>('All');
const [sortBy,setSortBy] = useState<'Newest'|'Oldest'|'Priority'>('Newest');

// PERSISTENCE
useEffect(()=>{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));
},[tasks])

// DERIVED DATA (backend-safe)
const visibleTasks = useMemo(()=>{
    return tasks.filter(t=>
        t.title.toLowerCase().includes(search.toLowerCase())||
        t.desc.toLowerCase().includes(search.toLowerCase())
    ).filter(t=>{
        if(filter === 'Completed')return t.completed;
        if(filter === 'Pending') return !t.completed;
        return true;
    })
    .sort((a,b)=>{
        if(sortBy === 'Newest') return b.createdAt - a.createdAt;
        if(sortBy === 'Oldest') return a.createdAt - b.createdAt;
        const p = {High:1,Medium:2,Low:3};
        return p[a.priority]-p[b.priority]
    })
},[tasks,search,filter,sortBy]);

// ACTIONS
function toggleTask(id:number){
    setTasks(prev=>
        prev.map(t=>t.id === id?{...t,completed:!t.completed,updatedAt:Date.now()}:t)
    );
}

function addTask(task:Omit<Task , 'id'|'createdAt'|'updatedAt'>){
    setTasks((prev)=>[
        ...prev,
        {...tasks,id:Date.now(),title:}
    ])
}
}