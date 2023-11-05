const USER_VALIDATION = (user) => {
    
}


const  FILTER_TASKS=(filters,tasks)=> {
    const filtersTasks= tasks.filter(task => {
        // Check if the filter criteria match the task
        const titleMatch = (!filters.title || task.title === filters.title);
        const priorityMatch = (!filters.priority || task.priority === filters.priority);
        const dueDateMatch = (!filters.dueDate || task.dueDate === filters.dueDate);

        // Return true only if all filter criteria match
        return titleMatch && priorityMatch && dueDateMatch;

    });

    return filtersTasks;
}


module.exports = {
    USER_VALIDATION,
    FILTER_TASKS
}