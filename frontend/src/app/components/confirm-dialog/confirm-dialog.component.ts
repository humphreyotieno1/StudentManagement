import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <mat-icon class="warning-icon">warning</mat-icon>
        <h2>{{ data.title }}</h2>
      </div>
      <div class="dialog-content">
        <p>{{ data.message }}</p>
      </div>
      <div class="dialog-actions">
        <button mat-button (click)="onNoClick()" class="btn-secondary">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button mat-raised-button color="warn" (click)="onYesClick()" class="btn-danger">
          {{ data.confirmText || 'Delete' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: var(--spacing-lg);
      max-width: 400px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-lg);
    }

    .warning-icon {
      color: var(--error);
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .dialog-header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .dialog-content {
      margin-bottom: var(--spacing-lg);
    }

    .dialog-content p {
      margin: 0;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--spacing-md);
    }

    @media (max-width: 768px) {
      .dialog-container {
        padding: var(--spacing-md);
      }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string; 
      message: string;
      confirmText?: string;
      cancelText?: string;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
} 