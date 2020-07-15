## 手动实现jQuery库

通过封装jquery来学习jquery以及掌握js语法。


## 介绍
window.jQuery()是本次提供的全局函数，也可以同过简写的方式来调用

window.jQuery()===window.$()

`注`: jQuery是一个不需要使用new的构造函数,之所以说他是构造函数是因为他并不直接返回元素，而是先进过特殊的处理；


## 使用

###### $(selectorOrArrayOrTemplate)   
    这是一个重载函数，根据接收参数形式的不同，返回不同的结果。
    参数是一个选择器，返回的对象里面包含复合条件的选择器；
    参数是一个数组，返回的对象里面包含一个数组；
    参数是一个元素构造器，返回的对象里面有一个元素构造器；
```
$('#test')
$([{},{},{}])
$('<div></div>)
```

###### get(index)
    通过下标来查找对于的元素

```
$('#test').get(1)
```

###### appendTo(node)
     将选择器选中的元素作为node元素的子元素；
```
let a=$('<div>123</div>')
$('#test').appendTo(a)      a作为#test的父元素；
```


###### append(children)
    将children元素作为指定元素的子元素
```
let a=$('<div>123</div>')
$('#test').append(a)      a作为#test的子元素；
```

###### find(selector)
    通过选择器来查找元素
```
$('#test').find('.children')
```

###### each(fn)
    对每一个符合条件的元素进行循环操作
```
$('#test').find('.child').each((item)=>console.log(item))
```

###### parent()
    查找指定元素的父级元素
```
$('#child1').parent()
```

###### children()
    查找指定元素的所有子元素
```
$('#test').children()
```

###### addClass(className)
    给指定元素添加类名
```
$('#test').addClass('red')
```

#### 新功能敬请期待......