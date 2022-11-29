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
  ) {}
  public href: string = '';
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
    } else if (urlSpilite[2] === 'create-ticket') {
      this.href = 'Tickets';
    } else if (urlSpilite[2] === 'sendmessage') {
      this.href = 'Send Message';
    } else if (urlSpilite[2] === 'review') {
      this.href = 'Review';
    } else if (urlSpilite[2] === 'comment') {
      this.href = 'Comment';
    } else if (urlSpilite[2] === 'replycomment') {
      this.href = 'Reply Comment';
    } else if (urlSpilite[2] === 'setting') {
      this.href = 'Setting';
    } else if (urlSpilite[2] === '') {
      this.href = '';
    } else if (urlSpilite[2].length < 0) {
      this.href = 'testeter';
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
      state: false,
      link: '/auth/create-ticket',
      item: [
        { name: 'Create Tickets', href: '/auth/create-ticket' },
        { name: 'Pending Tickets', href: '/auth/pending-ticket' },
        {
          name: 'Assigned Tickets',
        },
        {
          name: 'Closed Tickets',
        },
        { name: 'Cancelled Tickets' },
      ],
      icon: '../../assets/icons/Bookmark png (2).png',
    },
    {
      iconClass: 'icon-Requests',
      label: 'Requests',
      text: 'Lorem Ipsum',
      state: false,
      item: [{ name: 'name01' }],
      link: '/auth/dashboard',
      icon: '../../assets/icons/adduser.png',
    },
    {
      iconClass: 'icon-Ticket',
      label: 'Connection',
      text: 'Lorem Ipsum',
      state: false,
      item: [{ name: 'name01' }],
      link: '/auth/dashboard',
      icon: '../../assets/icons/Swap.png',
    },
    {
      iconClass: 'icon-Dollar',
      label: 'Payments',
      text: 'Lorem Ipsum',
      state: false,
      item: [{ name: 'name01' }],
      link: '/auth/dashboard',
      icon: '../../assets/icons/currency-dollar.png',
    },
    {
      iconClass: 'icon-Reports',
      label: 'Reports',
      text: 'Lorem Ipsum',
      state: false,
      item: [{ name: 'name01' }],
      link: '/auth/dashboard',
      icon: '../../assets/icons/Calendar.png',
    },
    {
      iconClass: 'icon-Settingss',
      label: 'Setting',
      text: 'Lorem Ipsum',
      state: false,
      item: [{ name: 'name01' }],
      link: '/auth/dashboard',
      icon: '../../assets/icons/setting.png',
    },
  ];

  menuClick(clickedItem: number) {
    this.menuItems[clickedItem].state = !this.menuItems[clickedItem].state; // flips the boolean value for the clicked item
    for (let item of this.menuItems) {
      if (item !== this.menuItems[clickedItem]) {
        item.state = false;
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
