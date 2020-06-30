# Angular技巧

ver0.02 2020/04/13

## 关于get计算属性

在界面绑定的时候，如果绑定的是get的计算属性，则get计算属性的值也是被监视的，其值也会随着其依赖的值的变化而变化的。不用担心get计算属性值在界面上不刷新。
get属性如果是对象，这个对象也是可以操作的，但是对于基本属性应该没有影响

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

图片的角度获得：get-orientation

## AdminLTE2.0 树形目录无法展开的问题

注意declare这样的写法

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

在最新版本的AdminLTE3.0中没有这个问题。

## 模态窗体

在JS里面无法模拟模态窗体组织代码的执行，所以一般使用第三方模块进行处理

```ts
import { DialogModule } from 'primeng/dialog';
```

```html
<p-dialog header="数智教育" [(visible)]="display" modal="modal"  [responsive]="true" [style.width]="'460px'">
  <p>{{errorMsgContent}}</p>
  <p-footer>
      <button type="button" class="btn btn-info" style="height: 30px;"
      (click)="hide()"><i class="fas fa-check"></i>&nbsp;确定</button>
  </p-footer>
</p-dialog>
```

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

## How do I convert a string to enum in TypeScript

```typescript
enum Color{
    Red, Green
}

// To String
 var green: string = Color[Color.Green];

// To Enum / number
var color : Color = Color[green];
```

## vconsole

```typescript
import { Component, OnInit } from '@angular/core';
import VConsole from 'vconsole';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    var vconsole = new VConsole();
  }
  title = 'RPG';
}
```

## 使用every代替for-each提前跳出循环体

```typescript
  let x = fs.GetRoleByName(this.ServantName);
  fs.MyTeam.every(
      c => {
          if (c === undefined) {
              c = x;
              return true;
          }
      }
  )
```

## WARNING in Circular dependency detected

WARNING in Circular dependency detected:
src\app\Modal\Character.ts -> src\app\Modal\SkillInfo.ts -> src\app\Modal\Character.ts

WARNING in Circular dependency detected:
src\app\Modal\SkillInfo.ts -> src\app\Modal\Character.ts -> src\app\Modal\SkillInfo.ts

先看一下SkillInfo.ts的代码，里面包含了以下类

- SkillInfo
- AttactSkillInfo
- 其他SkillInfo的类
- enmSkillType

然后看一下Character.ts里面关于SkillInfo类相关的代码

```typescript
    get CircleSkill(): SkillInfo[] {
        let sl: SkillInfo[] = [];
        if (this.Circles === undefined) return sl;
        this.Circles.forEach(
            b => {
                if (b.FirstSkill !== undefined) sl.push(b.FirstSkill);
                if (b.SecondSkill !== undefined) sl.push(b.SecondSkill);
            }
        );
        return sl;
    }
```

如果仅仅是这个样子，则没有问题。但是有一个方法不但使用了SkillInfo类，还是用了enmSkillType

```typescript
    get Skill(): SkillInfo[] {
        return this.CircleSkill.concat(this.SecondCircleSkill).concat(this.BoneSkill).concat(this.CombineSkill)
                               .filter(x=>x.SkillType !== enmSkillType.NotImplemented);
    }
```

enmSkillType造成了Circular dependency的问题。具体的原理不清楚，解决方法大致是将enmSkillType放到单独的文件中去。

## eCharts

eCharts的导入需要如下这些库的支持

