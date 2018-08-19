# JavaScript设计模式之代理模式

## 定义

代理模式是为一个对象提供一个替身对象或占位符，用来控制对它的访问。

现实社会中有很多代理模式，如明星和经纪人、生产厂家和经销商、房东和房产中介等。

**代理模式的关键**是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际访问的是替身对象。替身对象对请求做出一些处理后，再把请求转给本体对象。如图所示：

![](https://i.loli.net/2018/08/19/5b79573268b98.bmp)

## 虚拟代理

虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建。如**图片预加载**

### 图片预加载

​       在web开发中，图片预加载是一种常用的技术。如果给某个 img 标签直接设置自src属性。当网络不佳或图片尺寸太大时，图片的位置往往会有一段时间是空白的，这样用户体验不好。常见做法就是在图片加载好之前用一张loading图片占位，然后用异步请求加载图片，等加载好了，再把它填充到img节点里。这个场景就很适合使用虚拟代理。

#### 不适用代理模式

我们先不适用代理模式，直接来加载一张网络图片看一下效果，网速快的小伙伴，可以把网速限制下。

创建一个html文件把下面代码粘贴到html文件中。

```
<!DOCTYPE html>
<html>
<body>
    <h1>图片预加载</h1>
    <script>
        var myImage = (() => {
            var imgNode = document.createElement('img')
            document.body.appendChild(imgNode)
            return {
                setSrc: (src) => {
                    imgNode.src = src
                }
            }
        })();
        myImage.setSrc('http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg')
    </script>
</body>
</html>
```

用浏览器打开html文件时，能明显看到图片的加载过程。

#### 使用代理模式

下面我们使用代理模式来改造以上代码，`myImage `对象代码不变，增加代理对象`proxyImg`。

```
var proxyImg = (() =>{
    var img = new Image
    img.onload = () => {
        myImage.setSrc(img.src)
    }
    return {
        setSrc: (src) => {
            myImage.setSrc('file:///C:/Users/Admin/Pictures/loading.gif')
            img.src = src
        }
    }
})()
proxyImg.setSrc('http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg')
```

现在我们通过`proxyImg`间接的访问`myImage`, proxyImage 控制了客户对MyImage 的访问，并且在调用代理对象的`setSrc`方法时我们先给`myImage`的src设置一个本地路径的loading图片，再给它设置网络路径的图片。这样在网络图片加载完成前，用户就会看到一个loading动画，而不是一个空白的页面。

## 代理的意义

对于这样一个例子或许会有人觉得不使用代理模式也可以实现。那么代理的好处在哪里呢？

> 首先面向对象的原则——单一职责原则：就一个类（也包含函数和对象）而言，应该仅有一个引起它变化的原因。如果一个对象承担过多的职责，则这个对象会非常巨大，引起它变化的原因就会有多个。面向对象设计鼓励将行为分布到细粒度的对象之中，如果一个对象承担的职责过多，等于把这些职责耦合到了一起，这种耦合会导致脆弱和低内聚的设计。当变化发生时，设计可能会遭到意外的破坏。
>
> ​      职责被定义为“引起变化的原因”，另外在面向对象的程序设计中，大多数情况下，若违反其他任何原则，同时将违反开放-封闭原则。
>
> (摘自《JavaScript设计模式》)

#### 代理和接口的一致性

​        如果有一天我们网速很快不需要预加载loading图片了，那么我们就可以直接请求本体。因为代理和本体都提供了`setSrc`方法，这样对于用户来说只需关心是否能得到想要得结果，而且在任何地方都可以在代理和本体之间切换。

## 缓存代理

​         缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数和之前一致，则可以直接返回前面存储的运算结果。

### 计算乘积

`mult` 乘积运算方法，`createProxyFactory`缓存代理工厂方法，通过传入高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理。例如在下面代码中可以增加加法、减法计算函数，然后通过向`createProxyFactory`传入不同的函数来实现加、减计算。

```
var mult = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i]
    }
    return a
}
var createProxyFactory = function(fn) {
    var cache = {}
    return function(numbers) {
        var args = numbers.join( ',')
        if(args in cache) {
            console.log('2', cache) // 输出缓存，查看代码执行顺序
            return cache[args]
        }
        console.log('1', cache) // 输出缓存，查看代码执行顺序
        return cache[args] = fn.apply(this, numbers)
    }
}
var proxyMult = createProxyFactory(mult)
console.log(proxyMult([1,2,3,4]))
console.log(proxyMult([1,2,3,4]))
```

​        缓存代理在实际中有很多应用，例如项目中的分页需求，同一页数据理论上只需从后台获取一次，然后缓存起来，下次再请求同一页数据时，直接使用缓存中的数据。

## 其它代理模式

代理模式还拥有其它的一些变体种类，如：

1. 防火墙代理：控制网络资源的访问，保护主机不让非法入侵。
2. 远程代理：为一个对象在不同的地址空间提供局部代表。
3. 保护代理： 用于不同对象拥有不同的访问权限。
4. 智能引用代理：取代了简单的指针，它在访问对象时执行一些附加操作，比如计算一个
   对象被引用的次数。
5. 写时复制代理：通常用于复制一个庞大对象的情况。写时复制代理延迟了复制的过程，
   ，DLL当对象被真正修改时，才对它进行复制操作。写时复制代理是虚拟代理的一种变体，
   （操作系统中的动态链接库）是其典型运用场景。

## 总结

​	代理模式包括许多小分类，在JavaScript 开发中最常用的是虚拟代理和缓存代理。本文只是对代理模式初步的学习和认识，具体对代理模式的使用还要结合实际项目中的业务需求，根据不同的场景使用最优的设计模式，才是我们学习设计模式的最终目的。