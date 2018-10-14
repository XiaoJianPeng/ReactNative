class Model {
    constructor(sex, clothes) {
        this.sex = sex
        this.clothes = clothes
    }

    takePhoto() {
        console.log( 'sex= ' + this.sex + ' clothes=' + this.clothes);
    }
}