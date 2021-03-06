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

## 基础FontSize的统一

不同浏览器的渲染机制不同，不同第三方组件的style设定不同，所以必须在统一全局的font-size

```css
* {
    font-size: 12px;
  }
```

## 网页整体居中

```html
<div>
    <div style="width:1140px;margin-left: auto;margin-right: auto;margin-top:10px;">
        <div>
            <router-outlet></router-outlet>
        </div>
    </div>
</div>
```

## 资源网站

[Iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn)
