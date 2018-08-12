/**
 * 奖金计算类
 */
class Calculate {
    constructor() {
    }

    static strategies(strategy, salary) {
        // switch(strategy) {
        //     case 'S':
        //         return salary * 4
        //     case 'A':
        //         return salary * 3
        //     case 'B':
        //         return salary * 2
        //     default:
        //         break
        // }
        return salary * strategy
    }
}

export default Calculate
