import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any[] = [];
  constructor(private router: Router) { }
//for localstorage
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('userData');
      if (data) {
        this.userData = JSON.parse(data);
      }
    }
  }
//for status
  getStatusColor(status: string): string {
    switch (status) {
      case 'Pending': return 'yellow';
      case 'Approved': return 'green';
      case 'Rejected': return 'red';
      default: return 'black';
    }
  }
//for add button
  addUser(): void {
    this.router.navigate(['/form']);
  }
//for edit button
  editUser(index: number): void {
    this.router.navigate(['/form'], { queryParams: { editIndex: index } });
  }
//for delete button
  deleteUser(index: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      if (typeof window !== 'undefined' && window.localStorage) {
        let storedData = JSON.parse(localStorage.getItem('userData') || '[]');
        storedData.splice(index, 1);
        localStorage.setItem('userData', JSON.stringify(storedData));
        this.userData.splice(index, 1);
      }
    }
  }
}
