import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, AfterViewInit, OnChanges {
  private inited = false;
  @ViewChild('conTpl') private conTpl: ElementRef;
  private _menus: Menu[];

  private get menus() {
    if (this._menus) {
      return this._menus;
    }
    this._menus = this.menuSrv.getPathByUrl(this.route.url.split('?')[0]);

    return this._menus;
  }

  // region fields
  _title: string;
  _titleTpl: TemplateRef<any>;
  @Input()
  set title(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._title = null;
      this._titleTpl = value;
    } else {
      this._title = value;
    }
  }

  @Input() home: string;

  @Input() home_link: string;

  @Input() home_i18n: string;

  /**
   * ×Ô¶¯Éú³Éµ¼º½£¬ÒÔµ±Ç°Â·ÓÉ´ÓÖ÷²Ëµ¥ÖÐ¶¨Î»
   */
  @Input()
  get autoBreadcrumb() {
    return this._autoBreadcrumb;
  }
  set autoBreadcrumb(value: any) {
    this._autoBreadcrumb = toBoolean(value);
  }
  private _autoBreadcrumb = true;

  /**
   * ×Ô¶¯Éú³É±êÌâ£¬ÒÔµ±Ç°Â·ÓÉ´ÓÖ÷²Ëµ¥ÖÐ¶¨Î»
   */
  @Input()
  get autoTitle() {
    return this._autoTitle;
  }
  set autoTitle(value: any) {
    this._autoTitle = toBoolean(value);
  }
  private _autoTitle = true;

  paths: any[] = [];

  @ContentChild('breadcrumb') breadcrumb: TemplateRef<any>;

  @ContentChild('logo') logo: TemplateRef<any>;

  @ContentChild('action') action: TemplateRef<any>;

  @ContentChild('content') content: TemplateRef<any>;

  @ContentChild('extra') extra: TemplateRef<any>;

  @ContentChild('tab') tab: TemplateRef<any>;

  // endregion

  constructor(private renderer: Renderer2,
              private route: Router) { }

  refresh() {
    this.setTitle().genBreadcrumb();
  }

  genBreadcrumb() {
    if (this.breadcrumb || !this.autoBreadcrumb || this.menus.length <= 0) {
      return;
    }
    const paths: any[] = [];
    this.menus.forEach(item => {
      if (typeof item.hideInBreadcrumb !== 'undefined' && item.hideInBreadcrumb) {
        return;
      }
      const title = item.text;
      paths.push({ title, link: item.link && [item.link] });
    });
    // add home
    if (this.home) {
      paths.splice(0, 0, {
        title: this.home,
        link: [this.home_link],
      });
    }
    this.paths = paths;
    return this;
  }

  setTitle() {
    if (
      typeof this._title === 'undefined' &&
      typeof this._titleTpl === 'undefined' &&
      this.autoTitle &&
      this.menus.length > 0
    ) {
      const item = this.menus[this.menus.length - 1];
      const title = item.text;
      this._title = title;
    }

    return this;
  }

  checkContent() {
    if (isEmpty(this.conTpl.nativeElement)) {
      this.renderer.setAttribute(this.conTpl.nativeElement, 'hidden', '');
    } else {
      this.renderer.removeAttribute(this.conTpl.nativeElement, 'hidden');
    }
  }

  ngOnInit() {
    this.refresh();
    this.inited = true;
  }

  ngAfterViewInit(): void {
    this.checkContent();
  }

  ngOnChanges(): void {
    if (this.inited) {
      this.refresh();
    }
  }
}
