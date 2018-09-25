> 本文由我们团队肖建朋总结 <img src="https://badge.juejin.im/entry/5ba9ac6ae51d450e78261fd0/likes.svg?style=flat-square" onclick="window.open('https://badge.juejin.im/entry/5ba9ac6ae51d450e78261fd0/likes.svg?style=flat-square')">

### 定义

组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的孙对象构成的。

### 用途

- 组合模式将对象组成树形结构，可以很方便的描述对象“部分-整体”的层次结构。
- 利用对象多态性统一对待组合对象和单个对象。

下图为组合模式的请求传递示意图：

![](https://i.loli.net/2018/09/25/5ba9901bb4c66.jpg)

### 示例

场景：当我们点击按钮时，出发一系列操作（打开空调，打开电视，打开音响）其中打开电视和打开音响是一组组合对象。

首先我们先创建一个命令操作类MacorCommand,包含一个属性`commandList`和两个方法`add`和`execute`

```javascript
class MacorCommand {
    constructor(){
        this.commandList = []
    }

    add(command) {
        this.commandList.push(command)
    }

    execute() {
        this.commandList.forEach((item) => {
            item.execute()
        })
    }
}
```

调用

```javascript
<script src="./MacorCommand.js"></script>
<script>
        var openAcCommand = {
            execute: function() {
                console.log('打开空调')
            }
        }

        var openTvCommand = {
            execute: function() {
                console.log('打开电视')
            }
        }

        var openSoundCommand = {
            execute: function() {
                console.log('打开音响')
            }
        }
        var macorCommand1 = new MacorCommand()
        macorCommand1.add(openTvCommand)
        macorCommand1.add(openSoundCommand)

        var macorCommand = new MacorCommand()
        macorCommand.add(openAcCommand)
        macorCommand.add(macorCommand1)
        // macorCommand.execute()
        var setCommand = (function( command ){
            document.getElementById( 'button' ).onclick = function(){
                command.execute();
            }
        })( macorCommand );
    </script>
```

组合模式的透明性使得发起请求的客户不用去顾忌组合对象和叶对象的区别，但他们在本质上是有区别的。

比如上面代码中组合对象是有add 方法的，但是叶子对象并没有，如果用户在叶子对象上调用了add方法，那么就会报错，而我们是不希望出现这种情况的。所以我们对上面代码进行如下改造。

```js
var openAcCommand = {
    execute: function() {
    	console.log('打开电视')
    },
    add: function() {
        throw new error('叶子对象不能添加子节点')
    }
}
```

以上代码中在`openAcCommand`中增加了add方法，但是在方法中没有执行什么操作，直接抛出了异常。

### 注意

1. 组合模式不是父子关系，组合模式是一种HAS-A(聚合)的关系，不是IS-A。组合对象包含一组叶对象，但Leaf不是Composite的子类。组合对象把请求委托给它所包含的所有叶对象，他们能够合作的关键是拥有相同的接口。
2. 对叶对象操作的一致性，组合模式除了要求组合对象和叶对象拥有相同的接口外，还有一个必要条件，就是对一组叶对象的操作必须具有一致性。

### 总结

组合模式可以让我们使用树形方式构建对象结构，可以忽略掉组合模式和单个对象之间的差别，从而用一致的方式来处理它们。

**何时使用组合模式**

- 表示对象-整体层次结构
- 客户希望统一对待树中的所有对象。

**缺点**

如果通过组合模式创建了太多的对象，那么这些对象可能会让系统负担不起。