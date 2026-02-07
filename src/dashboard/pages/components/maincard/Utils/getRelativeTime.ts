export default function getRelativeTime(timeStamp:number){
    const now = Date.now();
    const diff = now - timeStamp;

    const seconds = Math.floor(diff/1000);
    const minutes = Math.floor(seconds/60);
    const hours = Math.floor(minutes/60);
    const days = Math.floor(hours/24);

    if(seconds<60) return 'Just now';
    if(minutes<60) return `${minutes} min${minutes>1?'s':''} ago`;
    if(hours<24) return `${hours} hours${hours>1?'s':''}ago`;
    return `${days} day${days>1?'s':''}ago`;
}
