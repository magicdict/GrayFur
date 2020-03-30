# Angular技巧

ver0.01 2020/03/30

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
