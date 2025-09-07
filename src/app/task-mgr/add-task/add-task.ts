import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../task.service';

@Component({
    selector: 'app-add-task',
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatCardModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'add-task.html',
    styleUrl: 'add-task.scss'
})
export class AddTaskComponent {
    fb = inject(FormBuilder);
    taskService = inject(TaskService);
    router = inject(Router);

    taskForm: FormGroup = this.fb.group({
        title: ['', [Validators.required, this.wordCountValidator(5)]],
        description: ['', [Validators.required, this.wordCountValidator(15)]],
        isStarted: [false]
    });

    wordCountValidator(maxWords: number) {
        return (control: any) => {
            if (!control.value) return null;
            const wordCount = control.value.trim().split(/[\s-]+/).filter((word: string) => word.length > 0).length;
            return wordCount > maxWords ? { maxWords: { actual: wordCount, max: maxWords } } : null;
        };
    }

    getTitleWordCount(): number {
        const title = this.taskForm.get('title')?.value || '';
        return title.trim().split(/[\s-]+/).filter((word: string) => word.length > 0).length;
    }

    getDescriptionWordCount(): number {
        const description = this.taskForm.get('description')?.value || '';
        return description.trim().split(/[\s-]+/).filter((word: string) => word.length > 0).length;
    }

    onSubmit() {
        if (this.taskForm.valid) {
            const { title, description, isStarted } = this.taskForm.value;
            this.taskService.addTask(title, description, isStarted);
            this.router.navigate(['/dashboard']);
        }
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }
}