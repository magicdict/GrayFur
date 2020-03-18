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
