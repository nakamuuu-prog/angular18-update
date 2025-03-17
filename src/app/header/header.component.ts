import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// PrimeNG コンポーネント
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    BadgeModule,
    AvatarModule,
    OverlayPanelModule,
    TieredMenuModule,
    DividerModule,
    RippleModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  notificationItems: MenuItem[] = [];
  isDarkMode: boolean = false;
  searchValue: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // メインメニュー項目
    this.items = [
      {
        label: 'ホーム',
        icon: 'pi pi-home',
        routerLink: '/home',
      },
      {
        label: '製品',
        icon: 'pi pi-shopping-bag',
        items: [
          {
            label: '新着製品',
            icon: 'pi pi-star',
          },
          {
            label: 'カテゴリー',
            icon: 'pi pi-list',
            items: [
              {
                label: 'エレクトロニクス',
                icon: 'pi pi-desktop',
              },
              {
                label: 'ファッション',
                icon: 'pi pi-shopping-cart',
              },
              {
                label: 'ホーム＆キッチン',
                icon: 'pi pi-home',
              },
            ],
          },
          {
            label: 'セール',
            icon: 'pi pi-percentage',
          },
        ],
      },
      {
        label: 'サービス',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'コンサルティング',
            icon: 'pi pi-briefcase',
          },
          {
            label: 'サポート',
            icon: 'pi pi-question-circle',
          },
          {
            label: 'トレーニング',
            icon: 'pi pi-book',
          },
        ],
      },
      {
        label: 'ブログ',
        icon: 'pi pi-file',
        routerLink: '/blog',
      },
      {
        label: 'お問い合わせ',
        icon: 'pi pi-envelope',
        routerLink: '/contact',
      },
    ];

    // ユーザーメニュー項目
    this.userMenuItems = [
      {
        label: 'プロフィール',
        icon: 'pi pi-user',
        routerLink: '/profile',
      },
      {
        label: '設定',
        icon: 'pi pi-cog',
        routerLink: '/settings',
      },
      {
        label: 'お気に入り',
        icon: 'pi pi-heart',
        routerLink: '/favorites',
      },
      {
        separator: true,
      },
      {
        label: 'ログアウト',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];

    // 通知メニュー項目
    this.notificationItems = [
      {
        label: '新しいメッセージが届いています',
        icon: 'pi pi-envelope',
        styleClass: 'notification-item',
        escape: false,
      },
      {
        label: '注文 #1234 が発送されました',
        icon: 'pi pi-shopping-cart',
        styleClass: 'notification-item',
        escape: false,
      },
      {
        label: 'セキュリティアラート: 新しいデバイスからのログイン',
        icon: 'pi pi-exclamation-triangle',
        styleClass: 'notification-item notification-warning',
        escape: false,
      },
      {
        separator: true,
      },
      {
        label: 'すべての通知を見る',
        icon: 'pi pi-list',
        command: () => {
          this.router.navigate(['/notifications']);
        },
      },
    ];
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  search() {
    if (this.searchValue.trim()) {
      console.log('検索クエリ:', this.searchValue);
      // ここに検索ロジックを実装
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchValue },
      });
      this.searchValue = '';
    }
  }

  logout() {
    console.log('ログアウト処理');
    // ログアウト処理を実装
    this.router.navigate(['/login']);
  }
}
