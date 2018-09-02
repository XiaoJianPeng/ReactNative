# JavaScript设计模式之发布订阅模式

### 定义	

​	发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。	在JavaScript开发中，我们一般用事件模型来替代传统的发布—订阅模式。

借用一下Java中的观察者模式类图，如图：

![](https://i.loli.net/2018/09/02/5b8bea4d633bf.jpg)

	观察者模式使用三个类 Subject、Observer 和 Client。Subject 对象带有绑定观察者到 Client 对象和从 Client 对象解绑观察者的方法。我们创建 *Subject* 类、*Observer* 抽象类和扩展了抽象类 *Observer* 的实体类。

*ObserverPatternDemo*，我们的演示类使用 *Subject* 和实体类对象来演示观察者模式。

### 现实中的应用

	发布订阅的概念我们知道了，那么在现实中有哪些类似场景呢？

	例如：售楼处和购买者，当购房者的在售楼处留下电话后，当售楼处有新的房源推出时，就会给所有的留过电话的购房者发送短信；银行和客户，当你在银行办理了余额变动通知服务后，每当你的银行卡余额发生变化，银行就会发短信给你。

	现实生活中发布订阅模式又很多的应用，那么我们如何将这种模式在JavaScript中使用呢？

### DOM事件

首先我们建立一个简单的html文件, 如下：

```
<!DOCTYPE html>
<html>
<body>
    <h1>发布订阅</h1>
</body>
</html>
```

此时用浏览器打开html文件我们只能看到页面只有“发布订阅”几个字，接下来我们在加入以下代码：

```
<script>
    document.body.addEventListener( 'click', function(){
        alert(2);
    }, false );
</script>
```

保存后刷新浏览器,点击页面，此时会弹窗显示“2”。因为我们订阅了`document.body`上的`click`事件,当body被点击时，body节点便会向订阅者发布这个消息。我们也可以随意增加或删除订阅者，增加任何订阅者都不会影响发布者代码的编写。

### 银行余额变动提醒

​	前面我们讲了如何订阅document.body上的事件，那么接下来我们看看如何实现自定义的发布订阅，这里我们以银行的余额变动提醒为例子。

我们先简单分析下这个需求：

1. 首先确定这里的发布者是银行，订阅者是主动开启余额变动提醒的用户。
2. 然后要给发布者一个缓存列表，用于存放开启余额变动提醒服务的用户。
3. 当某用户余额变动时，在缓存列表中能找到该用户，我们就通知该用户（发短信）。
4. 约定银行给用户发送短信的信息，这里包含用户账户本次发生变化的金额，变化后用户账户的余额。

![](https://i.loli.net/2018/09/02/5b8c011dd9429.png)

按照需求首先我们建立银行对象`bank` ，以及它所拥有的函数`addListen`（增加开通余额变动服务的用户）和`sendMsg`发送余额提醒。

```
let bank = {
        userList: []
}
bank.addListen = function(user) {
    this.userList.push(user)
}
bank.sendMsg = function(userId, balanceChange) {
    const user = this.userList.find(item => item.userId === userId)
    if(user) {
        user.balance += balanceChange
        console.log('尊敬的用户'+user.name+'，你的账号余额发生'+ balanceChange+'元变化，目前可用余额为：'+user.balance)
    }
}
```

依次增加用户 小明 和 小红 以及触发他们各自账户的事件`sendXiaoming`和`sendXiaohong`

```
bank.addListen({
    userId: 1,
    name: '小明',
    balance: 1000
})
bank.addListen({
    userId: 2,
    name: '小红',
    balance: 2000
})
sendXiaoming = function() {
    console.log(document.getElementById('xiaoming').value)
    bank.sendMsg(1, parseInt(document.getElementById('xiaoming').value))
}
sendXiaohong = function() {
    console.log(document.getElementById('xiaohong').value)
    bank.sendMsg(2, parseInt(document.getElementById('xiaohong').value))
}
```

我们在页面中增加以下控件

```
<div>
    小明账户变化金额<input id="xiaoming" type="text" value="0">
    <button type="submit" onclick="sendXiaoming()">确定</button>
    <br>
    小红账户变化金额<input id="xiaohong" type="text" value="0">
    <button type="submit" onclick="sendXiaohong()">确定</button>
</div>
```

依次输入不同的金额，运行效果如下：

![](https://i.loli.net/2018/09/02/5b8bf8d48b986.png)

#### 用ES6语法实现

```
class Bank {
    constructor() {
        this.userList = []
    }
    
    addListen(user) {
        this.userList.push(user)
    }

    sendMsg(userId, balanceChange) {
        const user = this.userList.find(item => item.userId === userId)
        if(user) {
            user.balance += balanceChange
            console.log('尊敬的用户'+user.name+'，你的账号余额发生'+ balanceChange+'元变化，目前可用余额为：'+user.balance)
        }
    }
}

class User {
    constructor(userId,name, balance) {
        this.userId = userId
        this.name = name
        this.balance = balance
    }
}

const bank = new Bank()
bank.addListen(new User(1, '小明', 1000))
bank.addListen(new User(2, '小红', 2000))

bank.sendMsg(userId, balance)
```

​	这个例子只是为了简单说明发布-订阅模式的工作原理，现实生活中的余额提醒远远不是这里几个函数几行代码可以实现的，例如如何取消订阅、当小明给小红转账就需要分别向小明和小红发送提醒等等，有兴趣的同学可以发挥你们的想象来扩展这些。

​	现实中也存在需要批量发送消息的场景，例如前面提到的售楼处与购房者的情况，此时只需循环给所有订阅售房信息的客户发送消息即可。

### 总结

​	发布-订阅模式，就是抽象出发布对象和订阅对象，各自之间相互独立互不影响，优点非常明显就是为时间上的解耦和对象之间的解耦。它的应用非常广泛例如在异步编程、帮助我们完成更松耦合的代码编写等等。

​	当然发布-订阅模式也是缺点的，因为创建订阅对象本身是要消耗一定空间和时间的，而且当你订阅一个消息后，就算此消息一直没有发生，但这个订阅对象是始终存在于内存中的。另外因发布-订阅模式弱化对象之间关系的原因，如果过度使用的话对象之间的联系就不易发现，会导致程序的难易追踪和维护。

​	**不论什么设计模式都有它存在的原因，我们要做的就是在不同的场景中使用不同的设计模式，而不是为了模式而设计模式。**