import Calculate from './Calculate'

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

export default Bonus
