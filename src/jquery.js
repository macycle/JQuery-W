window.jQuery=function(selectorOrArrayOrTemplate){
    let elements;   //全局变量
    if(typeof selectorOrArrayOrTemplate==='string'){
        if(selectorOrArrayOrTemplate[0]==='<'){
            //创建div
            elements=[createElement(selectorOrArrayOrTemplate)]
        }else{
            elements=document.querySelectorAll(selectorOrArrayOrTemplate);
        }
        
    }else if(selectorOrArrayOrTemplate instanceof Array){
        elements=selectorOrArrayOrTemplate;
    }
    

    function createElement(string){    //创建容器;
        const container=document.createElement('template');
        container.innerHTML=string.trim();
        return container.content.firstChild;
    }
    return {
        jquery:true,
        elements:elements,
        oldApi:selectorOrArrayOrTemplate.oldApi, 
        find(selector){
            let array=[];
            for(let i=0;i<elements.length;i++){
               const elements2=Array.from(elements[i].querySelectorAll(selector))   //elements[i].querySelectorAll(selector)得到伪数组
               array=array.concat(elements2)
            }
            array.oldApi=this   //this指的就是之前定义的那个api
            return jQuery(array)    //查找某些元素的子元素，并且找到后创建新的jquery返回，因为找到元素就是为了操作元素嘛；
                    
       },
        get(index){     //查找元素的下标
            return elements[index]
        },
        appendTo(node){
            if(node instanceof Element){
                this.each(el=>node.appendChild(el))   //遍历 elements，对每个 el 进行 node.appendChild 操作
            }else if(node.jquery===true){
                this.each(el=>node.get(0).appendChild(el))   //遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
            }
        },
        append(children){
            if(children instanceof Element){
                this.get(0).appendChild(children)
            }else if(children instanceof HTMLCollection){
                for(let i=0;i<children.length;i++){
                    this.get(0).appendChild(children[i])
                }
            }else if(children.jquery===true){
                children.each(node=>this.get(0).appendChild(node))
            }
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


window.$=window.jQuery;