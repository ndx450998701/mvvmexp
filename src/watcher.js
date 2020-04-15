import Dep from "./dep";

var $uid = 0;
export default class Watcher{
    constructor( exp, scope, cb ){
        //数据转存
        this.exp = exp
        this.scope = scope
        this.cb = cb
        //给每一个watcher一个ID
        this.uid = $uid++
        this.update()
    }
    //通过传过来的vm作用域重新获取表达式的方法
    get(exp,scope){
        //下面这两步其实等同于eval()，就是运行计算表达式，通过传递过来的vm作用域匹配data里的数据       
        let fn = new Function('scope','with(scope) {return '+exp+'}')
        //这一步其实是将这个watcher赋予给Dep的静态参数，因为计算表达式要调用get方法，在那里
        //将此watcher添加入dep名单。
        Dep.target = this;
        let newVal = fn(scope)
        Dep.target = null;
        //let newVal = Watcher.computeExp(this.exp,this.scope)
        return newVal
    }
    //当依赖的数据更新时，重新计算表达式，并把新得结果回调回去
    update(){
        let newVal = this.get(this.exp,this.scope)
        console.log(newVal)
        if(this.cb) {this.cb(newVal)}
    }

    // static computeExp(exp,scope){
    //     let fn = new Function('scope','with(scope) {return'+exp+'}')
    //     return fn(scope)
    // }
}