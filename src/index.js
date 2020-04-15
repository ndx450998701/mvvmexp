import Observer from "./observer"
import Compiler from "./compiler"

class Vue{
    constructor(options){
        //先来造Vue的壳子，主要包括获取数据，数据劫持模块，数据编译模块
        //获取数据
        this.$el = document.querySelector(options.el)
        this.$data = options.data || {};
        //执行数据代理
        this._proxyData(this.$data)
        //数据劫持模块--传入data数据
        new Observer(this.$data)
        //数据编译模块--传入整个元素和作用域
        new Compiler(this)
    }
    //数据代理的方法
    _proxyData(data){
        Object.keys(data).forEach( key => {
            Object.defineProperty( this, key, {
                //这里的this指代的就是vm
                enumerable:true,
                get(){
                    return data[key]
                },
                set(newValue){
                    data[key] = newValue
                }
            })
        })
    }
    //函数代理的方法
    _proxyMethods(methods){
        if(methods && typeof methods === "object"){
            Object.keys(data).forEach( key => {
                this[key] = methods[key]
            })
        }        
    }
}

window.Vue = Vue