import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast/toast.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PlatformService } from '../../core/services/platform/platform.service';

interface Official {
  id: string;
  actionType: string;
  performedBy: string;
  description: string;
  date: string;
  [key: string]: string; // Keep the index signature for other dynamic properties
}

@Component({
  selector: 'app-logs',
  standalone: false,
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LogsComponent {
  constructor(private router: Router, private platformService: PlatformService, private toastServie: ToastService) { }
  
    searchControl = new FormControl('');
  
    currentPage = 1;
    pageSize = 10;
    isLoading = true;
    loading = false;
    initialLoad = true;
  
    officials: Official[] = [];
    orginalOfficials: Official[] = [];
    paginatedData: Official[] = [];
  
  
  
    ngOnInit(): void {
      this.loading = true;
  
      this.platformService.getAuditLogs().subscribe(
        (res: any) => {
          console.log(res);
          if (res && res.length > 0) {
  
            // Store the original list
            this.officials = res.map((prof: any) => {
              const { _id, firstName, lastName, ...rest } = prof;
              return {
                ...rest,
                fullName: `${firstName} ${lastName}`
              };
            });

            console.log(this.officials)
  
            // Initialize the officials list
            this.officials = [...this.officials];
            this.orginalOfficials = [...this.officials];
  
            this.updatePagination();
  
            setTimeout(() => {
              this.isLoading = false;
              this.loading = false;
            }, 500);
          } else {
            this.officials = [];
            this.isLoading = false;
            this.loading = false;
          }
        },
        (error) => {
          console.error('Error fetching officials:', error);
          this.toastServie.showToast('Failed to load officials', 'error');
          this.isLoading = false;
          this.loading = false;
        }
      );
  
      // Listen for changes in the search input and filter the list
      this.searchControl.valueChanges.pipe(
        debounceTime(300),  // Wait 300ms after the user stops typing
        distinctUntilChanged()  // Prevent filtering with the same search term
      ).subscribe((searchTerm: string | null) => {
        this.filterofficials(searchTerm);
      });
    }
  
  
    filterofficials(searchTerm: string | null) {
      // let searchClient = this.officials
      if (searchTerm) {
        console.log(searchTerm)
        console.log(this.officials)
        // Filter officials by email, case-insensitive
        this.officials = this.officials.filter((prof: any) =>
          prof.performedBy.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        // If search term is empty, reset to the full list
        this.officials = [...this.orginalOfficials];
      }
  
      // Update pagination after filtering or resetting
      this.updatePagination();
    }

    capitalizeWords(str: string): string {
      return str
        .split(' ') // Split the string into words
        .map(word => {
          // If the word is an acronym (all caps), return it as is
          if (word === word.toUpperCase()) {
            return word;
          }
          // Otherwise, capitalize the first letter and make the rest lowercase
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' '); // Join the words back into a single string
    }
    
  
  
  
    updatePagination(): void {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedData = this.officials.slice(start, end);
    }
  
    goToPage(page: number): void {
      if (page !== this.currentPage) {
        // Set loading state to true before the timeout to show shimmer
        this.loading = true;
  
        const start = (page - 1) * this.pageSize;
        const end = start + this.pageSize;
        const nextPageData = this.officials.slice(start, end);
  
        // Simulate shimmer loading effect with a timeout
        setTimeout(() => {
          this.paginatedData = nextPageData;
          this.currentPage = page;
          // Set loading to false after data is loaded
          this.loading = false;
        }, 800); // Match shimmer duration (adjust timing as necessary)
      }
    }
  
  
    prevPage(): void {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    }
  
    nextPage(): void {
      const max = Math.ceil(this.officials.length / this.pageSize);
      if (this.currentPage < max) {
        this.goToPage(this.currentPage + 1);
      }
    }
  
    get totalPages(): number {
      return Math.ceil(this.officials.length / this.pageSize);
    }
  
  
    get visiblePages(): number[] {
      // Automatically set the first page if there's only one page
      const pages: number[] = [];
      if (this.totalPages <= 1) {
        return [1]; // Only page 1
      }
  
      // Automatically set the first page if there's only one page
      if (this.totalPages >= 1) {
        const start = Math.max(2, this.currentPage - 1);
        const end = Math.min(this.totalPages - 1, this.currentPage + 1);
  
        // Loop through the visible page range
        for (let i = start; i <= end; i++) {
          // Avoid adding the first and last pages if they are already manually included
          if (i !== 1 && i !== this.totalPages) {
            pages.push(i);
          }
        }
      }
  
      return pages;
    }
  
  
  
  
    columns: any[] = [
      { key: 'id', label: 'Id' },
      { key: 'performedBy', label: 'User' },
      { key: 'actionType', label: 'Action Type' },
      { key: 'description', label: 'Description' },
      { key: 'date', label: 'date' }
    ];
  
  
  
    // Only these will be rendered in draggable container
    draggableColumns = [...this.columns];
  
    drop(event: CdkDragDrop<any[]>) {
      moveItemInArray(this.draggableColumns, event.previousIndex, event.currentIndex);
    }
  
    get totalPagesArray() {
      const count = Math.ceil(this.officials.length / this.pageSize);
      return Array.from({ length: count }, (_, i) => i + 1);
    }
  
    onPageSizeChange(event: any) {
      this.pageSize = +event.target.value;
      this.goToPage(1);
    }
}
