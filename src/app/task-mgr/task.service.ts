import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'new' | 'progress' | 'done';
    isStarted: boolean;
    isCompleted: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    tasks = signal<Task[]>([]);

    getTasks() {
        return this.tasks();
    }

    addTask(title: string, description: string, isStarted: boolean) {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            status: isStarted ? 'progress' : 'new',
            isStarted,
            isCompleted: false
        };

        this.tasks.update(tasks => [...tasks, newTask]);
    }

    updateTaskStatus(taskId: string, status: 'new' | 'progress' | 'done') {
        this.tasks.update(tasks =>
            tasks.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        status,
                        isCompleted: status === 'done'
                    };
                }
                return task;
            })
        );
    }

    deleteTask(taskId: string) {
        this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
    }
}