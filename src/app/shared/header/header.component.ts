import { Component } from "@angular/core";
import { AuthService } from 'src/app/auth/auth.service';
import { AuthGuard } from "src/app/auth/auth.guard";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "app-header",
    templateUrl: "header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    isAuthenticated: boolean = false;

    constructor(
        private authService: AuthService,
        private authGuard: AuthGuard,
        private translate: TranslateService
    ) {
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    logout(): void {
        this.authService.logout();
    }

    setActiveLanguage(language: string): void {
        this.translate.use(language);
    }

    isAdminOnly() {
        return this.authGuard.isAvailableForRoles(['admin']);
    }
}
