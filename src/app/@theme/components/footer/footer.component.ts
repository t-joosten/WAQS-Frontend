import {Component} from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">© 2018 - <a href="/" target="_blank">WAQS</a></span>
  `,
})
export class FooterComponent {
}
