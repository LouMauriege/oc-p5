import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'

@Component({
    selector: 'app-nav-bar',
    template: `
        <nav class="navbar" *ngIf="actualRoute != '/'">
            <img src="/assets/logo_p6.png" alt="logo" class="navbar__logo"/>
            <div *ngIf="actualRoute != '/register' && actualRoute != '/login'">
                <ul class="navbar__links-list">
                    <li><a routerLink="/posts" routerLinkActive="active">Articles</a></li>
                    <li><a routerLink="/topics" routerLinkActive="active">Thèmes</a></li>
                    <li><a routerLink="/me" class="user-link" routerLinkActive="active"></a></li>
                </ul>
            </div>
        </nav>
    `,
    styles: [`
        .navbar {
            background-color: #f2f2f2;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .navbar__logo {
            height: 80px;
        }
        .navbar__links-list {
            display: flex;
            align-items: center;
            column-gap: 16px;
            padding-right: 32px;
        }
        .active {
            color: #754fec;
        }
        .user-link {
            background-image: url("/assets/user.png");
            display: block;
            width: 48px;
            height: 48px;
        }
        .user-link.active {
            background-image: url("/assets/user-active.png");
        }
    `]
})
export class NavBarComponent implements OnInit {

    public actualRoute: string | undefined;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.actualRoute = this.router.url;

        this.router.events.subscribe(
            (event) => {
                if (event instanceof NavigationEnd) {
                    this.actualRoute = event.url;
                }
            }
        );
    }

}
