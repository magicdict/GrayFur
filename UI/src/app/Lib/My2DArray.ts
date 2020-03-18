/**
 * @author 杨松恺
 * @date 2018-12-05 15:45:08
 * 定义二维数组，提供相关操作
 */
export class My2DArray<T>{
    private my2DArray : Array<Array<T>> =  new Array<Array<T>>();
    private rows :number;
    private columns :number;
 
    /**
     * 初始化数组
     */
    public constructor(rows:number,columns:number,value:T){
        this.rows = rows;
        this.columns = columns;
        this.initRows(rows);
        this.initColumns(columns,value);
    }
    /**
     * 取数组中的值
     */
    public getValue(rows:number,columns:number):T{
        if(rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns){
            return null;
        }
        return this.my2DArray[rows][columns];
    }
    /**
     * 为数组赋值
     */
    public setValue(rows:number,columns:number,value:T):void{
        if(rows < 0 || columns < 0 || rows >= this.rows || columns >= this.columns){
            return ;
        }
        this.my2DArray[rows][columns] = value;
    }
    /**
     * 初始化行数
     */
    private initRows(rows:number):void{
        if(rows < 1) {
            return;
        }
        for(let i = 0 ; i < rows ; i ++){
            this.my2DArray.push(new Array<T>());
        }
    }
    /**
     * 初始化列数
     */
    private initColumns(columns:number,value:T):void{
        if(columns < 1){
            return;
        }
        for(let i = 0 ; i < this.my2DArray.length ; i ++){
            for(let j = 0 ; j < columns ; j ++){
                this.my2DArray[i].push(value);
            }
        }
    }
    /**
     * 获取数组
     */
    public getArray():Array<Array<T>>{
        return this.my2DArray;
    }
}