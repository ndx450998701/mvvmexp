import Dep from "./dep";

export default class Observer{
    constructor(data){
        //将获取的数据赋予给自己的_data
        this._data = data;
        //对_data进行遍历
        this.walk(this._data)
    }
    walk(data){
        //判断是否是对象，若不是则直接返回。用于后面递归
        if(!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            //对_data进行defineProperty重写
            this.defineReactive(data,key,data[key])
        })       
    }
    defineReactive(data,key,value){
        let dep = new Dep();
        Object.defineProperty(data,key,{
            enumerable:true,
            get(){
                if(Dep.target) {dep.addList(Dep.target)}
                return value
            },
            set(newVal){
                console.log('调用了set方法')
                value = newVal
                //提醒view改变。
                dep.notify()
            }
        })
        //对_data里的value进行递归，如果是string，num递归结束，
        //如果是arry或者obj则进行下一轮的遍历，保证所有对象属性都进行defineProperty重写
        this.walk(value)
    }
}