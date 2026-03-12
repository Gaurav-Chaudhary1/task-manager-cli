import fs from 'fs';

const FILE_PATH = './tasks.json';

const loadTasks = () => {
    try {
        if (!fs.existsSync('./tasks.json')) {
            return [];
        } 
        return JSON.parse(fs.readFileSync(FILE_PATH).toString());
    } catch (e) {
        return [];
    }
};

const saveTasks = (tasks) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

const [ nodePath, scriptPath, command, argument ] = process.argv;

if (command === 'add') {
    if (!argument) {
        console.log("Please provide a task!");
        process.exit(1);
    }

    const tasks = loadTasks();
    tasks.push({ task: argument, completed: false });
    saveTasks(tasks);
    console.log(`Success: Task "${argument}" added!`);
} else if (command === 'list') {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("Task list is empty!");
    } else {
        console.log("\n Your Tasks ");
        tasks.forEach((t, i) => console.log(`${i + 1}. ${t.completed ? '[X]' : '[ ]'} ${t.task}`));
        console.log('');
    }
} else if (command === 'complete') {
    const tasks = loadTasks();
    const taskIndex = parseInt(argument) - 1;
    
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks[taskIndex].completed = true;
        saveTasks(tasks);
        console.log(`Task ${argument} marked completed!`);
    } else {
        console.log("Error: Task not found!");
    }
} else if (command === 'delete') {
    const tasks = loadTasks();
    const taskIndex = parseInt(argument) - 1;

    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const deletedTask = tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        console.log(`Deleted Task: ${deletedTask.task}`);
    } else {
        console.log("Error: Task not found!");
    } 
} else {
    console.log('Unknown commands!');
    console.log('Available commands: add, list, complete, delete');
}