[在Angular项目中导入Echarts](http://datavisualization.club/article/28)

- "ngx-echarts": "^4.2.1"
- "echarts": "^4.3.0"
- "echarts-gl": "^1.1.1"

## 文件上传案例

[How to Use Angular 8/9/10 HttpClient API to Post FormData?](https://www.positronx.io/how-to-use-angular-8-httpclient-to-post-formdata/)

大致思路是利用HttpClient进行Post操作，将[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)进行上传。

注意点：ReactiveFormsModule的imports

```typescript
import { ReactiveFormsModule } from '@angular/forms';

imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

    //获得文件对象
    const file = (event.target as HTMLInputElement).files[0];
    //准备数据
    var formData: any = new FormData();
    formData.append("avatar", this.form.get('avatar').value);
    //发送数据
    this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

```

[Angular Formdata](https://github.com/SinghDigamber/angular-formdata)

C#端的文件接收：.NetCore 3.1.2

使用IFormFile等参数无法接收到文件，直接用Request里面的文件进行处理

```csharp
        /// <summary>
        /// 上传图片,通过Form表单提交
        /// </summary>
        /// <returns></returns>
        [HttpPost(nameof(SetFootPrint))]
        public ActionResult SetFootPrint()
        {
            var files = Request.Form.Files;
            //返回的文件地址
            List<string> filenames = new List<string>();
            //文件存储路径
            var file = files[0];
            var originalImage = System.Drawing.Image.FromStream(file.OpenReadStream());
            var thumbImage = originalImage.GetThumbnailImage(128, 128, null, IntPtr.Zero);
            var filename = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + file.FileName;
            var fileStream = new FileStream(DataCenter.imagefilefolder + filename, FileMode.Create);
            thumbImage.Save(fileStream,ImageFormat.Jpeg);
            fileStream.Close();
            var x = new FootPrint()
            {
                UserImage = filename,
                Title = Request.Form["Title"][0],
                Address = Request.Form["Address"][0],
                Description = Request.Form["Description"][0],
                Datetime = Request.Form["Datetime"][0],
            };
            DataCenter.Footprints.Add(x);
            return new JsonResult("{'result':'OK'}");
        }
```

注意：NetCore需要使用System.Drawing.Common库来执行图片操作！同时需要执行以下命令安装libgdiplus！！

```shell
yum install libgdiplus-devel
```

## POST大文件时候nginx.config注意点

```yaml

http {
    include       mime.types;
    default_type  application/octet-stream;
    client_max_body_size 5m;
  }
  location / {
            client_max_body_size 5m;
  }
```

## localStorage

```typescript
import { Injectable, InjectionToken, Inject } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});

//数据存储类
@Injectable({
    providedIn: 'root'
})
export class DataStorage {
    constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {

    }
    public IsExist(key: string): boolean {
        return this.storage.getItem(key) === null;
    }

    public Load<T>(key: string): T {
        var json = this.storage.getItem(key);
        return JSON.parse(json);
    }
    public Save<T>(key: string, value: T) {
        var json = JSON.stringify(value);
        this.storage.setItem(key, json);
    }
}
```

作为一个注入服务，使用localstorage

```typescript
 constructor(public http: HttpClient,public localstorage: DataStorage) {
```

## 关于避开callback方法中的this

```typescript
 reader.onload = () => { this.FinishRun(reader.result) };    //Instance Method
 FinishRun(result: string | ArrayBuffer): any {
   ...
   ...
 }
```

如果直接使用 reader.onload = this.FinishRun 这会导致FinishRun方法的第一参数的参数名必须是this，进而导致整个方法不能用到指向本身class的this。因为这里的this代表着reader这个context。

## AppComponent不能放到路由中

AppComponent这个组件是index.html中放置的,所以如果将这个放置到路由中，则会出现重复渲染的问题（app-root挂载一次，路由挂载一次）.

```html
  <app-root></app-root>
```

例如使用了AdminLTE的框架，App组件已经包含了菜单和整体的时候，路由这样设置即可。

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Bar_BasicComponent } from './Bar/bar_basic.component';



const routes: Routes = [
  {
    path: 'bar/basic', component: Bar_BasicComponent,
  },
  {
    path: '', redirectTo: 'bar/basic', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## URL

如果需要获得url需要使用下面的方法

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './TrafficMain.component.html',
})
export class TrafficMainComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  _path = "";

  ngOnInit() {
    this._path = this.route.snapshot["_routerState"].url;
  }
}
```

但是，如果是app-root，直接被挂载到index.html下面，则无法用上面的方式获得url

```ts
import { Component, OnInit } from '@angular/core';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'VisLab';
  _path = "";
  constructor(private location: PlatformLocation,) { 
  }
  ngOnInit(): void {
    this._path =  this.location['location']['pathname'];
    console.log(this._path);
  }
}
```

## @type/packagename

有时候imports的时候，无法找到package里面的类型，则可以尝试安装一下 @type/packagename 这样的包。例如安装@type/echarts之后，可以使用ECharts类型，并且智能提示了getDataURL方法。

```ts
  import { ECharts } from 'echarts';
    public static SaveChartImage(echartsInstance : ECharts, filename: string) {
    var img = new Image();
    img.src = echartsInstance.getDataURL({
      pixelRatio: 2,
      backgroundColor: '#fff'
    });
```

## Class is using Angular features but is not decorated. Please add an explicit Angular decorator

在普通的类里面，可以使用一些 @Angular/Core的东西，但是@output()这样的东西不要使用，在Angular10里面会报错！

```ts
    @Output() ResultEvent: EventEmitter<number> = new EventEmitter<number>();
    @Output() EnemyAction: EventEmitter<string> = new EventEmitter<string>();
```

这里的@Output()没有实际作用，但是会导致Angular10编译错误！！！
