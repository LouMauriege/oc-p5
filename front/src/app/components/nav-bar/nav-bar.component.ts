import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'

@Component({
    selector: 'app-nav-bar',
    template: `
    <div class="component-wrapper">
        <nav class="navbar" *ngIf="screenWidth > 700 && actualRoute != '/'">
            <img src="/assets/logo_p6.png" alt="logo" class="navbar__logo"/>
            <div *ngIf="actualRoute != '/register' && actualRoute != '/login'">
                <ul class="navbar__links-list">
                    <li><a routerLink="/posts" routerLinkActive="active">Articles</a></li>
                    <li><a routerLink="/topics" routerLinkActive="active">Thèmes</a></li>
                    <li><a routerLink="/me" class="user-link" routerLinkActive="active"></a></li>
                </ul>
            </div>
        </nav>
        <nav class="navbar" *ngIf="screenWidth <= 700 && !(actualRoute == '/' || actualRoute == '/login' || actualRoute == '/register')">
            <img src="/assets/logo_p6.png" alt="logo" class="navbar__logo"/>
            <svg (click)="open()" width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="23.7037" height="2.96296" fill="black"/>
                <rect y="6.51849" width="23.7037" height="2.96296" fill="black"/>
                <rect y="13.037" width="23.7037" height="2.96296" fill="black"/>
            </svg>
            <div *ngIf="(actualRoute != '/register' && actualRoute != '/login') && !hide" (click)="close()" >
                <ul class="navbar__links-list">
                    <li>
                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="23.7037" height="2.96296" fill="black"/>
                            <rect y="6.51849" width="23.7037" height="2.96296" fill="black"/>
                            <rect y="13.037" width="23.7037" height="2.96296" fill="black"/>
                        </svg>
                    </li>
                    <li><a routerLink="/posts" routerLinkActive="active">Articles</a></li>
                    <li><a routerLink="/topics" routerLinkActive="active">Thèmes</a></li>
                    <li><a routerLink="/me" class="user-link" routerLinkActive="active"></a></li>
                </ul>
            </div>
        </nav>
    </div>
    `,
    styles: [`
        .component-wrapper {
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
        }
        .navbar {
            width: 100%;
            background-color: #f2f2f2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 99;
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
        @media (max-width: 700px) {
        .component-wrapper {
            position: fixed;

        }
            .navbar__logo {
                width: 92px;
                height: 53px;
            }

            .navbar > svg {
                margin-right: 16px;
            }

            .navbar > div {
                position: fixed;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                display: flex;
                justify-content: flex-end;
                // height: 100svh;
                background-color:rgba(0, 0, 0, 0.3);
                z-index: 9;
            }

            .navbar__links-list {
                max-width: fit-content;
                background-color: white;
                height: 100%;
                flex-direction: column;
                align-items: end;
                position: relative;
                margin-right: 0;
                padding-left: 128px;
            }

            .navbar__links-list>li {
                margin-top: 32px;
            }

            .navbar__links-list>li:last-child {
                position: absolute;
                bottom: 16px;
            }
        }
    `]
})
export class NavBarComponent implements OnInit {

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.screenWidth = window.innerWidth;
    }

    public hide: boolean = true;
    public screenWidth: number = window.innerWidth;
    public actualRoute: string | undefined;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;

        this.actualRoute = this.router.url;

        this.router.events.subscribe(
            (event) => {
                if (event instanceof NavigationEnd) {
                    this.actualRoute = event.url;
                }
            }
        );
    }

    public open() {
        this.hide = false;
    }

    public close() {
        this.hide = true;
    }

}
