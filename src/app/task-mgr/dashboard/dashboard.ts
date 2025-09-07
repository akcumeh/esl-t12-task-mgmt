import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService, Task } from '../task.service';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, DragDropModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'dashboard.html',
    styleUrl: 'dashboard.scss'
})
export class DashboardComponent {
    taskService = inject(TaskService);
    router = inject(Router);

    expandedSections = {
        new: true,
        progress: true,
        done: true
    };

    newTasks = computed(() => this.taskService.getTasks().filter(task => task.status === 'new'));
    progressTasks = computed(() => this.taskService.getTasks().filter(task => task.status === 'progress'));
    doneTasks = computed(() => this.taskService.getTasks().filter(task => task.status === 'done'));

    toggleSection(section: 'new' | 'progress' | 'done') {
        this.expandedSections[section] = !this.expandedSections[section];
    }

    navigateToAddTask() {
        this.router.navigate(['/add-task']);
    }

    drop(event: CdkDragDrop<Task[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            const task = event.previousContainer.data[event.previousIndex];
            let newStatus: 'new' | 'progress' | 'done' = 'new';

            if (event.container.id.includes('progress')) newStatus = 'progress';
            if (event.container.id.includes('done')) newStatus = 'done';

            this.taskService.updateTaskStatus(task.id, newStatus);
        }
    }
}