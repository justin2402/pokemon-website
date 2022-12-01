
function Deck() {
    let arr = [];

    arr.addCard = function (x) {
        this.push(x)

        return this;
    }

    arr.removeCard = function (x){
        let loc = arr.indexOf(x)

        if (loc !== -1){
            this.slice(loc,1)
        }

        return arr;
    }

    arr.removeAllCards = function () {
        this.slice(0)

        return this;
    }

    return arr;
}

export {Deck}