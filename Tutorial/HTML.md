# HTML技巧

ver0.02 2020/03/30

## js获得屏幕尺寸

```typescript
  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
```

## 图片拉伸表示

```html
    background-image: url('assets/cover.jpg');  
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: 100% 100%;"
```

## Div图层效果

底部的图层position:relative;其他的图层position: absolute;当有多个图层的时候，注意对z-index: 99的设定。

```html
<div style="position:relative;
    background-image: url('assets/cover.jpg');  background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: 100% 100%;"
    [ngStyle]="{'height':clientHeight + 'px','width':clientWidth + 'px','background-image': 'url(/assets/scene/' + this.scene.Background  + '.jpg)'}"
    (click)="Next()">
    <h6 style="color: aliceblue;">{{this.scene.Title}}</h6>
    <button class="btn btn-danger" (click)="Exit()" style="float: right;">休息</button>
    <button class="btn btn-primary" (click)="Store()" style="float: right;">商店</button>
    <button class="btn btn-primary" (click)="Status()" style="float: right;">图鉴</button>
    <div
        style="position: absolute;z-index: 99; bottom: 0px;width: 100%;height: 100px;background-color: dodgerblue;opacity: 0.8;">
        <img [src]="'/assets/character/' + this.faceurl + '/头像.jpg'" height="100px" width="100px"
            style="float: left;" />
        <h5 style="color: aliceblue;margin: 10px;">
            {{line}}
        </h5>
    </div>
</div>
```
