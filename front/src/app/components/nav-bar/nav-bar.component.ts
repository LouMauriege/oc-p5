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
                    <li><a routerLink="/me" routerLinkActive="active">me(image)</a></li>
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
        }
        .active {
            color: #754fec;
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
