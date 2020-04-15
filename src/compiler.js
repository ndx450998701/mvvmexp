import Watcher from "./watcher"

export default class Compiler{
    constructor(context){
        //console.log(context)
        //数据转存
        this.$el = context.$el 
        this._context = context
        if(this.$el){
           //第一步是创建一个新的空白文档片段并把节点里的子节点添加进去
            this.$fragment = this.createFragment(this.$el)
            //对这个文档进行编译
            this.compiler(this.$fragment)
            
            //将编译后的稳定添加回元素里
            this.$el.appendChild(this.$fragment) 
        }       
    }
    //创建空的文档节点，将判断有用的子节点添加进去
    createFragment(node){
        //判断子节点是否存在，是否为空
        if( node.childNodes && node.childNodes.length){
            let fragment = document.createDocumentFragment()
            node.childNodes.forEach( child => {
                //判断是否是可忽略的子节点(换行符，空等)
                if(!this.ignorable(child)){
                    //不可忽略的子节点插入到这个新建的文档节点中
                    fragment.appendChild(child)
                }
            })
            //将插完了有用的子节点的文档节点返回
            return fragment
        }
    }
    //判断子节点是否可忽略的方法
    ignorable(childNode){
        let reg = /^[\t\n\r]+/ ;
        return (childNode.nodeType === 8 || (childNode.nodeType === 3 && reg.test(childNode.textContent)))
    }
    //编译方法
    compiler(node){       
        if( node.childNodes && node.childNodes.length){          
            node.childNodes.forEach( child => {
                if(child.nodeType === 1){
                    //nodeType=1说明是元素节点，用元素的编译方法
                    this.compilerElementNode(child)
                }else if(child.nodeType === 3){
                    //nodeType=3说明是文本节点，用文本的编译方法
                    this.compilerTextNode(child)
                }
            })
        }
    }
    //编译元素节点的方法
    compilerElementNode(elementNode){
        let attrs = [...elementNode.attributes]
        attrs.forEach( attr => {
            let { name:attrName, value:attrValue } = attr 
            if(attrName.indexOf('v-') === 0){
                //attrName.indexOf('v-')=0说明该属性以v-开头，是v指令，这时候判断是text还是model
                let command = attrName.slice(2)
                switch(command){
                    case "text":
                        new Watcher( attrValue, this._context, newValue => {
                            elementNode.textContent = newValue
                        })
                        break;
                    case 'model':
                        new Watcher( attrValue, this._context, newValue => {
                            elementNode.value = newValue
                        })
                        let that = this
                        elementNode.addEventListener('input', e => {
                            that._context[attrValue] = e.target.value
                        })
                        break;
                }
            }
        })
        this.compiler(elementNode)
    }
    //编译文本节点的方法
    compilerTextNode(textNode){
        console.log(textNode)
        let text = textNode.textContent.trim()
        if(text){
            //把text转换成表达式
            let exp = this.parseText(text)
            //因为在这里既有计算式，也有作用域textNode，所以在这里添加订阅者
            //当表达式依赖的数据变化时，重新计算表达式并赋予给textNode.textContent
            //这就完成了model => view 的响应式
            new Watcher( exp, this._context, (newVal) => {
                //回调函数，将新得计算式结果赋予回文档节点，顺便提一嘴this._context就是转存的vm实例也就是作用域
                textNode.textContent = newVal
            })
        }        
    }
    parseText(text){
        //表达式的意思是，例如111{{msg+'222'}}333转换为'111'+msg+'222'+'333'
        let arr = []
        let reg = /\{\{(.+?)\}\}/g  
        let matches = text.match(reg)
        //匹配的结果是被双花括号包起来的，即{{msg+'222'}}
        //用正则将字符串分割开及部分
        let pieces = text.split(reg)
        //结果即['111','msg+"222"','333']
        pieces.forEach( item => {
            //遍历['111','msg+"222"','333']并匹配出插值号中的'msg+"222"'
            if( matches && (matches.indexOf('{{'+item+'}}')>-1) ){
                //将其形式变成(msg+'222')
                arr.push('('+item+')')
            }else{
                //其他直接加入数组
                arr.push('`'+item+'`')
            }
        })
        //返回的结果便是111+(msg+'222')+333
        return arr.join('+')
    }
}