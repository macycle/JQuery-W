window.jQuery=function(selectorOrArray){
    let elements;
    if(typeof selectorOrArray==='string'){
        elements=document.querySelectorAll(selectorOrArray);
    }else if(selectorOrArray instanceof Array){
        elements=selectorOrArray
    }

    return {
        oldApi:selectorOrArray.oldApi, 
        find(selector){
            let array=[];
            for(let i=0;i<elements.length;i++){
               const elements2=Array.from(elements[i].querySelectorAll(selector))   //elements[i].querySelectorAll(selector)得到伪数组
               array=array.concat(elements2)
            }
            array.oldApi=this   //this指的就是之前定义的那个api
            return jQuery(array)    //查找某些元素的子元素，并且找到后创建新的jquery返回，因为找到元素就是为了操作元素嘛；
                    
       },
       end(){
        return this.oldApi
       },
       each(fn){
        for(let i=0;i<elements.length;i++){
            fn.call(null,elements[i],i);    //fn是一个函数，这个函数是在调用的时候定义的，但是得知道他的功能是什么；以便将参数传给他；
        }
        return this    //this就是调用者，也就是api；
       },
       parent(){
           const array=[];
           this.each((node)=>{
               if(array.indexOf(node.parentNode)===-1){
                    array.push(node.parentNode)
                }
               
           })
           return jQuery(array);    //直接返回array并没有是什么操作性，于是这里封装为jquery对象
       },
       children(){
           const array=[]
           this.each((node)=>{
               array.push(...node.children)
           })
           return jQuery(array)   
       },
       print(){
           console.log(elements)   //x.print.call(x)  这个elements是新的jquery对象的elements；
       },
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className);
            }
            return this;   //链式写法的原理;在构建完之前就调用自己;
                           //调用的时候是api.addClass()==>api.addClass.call(api),api
                           //就相当于this;
                        
        }
        
    }
    // return api       //将api返回到jQuery()上；return整个对象，少写api这个变量更简洁；
}