class PokemonCardItem{
    imageURL =''
    name = ''
    rarity = ''
    hp = ''
    setName = ''
    averageSellPrice =''

    constructor(imageURL, name, rarity, hp, setName, averageSellPrice) {
        this.imageURL = imageURL
        this.name = name
        this.rarity = rarity
        this.hp = hp
        this.setName = setName
        this.averageSellPrice = averageSellPrice
    }

}

export default PokemonCardItem