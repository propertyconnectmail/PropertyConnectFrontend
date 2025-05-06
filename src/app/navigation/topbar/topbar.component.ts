import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  pageTitle: string = '';
  imageUrl = "";
  name = "";
  type = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser : any = localStorage.getItem('user');
    const user = JSON.parse(storedUser);

    this.imageUrl = user.url;
    this.name = user.firstName+ ' '+user.lastName;
    this.type = user.type;
    this.setPageTitle(this.router.url);

    // Listen for route changes and update the title accordingly
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setPageTitle(this.router.url);
    });
  }

  setPageTitle(url: string): void {
    // Define the route-to-title mapping
    const routeMap: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/professional': 'Professional Management',
      '/client': 'Client Management',
      '/employee': 'Employee Management',
      '/registry': 'Registry Location Management',
      '/official': 'Official Management',
      '/log': 'Audit Log Management',
      '/payment': 'Payments',
      '/review': 'reviews',
      '/setting': 'Settings'
    };

    // Check if the URL starts with one of the base routes and set the title
    if (url.startsWith('/professional')) {
      this.pageTitle = 'Professional Management';
    } else if (url.startsWith('/client')) {
      this.pageTitle = 'Client Management';
    } else if (url.startsWith('/employee')) {
      this.pageTitle = 'Employee Management';
    }else if (url.startsWith('/registry')) {
      this.pageTitle = 'Registry Location Management';
    }else if (url.startsWith('/official')) {
      this.pageTitle = 'Offical Management';
    }else if (url.startsWith('/log')) {
      this.pageTitle = 'Audit Log Management';
    }else {
      // For exact matches, use the routeMap
      this.pageTitle = routeMap[url] || 'Dashboard'; // Default to Dashboard if no match
    }
  }
}
