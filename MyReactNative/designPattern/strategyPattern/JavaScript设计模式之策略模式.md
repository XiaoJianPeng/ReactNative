# JavaScript设计模式之策略模式

###  定义

策略模式的定义是：定义一系列的算法，把它们封装起来，并且使它们可以相互替换。

将不变的部分和变化的部分隔开是每个设计模式的主题。策略模式就是将算法的使用和算法的实现分离开。

 **一个基于策略模式的程序至少包含两部分：**

1. 一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
2. 环境类Context，Context接收客户的请求，随后把请求委托给某一个策略类。



### 年终奖计算

使用策略模式来计算员工的年终奖。

很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为S 的人年
终奖有4 倍工资，绩效为A 的人年终奖有3 倍工资，而绩效为B 的人年终奖是2 倍工资。假设财
务部要求我们提供一段代码，来方便他们计算员工的年终奖。

![](https://i.loli.net/2018/08/12/5b6fa6eb092c2.jpg)

#### Calculate类

该类中包含一个年终奖计算方法`strategies` ,需要传入参数绩效等级策略`strategy`和基本工资`salary`,

根据传入不同的绩效等级做不同的处理返回不同的结果。

```
class Calculate {
    constructor() {
    }

    static strategies(strategy, salary) {
        switch(strategy) {
            case 'S':
                return salary * 4
            case 'A':
                return salary * 3
            case 'B':
                return salary * 2
            default:
                break
        }
        return 0
    }
}
```

#### Bonus类

Bonus类中包含属性 绩效等级策略`strategy`和 基本工资`salary`,还包含一个实例方法 取得年终奖`getBonus`。

```
class Bonus {
    constructor(salaey, strategy) {
        this.salaey = salaey
        this.strategy = strategy
    }

    getBonus(salaey, strategy) {
        const result = Calculate.strategies(this.strategy, this.salaey)
        console.log(result)
        return result
    }
}
```

#### 调用

使用下面代码进行调用测试输出：

```
let bonus = new Bonus(3000, 'S')
bonus.getBonus()// 日志中会输出12000
```

### 改进年终奖计算方法

通过以上示例我们已经使用策略模式实现了一个简单的年终奖计算的程序，但是我们会发现如果以后绩效等级出现了SS,C等等等级我们就要不断的修改Calculate类，在strategies方法的switch 循环中增加更多的case。这就违背了程序易维护的原则，那么我们怎么办呢？我们可以有多种解决方案，例如将可动态配置的部分放在配置文件中，或者我们可以放入数据库中，动态的获取最新的绩效等级。

这里我们使用从配置文件中获取绩效等级。这里我们建一个枚举类型 `strategy`

#### 枚举类 Enum.js

这里我们定义一个`strategy`，用来放绩效等级。

```
/**
 * 绩效级别
 */
const strategy = {
    SS: 5,
    S: 4,
    A: 3,
    B: 2
}

export {
    strategy
}
export default {
    strategy
}

```

#### 改造Calculate类

我们将switch替换为` return salary * strategy`,这样依赖Calculate就看起来简单多了。

```
/**
 * 奖金计算类
 */
class Calculate {
    constructor() {
    }

    static strategies(strategy, salary) {
        return salary * strategy
    }
}

export default Calculate

```

#### 调用

此时我们在调用页面首先引入`import {strategy} from '你的路径/Enum' `

调用代码改为：

```
 let bonus = new Bonus(3000, strategy.SS)
 bonus.getBonus() // 日志中会输出15000
```

同样我们可以将工资salary，也维护成一个可配置的对象。

到这里我们已经使用策略模式实现了一个相对来说易维护的年终奖金计算功能。

## 总结

在实际项目中，策略模式对开发的作用远远不止于此，我们会把算法的含义扩散开来，使用策略模式来封装一些业务规则，只要这些业务规则的目标一致，且可被替换使用，那么就可以用策略模式来封装它们。例如可以用来做表单检验、动画等等。