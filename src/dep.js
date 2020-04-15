export default class Dep{
    constructor(){
        //用于存放依赖的名单列表
        this.list = {}
    }
    //把watcher添加进依赖名单的方法
    addList(target){
        this.list[target.uid] = target
    }
    //当依赖的数据改变时通知所有名单上的watcher
    notify(){
        for( let item in this.list ) {
            this.list[item].update()
        }
    }
}