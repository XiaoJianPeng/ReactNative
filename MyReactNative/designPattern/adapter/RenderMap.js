class RenderMap {
    constructor(map) {
        this.value = map
    }

    renderMap () {
        console.log(this.value)
        if (typeof (this.value.show) === 'function') {
            this.value.show();
        }
    }
}