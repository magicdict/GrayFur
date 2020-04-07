# Angular技巧

ver0.01 2020/04/03

## 关于get计算属性

在界面绑定的时候，如果绑定的是get的计算属性，则get计算属性的值也是被监视的，其值也会随着其依赖的值的变化而变化的。不用担心get计算属性值在界面上不刷新。

## *ngFor在无子元素的组件上运用

一般的li,tr元素，由于都包含了子元素，所以觉得可以用 *ngFor,对于img这种没有子元素的组件，同样也可以使用 ngFor的。

```html
        <img  *ngFor="let s of this.StatusTitle" [src]="'/assets/Icons/' + s" width="16px" height="16px" />
```

只有 ngSwitch需要有父元素

```html
<div [ngSwitch]="this.Status" style="width: 52px;height: 52px;padding: 2px;"
    [ngStyle]="{'background-color':BackGoundColor}" (click)="CellClicked()">
    <img *ngSwitchCase="HideStatus" [src]="'/assets/minilogo.jpg'" width="48px" height="48px">
    <img *ngSwitchCase="ShowStatus" [src]="'/assets/character/' + ImageName + '/头像.jpg'" width="48px" height="48px">
    <img *ngSwitchCase="SelectedStatus" [src]="'/assets/character/' + ImageName + '/头像.jpg'" width="48px" height="48px">
</div>
```

## 图片的Lazy-Load

[Lazy-Load的Github主页](https://github.com/tjoskar/ng-lazyload-image)

安装模块 ng-lazyload-image

imports LazyLoadImageModule

## AdminLTE 树形目录无法展开的问题

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './TrafficMain.component.html',
})
export class TrafficMainComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  _path = "";

  ngOnInit() {
    this._path = this.route.snapshot["_routerState"].url;
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      if (trees) {
        trees.tree();
      }
    });
  }
}
```

## 模态窗体

在JS里面无法模拟模态窗体组织代码的执行，所以一般这样处理

```typescript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-message-dialog',
  templateUrl: './error-message-dialog.component.html'
})
export class ErrorMessageDialogComponent implements OnInit {

  @Input()
  set display(val: boolean) {
    this._display = val;
  }
  get display(): boolean { return this._display; }

  get errorMsgContent(): string { return this._errorMsgContent; }

  constructor() { }

  private _display = false;
  private _errorMsgContent: string;

  /** 由于无法阻止代码的执行，所以这里使用回调进行后续处理 */
  public callbackMethod: any;

  show(errorMsgContent: string) {
    this._display = true;
    this._errorMsgContent = errorMsgContent;
  }

  hide() {
    if (this.callbackMethod != null) { this.callbackMethod(); }
    this.callbackMethod = null;
    this._display = false;
  }

  ngOnInit() {
  }

}
```

## 全屏

全屏操作必须用户确认后才能执行

```typescript
/**全屏模式 */
  fullScreen() {
    let el = document.documentElement as any;
    let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (typeof rfs != "undefined" && rfs) {
      rfs.call(el);
    };
    return;
  }

  // 订阅句柄
  private pickhandler: any;

  ngOnInit(): void {
    if (this.service.SchoolOverview === undefined) {
      //页面被强制刷新的时候，回到Home页面
      //第一次HOME页面进入的时候应该有数据，所以不会命中
      this.Home();
      return;
    }
    if (this.service.IsFirstRun === false) {
      this.service.IsFirstRun = true;
      this.confirmationService.confirm({
        message: '推荐在全屏模式下进行数据展示以获得最佳视觉效果，是否启用全屏模式？',
        acceptLabel: '确定',
        rejectLabel: '取消',
        header: '确认信息',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.fullScreen();
          this.service.IsFullScreen = true;
          return;
        },
        reject: () => {
          return;
        }
      });
    }
    var ua = window.navigator.userAgent;
    //console.log(ua);
  }
```

## How do I initialize a TypeScript object with a JSON object

[How do I initialize a TypeScript object with a JSON object](https://stackoverflow.com/questions/22885995/how-do-i-initialize-a-typescript-object-with-a-json-object)
