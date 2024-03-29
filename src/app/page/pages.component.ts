import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  i: any;
  div1: boolean = true;
  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}
  public href: string = '';
  public link: string = '';
  public sublink: string = '';
  public contentSubHeading: string = '';
  public navName: string = '';
  currentlyOpenedItemIndex = -1;
  admin: any;
  logout() {
    localStorage.clear();
    window.location.reload();
  }
  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
    } else {
      window.location.href = '/login';
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 1200px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

      this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => {
          if (this.sidenav.mode === 'over') {
            this.sidenav.close();
          }
        });
    });
  }
  getNavName() {
    var url = this.router.url;
    var urlSpilite = url.split('/');
    if (urlSpilite[2] === 'dashboard') {
      this.href = 'Dashboard';
      this.link = '/auth/dashboard';
      this.contentSubHeading = 'Welcome back, Alex';
    } else if (urlSpilite[2] === 'create-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/create-ticket';
      this.sublink = '/auth/create-ticket';
      this.contentSubHeading = 'Tickets > Create Tickets';
    } else if (urlSpilite[2] === 'pending-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/pending-ticket';
      this.sublink = '/auth/pending-ticket';
      this.contentSubHeading = 'Tickets > Pending Tickets';
    } else if (urlSpilite[2] === 'assign-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/assign-ticket';
      this.sublink = '/auth/assign-ticket';
      this.contentSubHeading = 'Tickets > Assign Tickets';
    } else if (urlSpilite[2] === 'closed-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/closed-ticket';
      this.sublink = '/auth/closed-ticket';
      this.contentSubHeading = 'Tickets > Closed Tickets';
    } else if (urlSpilite[2] === 'cancelled-ticket') {
      this.href = 'Tickets';
      this.link = '/auth/cancelled-ticket';
      this.sublink = '/auth/cancelled-ticket';
      this.contentSubHeading = 'Tickets > Cancelled Tickets';
    }
    // request
    else if (urlSpilite[2] === 'create-request') {
      this.href = 'Requests';
      this.link = '/auth/create-request';
      this.sublink = '/auth/create-request';
      this.contentSubHeading = 'Requests > Create Requests';
    } else if (urlSpilite[2] === 'pending-request') {
      this.href = 'Requests';
      this.link = '/auth/pending-request';
      this.sublink = '/auth/pending-request';
      this.contentSubHeading = 'Requests > Pending Requests';
    } else if (urlSpilite[2] === 'assign-request') {
      this.href = 'Requests';
      this.link = '/auth/assign-request';
      this.sublink = '/auth/assign-request';
      this.contentSubHeading = 'Requests > Assign Requests';
    } else if (urlSpilite[2] === 'closed-request') {
      this.href = 'Requests';
      this.link = '/auth/closed-request';
      this.sublink = '/auth/closed-request';
      this.contentSubHeading = 'Requests > Closed Requests';
    } else if (urlSpilite[2] === 'cancelled-request') {
      this.href = 'Requests';
      this.link = '/auth/cancelled-request';
      this.sublink = '/auth/cancelled-request';
      this.contentSubHeading = 'Requests > Cancelled Requests';
    } else if (urlSpilite[2] === 'all-connection') {
      this.href = 'Connections';
      this.link = '/auth/all-connection';
      this.sublink = '/auth/all-connection';
      this.contentSubHeading = 'Connections > All Connection';
    } else if (urlSpilite[2] === 'new-connection') {
      this.href = 'Connections';
      this.link = '/auth/new-connection';
      this.sublink = '/auth/new-connection';
      this.contentSubHeading = 'Connections > New Connection';
    } else if (urlSpilite[2] === 'alter-connection') {
      this.href = 'Connections';
      this.link = '/auth/alter-connection';
      this.sublink = '/auth/alter-connection';
      this.contentSubHeading = 'Connections > Alter Connection';
    } else if (urlSpilite[2] === 'make-payment') {
      this.href = 'Payments';
      this.link = '/auth/make-payment';
      this.sublink = '/auth/make-payment';
      this.contentSubHeading = 'Payments > Make Payment';
    } else if (urlSpilite[2] === 'adjust-payment') {
      this.href = 'Payments';
      this.link = '/auth/adjust-payment';
      this.sublink = '/auth/adjust-payment';
      this.contentSubHeading = 'Payments > Adjust Payment';
    } else if (urlSpilite[2] === 'add-arrears') {
      this.href = 'Payments';
      this.link = '/auth/add-arrears';
      this.sublink = '/auth/add-arrears';
      this.contentSubHeading = 'Payments > Add Arrears';
    } else if (urlSpilite[2] === 'add-rentals') {
      this.href = 'Payments';
      this.link = '/auth/add-rentals';
      this.sublink = '/auth/add-rentals';
      this.contentSubHeading = 'Payments > Add Rentals';
    } else if (urlSpilite[2] === 'user-report') {
      this.href = 'Reports';
      this.link = '/auth/user-report';
      this.sublink = '/auth/user-report';
      this.contentSubHeading = 'Reports > User Report';
    } else if (urlSpilite[2] === 'due-report') {
      this.href = 'Reports';
      this.link = '/auth/due-report';
      this.sublink = '/auth/due-report';
      this.contentSubHeading = 'Reports > Due Report';
    } else if (urlSpilite[2] === 'collection-report') {
      this.href = 'Reports';
      this.link = '/auth/collection-report';
      this.sublink = '/auth/collection-report';
      this.contentSubHeading = 'Reports > Collection Report';
    } else if (urlSpilite[2] === 'unpaid-report') {
      this.href = 'Reports';
      this.link = '/auth/unpaid-report';
      this.sublink = '/auth/unpaid-report';
      this.contentSubHeading = 'Reports > Unpaid Report';
    } else if (urlSpilite[2] === 'users-setting') {
      this.href = 'Settings';
      this.link = '/auth/users-setting';
      this.sublink = '/auth/users-setting';
      this.contentSubHeading = 'Settings > Users';
    } else if (urlSpilite[2] === 'roles-setting') {
      this.href = 'Settings';
      this.link = '/auth/roles-setting';
      this.sublink = '/auth/roles-setting';
      this.contentSubHeading = 'Settings > Roles';
    } else if (urlSpilite[2] === 'roads-setting') {
      this.href = 'Settings';
      this.link = '/auth/roads-setting';
      this.sublink = '/auth/roads-setting';
      this.contentSubHeading = 'Settings > Roads';
    } else if (urlSpilite[2] === 'areas-setting') {
      this.href = 'Settings';
      this.link = '/auth/areas-setting';
      this.sublink = '/auth/areas-setting';
      this.contentSubHeading = 'Settings > Areas';
    } else if (urlSpilite[2] === 'branches-setting') {
      this.href = 'Settings';
      this.link = '/auth/branches-setting';
      this.sublink = '/auth/branches-setting';
      this.contentSubHeading = 'Settings > Branches';
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
          href: '/auth/assign-ticket',
        },
        {
          name: 'Closed Tickets',
          href: '/auth/closed-ticket',
        },
        {
          name: 'Cancelled Tickets',
          href: '/auth/cancelled-ticket',
        },
      ],
      icon: '../../assets/icons/Bookmark png (2).png',
    },
    {
      iconClass: 'icon-Requests',
      label: 'Requests',
      text: 'Lorem Ipsum',
      state: false,
      item: [
        { name: 'Create Requests', href: '/auth/create-request' },
        { name: 'Pending Requests', href: '/auth/pending-request' },
        {
          name: 'Assigned Requests',
          href: '/auth/assign-request',
        },
        {
          name: 'Closed Requests',
          href: '/auth/closed-request',
        },
        {
          name: 'Cancelled Requests',
          href: '/auth/cancelled-request',
        },
      ],
      link: '/auth/create-request',
      icon: '../../assets/icons/adduser.png',
    },
    {
      iconClass: 'icon-Connections',
      label: 'Connections',
      text: 'Lorem Ipsum',
      state: false,
      item: [
        { name: 'All Connection', href: '/auth/all-connection' },
        { name: 'New Connection', href: '/auth/new-connection' },
        {
          name: 'Alter Connection',
          href: '/auth/alter-connection',
        },
      ],
      link: '/auth/all-connection',
      icon: '../../assets/icons/Swap.png',
    },
    {
      iconClass: 'icon-Dollar',
      label: 'Payments',
      text: 'Lorem Ipsum',
      state: false,
      item: [
        { name: 'Make Payment', href: '/auth/make-payment' },
        { name: 'Adjust Payment', href: '/auth/adjust-payment' },
        {
          name: 'Add Arrears',
          href: '/auth/add-arrears',
        },
        {
          name: 'Add Rental',
          href: '/auth/add-rentals',
        },
      ],
      link: '/auth/make-payment',
      icon: '../../assets/icons/currency-dollar.png',
    },
    {
      iconClass: 'icon-Reports',
      label: 'Reports',
      text: 'Lorem Ipsum',
      state: false,
      item: [
        { name: 'User Report', href: '/auth/user-report' },
        { name: 'Collection Report', href: '/auth/collection-report' },
        {
          name: 'Due Report',
          href: '/auth/due-report',
        },
        {
          name: 'Unpaid Report',
          href: '/auth/unpaid-report',
        },
      ],

      link: '/auth/user-report',
      icon: '../../assets/icons/Calendar.png',
    },
    {
      iconClass: 'icon-Settingss',
      label: 'Settings',
      text: 'Lorem Ipsum',
      state: false,
      item: [
        { name: 'Users', href: '/auth/users-setting' },
        { name: 'Roles', href: '/auth/roles-setting' },
        {
          name: 'Roads',
          href: '/auth/roads-setting',
        },
        {
          name: 'Areas',
          href: '/auth/areas-setting',
        },
        {
          name: 'Branches',
          href: '/auth/branches-setting',
        },
      ],

      link: '/auth/users-setting',
      icon: '../../assets/icons/setting.png',
    },
  ];

  menuClick(clickedItem: number) {
    this.div1 = true;
    // flips the boolean value for the clicked item
    this.menuItems[clickedItem].state = !this.menuItems[clickedItem].state;
    if (this.currentlyOpenedItemIndex === clickedItem) {
      this.currentlyOpenedItemIndex = -1;
    } else {
      this.currentlyOpenedItemIndex = clickedItem;
      for (let item of this.menuItems) {
        if (item !== this.menuItems[clickedItem]) {
          item.state = false;
        } else {
          item.state = true;
        }
      }
    }
  }
  menuStart() {
    var url = this.router.url;
    var urlSpilite = url.split('/');
  }
  fullScreen() {
    var isInFullScreen =
      document.fullscreenElement && document.fullscreenElement !== null;

    var docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  Profile() {
    this.router
      .navigateByUrl(`/auth/profile`)
      .then(() => (this.router.navigated = false))
      .then(() => this.router.navigate([`/auth/profile`]));
    this.div1 = false;
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
