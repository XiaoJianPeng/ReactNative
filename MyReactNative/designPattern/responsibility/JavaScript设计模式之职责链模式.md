> 本文由我们团队肖建朋总结 <img src="https://badge.juejin.im/entry/5bd5ca2e51882509b768da8a/likes.svg?style=flat-square" onclick="window.open('https://badge.juejin.im/entry/5bd5ca2e51882509b768da8a/likes.svg?style=flat-square')">

# JavaScript设计模式之职责链模式

顾名思义，职责链模式就是为请求创建了一个接收者对象的链，沿着这条链传递请求，使对个对象都有机会接收请求，直到有一个对象处理它为止。

对于职责链模式来说客户只需要将请求发送到职责链上即可，无需关心请求的处理细节和请求的传递，所以职责链模式将请求的发送者和处理者解耦了。

![](https://i.loli.net/2018/10/28/5bd5b48157043.png)

### 示例

对于一个网上商城，会员有A,B,C三个等级，A等级会员购物打8折，B等级会员购物打9折，C等级会员购物打95折

根据职责链模式的原则，当第一个接收者对象无法处理请求时，则把请求交给下一个接收者对象，我们来实现上面需求。

`Responsibility.js`处理各个等级会员的优惠：

```javascript
const shoppingA = (grade ) => {
    if(grade === 'A') {
        console.log(`你的等级是${grade},你享受八折优惠`)
    } else {
        shoppingB(grade)
    }
}

const shoppingB = (grade) => {
    if(grade === 'B') {
        console.log(`你的等级是${grade},你享受九折优惠`)
    } else {
        shoppingC(grade)
    }
}

const shoppingC = (grade) => {
    if(grade === 'C') {
        console.log(`你的等级是${grade},你享受九五折优惠`)
    } else {
        console.log(`你还不是会员，无法享受优惠`)
    }
}

module.exports = shoppingA
```

在test.js中调用

```javascript
const shopping = require('./Responsibility')
shopping('A')
shopping('B')
shoping('C')
shopping('')

```

在前目录下执行`node test.js`，在控制台会中依次输入下面内容：

```tex
你的等级是A,你享受八折优惠
你的等级是B,你享受九折优惠
你的等级是C,你享受九五折优惠
你还不是会员，无法享受优惠
```

这里使用了3个互不影响的小函数，但是可以看到请求的在接收对象链中传递是固定 shoppingA中调用shoppingB，shoppingB中调用shoppingC,请求的传递被耦合在了业务函数中，这就违反了**开放-封闭原则**,，如果后期我们增加了S、D等级的会员，就必须修改这个`Responsibility.js`的代码。也就是说要打散了原来的职责链，重新构造一条新的职责链。

改造为如下，每个业务函数中如果无法处理请求就返回`return 'nextSuccessor`, 这里构建了一个class `Chain`,

初始化时fn就是对于的接收者对象， 当A接收A无法处理请求时，会把请求传递给他的`successor`(继承者)，直到能够处理处理。

```javascript
const shoppingA = (grade ) => {
    if(grade === 'A') {
        console.log(`你的等级是${grade},你享受八折优惠`)
    } else {
        return 'nextSuccessor'
    }
}

const shoppingB = (grade) => {
    if(grade === 'B') {
        console.log(`你的等级是${grade},你享受九折优惠`)
    } else {
        return 'nextSuccessor'
    }
}

const shoppingC = (grade) => {
    if(grade === 'C') {
        console.log(`你的等级是${grade},你享受九五折优惠`)
    } else {
        return 'nextSuccessor'
    }
}

class Chain {
    constructor(fn){
        this.fn = fn
        this.successor = null
    }

    setNextSuccessor(successor) {
        return this.successor = successor
    }

    passRequest(grade) {
        var ret = this.fn(grade)
        if(ret === 'nextSuccessor') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments)
        }
        return ret
    }
}

module.exports = {
    shoppingA,
    shoppingB,
    shoppingC,
    Chain,
}
```

调用如下：

```javascript
const {Chain, shoppingA, shoppingB, shoppingC} = require('./Responsibility')

const chainA = new Chain(shoppingA)
const chainB = new Chain(shoppingB)
const chainC = new Chain(shoppingC)
chainA.setNextSuccessor(chainB)
chainB.setNextSuccessor(chainC)

chainA.passRequest('A')
chainA.passRequest('B')
chainA.passRequest('C')
```

经过以上的改进，我们就能够灵活的增加、删除和修改职责链中的节点。

### 职责链模式的优缺点

### 优点

1. 解耦了请求发送者和多个接收者之间的复杂关系。请求发送者不需要关心哪个接收者能够处理请求。
2. 职责链模式中的各个节点可以灵活拆分重组。
3. 职责链模式的起始节点可以自己来指定。还可以指定一个链尾接收者来处理即将离开的请求。

### 缺点

在开发过程中我们要避免职责链过长带来的性能损耗。

### 总结

职责链模式还有一些其他的用法，例如可以使用AOP（面向切面编程）改造上面的例子。在作用域、原型链、DOM节点中的事件冒泡，都可以找到职责链模式的影子。更多的用法需要我们在实际开发过程中自己慢慢发现。

**只要运用得当。职责链模式可以很好地帮助我们管理代码，降低发起请求的对象和处理请求的对象之间的耦合性。职**
**责链中的节点数量和顺序是可以自由变化的，我们可以在运行时决定链中包含哪些节点。**