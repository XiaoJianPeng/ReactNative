// const shoppingA = (grade ) => {
//     if(grade === 'A') {
//         console.log(`你的等级是${grade},你享受八折优惠`)
//     } else {
//         shoppingB(grade)
//     }
// }

// const shoppingB = (grade) => {
//     if(grade === 'B') {
//         console.log(`你的等级是${grade},你享受九折优惠`)
//     } else {
//         shoppingC(grade)
//     }
// }

// const shoppingC = (grade) => {
//     if(grade === 'C') {
//         console.log(`你的等级是${grade},你享受九五折优惠`)
//     } else {
//         console.log(`你还不是会员，无法享受优惠`)
//     }
// }
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
            return this.successor && this.successor.passRequest(grade)
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