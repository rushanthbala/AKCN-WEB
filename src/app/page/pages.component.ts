import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  // responsive
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) { }
  public href: string = '';
  public link: string = '';
  public sublink: string = '';
  public contentSubHeading: string = '';
  public navName: string = '';
  logout() {
    localStorage.clear();
  }
  ngOnInit(): void {
    console.log('==========');
    if (this.authService.isUserLoggedIn()) {
      console.log('true');
    } else {
      console.log('false');
      window.location.href = '/login';
    }
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1200px)'])
      // .pipe(untilDestroyed(this))
      .subscribe((res) => {
        console.log('sub');
        if (res.matches) {
          console.log('sidenav.mode', this.sidenav.mode);
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        // untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  getNavName() {
    var url = this.router.url;
    var urlSpilite = url.split('/');
    if (urlSpilite[2] === 'dashboard') {
      this.href = 'Dashboard';
      this.link = '/auth/dashboard'
      this.contentSubHeading = 'Welcome back, Alex'
    } else if (urlSpilite[2] === 'create-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/create-ticket'
      this.sublink = '/auth/create-ticket'
      this.contentSubHeading = "Tickets > Create Tickets"
    } else if (urlSpilite[2] === 'pending-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/pending-ticket'
      this.sublink = '/auth/pending-ticket'
      this.contentSubHeading = "Tickets > Pending Tickets"
    } else if (urlSpilite[2] === 'assign-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/assign-ticket'
      this.sublink = '/auth/assign-ticket'
      this.contentSubHeading = "Tickets > Assign Tickets"
    } else if (urlSpilite[2] === 'closed-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/closed-ticket'
      this.sublink = '/auth/closed-ticket'
      this.contentSubHeading = "Tickets > Closed Tickets"
    }
    else if (urlSpilite[2] === 'cancelled-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/cancelled-ticket'
      this.sublink = '/auth/cancelled-ticket'
      this.contentSubHeading = "Tickets > Cancelled Tickets"
    }
  }
  menuItems = [
    {
      iconClass: 'icon-Dashboard',
      label: 'Dashboard',
      text: 'Lorem Ipsum',
      state: false,
      item: [],
      link: '/auth/dashboard',
      icon: '../../assets/icons/dashboard.png',
    },
    {
      iconClass: 'icon-Ticket',
      label: 'Tickets',
      text: 'Lorem Ipsum',
      state: this.href != 'Tickets',
      link: '/auth/ticket',
      item: [
        { name: 'Create Tickets', href: '/auth/create-ticket' },
        { name: 'Pending Tickets', href: '/auth/pending-ticket' },
        {
          name: 'Assigned Tickets', href: '/auth/assign-ticket'
        },
        {
          name: 'Closed Tickets', href: '/auth/closed-ticket'
        },
        {
          name: 'Closed Tickets', href: '/auth/cancelled-ticket'
        },
        //   { name: 'Cancelled Tickets'
        // ,href: '/auth/cancelled-ticket'
        // },
      ],
      icon: '../../assets/icons/Bookmark png (2).png',
    },
    {
      iconClass: 'icon-Requests',
      label: 'Requests',
      text: 'Lorem Ipsum',
      state: false,
      item: [{ name: 'name01', href: '/auth/cancelled-ticket' }],
      link: '/auth/requests',
      icon: '../../assets/icons/adduser.png',
    },
    {
      iconClass: 'icon-Connections',
      label: 'Connection',
      text: 'Lorem Ipsum',
      state: false,
      item: [],
      link: '/auth/connection',
      icon: '../../assets/icons/Swap.png',
    },
    {
      iconClass: 'icon-Dollar',
      label: 'Payments',
      text: 'Lorem Ipsum',
      state: false,
      item: [],

      link: '/auth/payments',
      icon: '../../assets/icons/currency-dollar.png',
    },
    {
      iconClass: 'icon-Reports',
      label: 'Reports',
      text: 'Lorem Ipsum',
      state: false,
      item: [],

      link: '/auth/reports',
      icon: '../../assets/icons/Calendar.png',
    },
    {
      iconClass: 'icon-Settingss',
      label: 'Setting',
      text: 'Lorem Ipsum',
      state: false,
      item: [],

      link: '/auth/setting',
      icon: '../../assets/icons/setting.png',
    },
  ];

  menuClick(clickedItem: number) {
    this.menuItems[clickedItem].state = !this.menuItems[clickedItem].state; // flips the boolean value for the clicked item
    for (let item of this.menuItems) {
      console.log(item, this.menuItems[clickedItem]);

      if (item !== this.menuItems[clickedItem]) {
        item.state = false;
      } else {
        item.state = true;

      }
    }
    // the for loop goes through the array and sets each item to false *if* its not the item that was clicked
  }
}

export interface CollapsibleItem {
  label: string;
  text: string;
  state: boolean;
  item: [
    {
      name: '';
    }
  ];
  link: string;
}
