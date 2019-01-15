import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';

import {NbMenuService, NbSearchService, NbSidebarService} from '@nebular/theme';
import {UserService} from '../../../@core/data/users.service';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {LayoutService} from '../../../@core/data/layout.service';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SearchService} from "../../../services/search/search.service";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() position = 'normal';

  user: any = null;

  userMenuSubscription: any;

  userMenu = [{title: 'Profiel'}, {title: 'Uitloggen', link: ['/auth/logout']}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              private searchService: NbSearchService,
              private apiSearchService: SearchService,
              private router: Router) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        /*this.router.navigate(['search']);
        this.apiSearchService.getSearchResults(data.term).subscribe((res) => {
          console.log(res);
        }, (err) => {
          console.log(err);
        });*/
        // this.value = data.term;
      })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
