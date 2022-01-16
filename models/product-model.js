class Collection {
    #Model
    #currentId
    #items
    constructor(model, startingData) {
        this.#Model = model;
        this.#currentId = 0;
        this.#items = this.#populateItems( startingData );
    }

    /**
     * @description It will take an array as a argument 
     * @returns on Object that contains the { id as a key } and { te item as the value } 
     */

    #populateItems( startingData ) {
        return startingData.reduce(( acc, item, idx ) => {
            this.#currentId = idx;
            acc[this.#currentId] = new this.#Model(item, idx)
            return acc;
        }, {});
    }

    #generateId(){
        return ++this.#currentId
    }

    /**
     * @description Will return an array with all items availible in this.items
     * @returns array
     */

    find() {
        return Object.values(this.#items);
    }

    /**
     * @description Will return item match with the itemId
     * @param { string } itemId
     * @param { function } callBack Will return error or item
     * @returns function;
     */

    findById( itemId, callBack ) {
        if (!itemId) return console.log("missing id in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
    }

    create( data, callBack ) {
        if (!data) return console.log("missing data in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error, newItem;
    
        const isEmpty = Object.keys(data).every(field => data[field] === "");
    
        if (isEmpty) {
            error = { message: `you have empty fields` };
        } else {
            
            newItem = new this.#Model( data, this.#generateId());
    
            this.#items[newItem.id] = newItem;
        }
    
        return callBack(error, newItem);
    }
    
    findByIdAndDelete( itemId, callBack ) {
        let error = null;
        const item = this.#items[itemId]
        const isDeleted = delete this.#items[itemId];
    
        if ( !isDeleted ) {
          error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
     }
     findByIdAndUpdate( itemId, data, callBack ) {
        let error = null;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item can't be found` };
        } else {
            this.#items[itemId] = {
                ...item,
                ...data
            }
        }
    
        return callBack(error, this.#items[itemId]);
    }
};

class Product {
    constructor( data, id ) {
        this.id = id;
        this.name = data.name;
        this.color = data.color;
        this.price = data.price;
        this.image = data.image;
    }
}

// at the bottom 
module.exports = new Collection(Product, [
    {
        name: 'Moroccan pouf',
        color: 'Teal',
        price:100,
        image:"https://i.imgur.com/6nK0Xjz.jpg",
        description:'An extremely functional item, the pouf may be used as a footstool an ottoman/seat or even a side table or they can be integrated to any space that needs a modern twist with a timeless piece of handmade art.',
    },
    {
        name: 'Moroccan pouf',
        color: 'white',
        price: 150,
        image:"https://i.imgur.com/A06gqA2.jpg",
        description:'An extremely functional item, the pouf may be used as a footstool an ottoman/seat or even a side table or they can be integrated to any space that needs a modern twist with a timeless piece of handmade art.',
    },
    {
        name: 'Moroccan pouf',
        color: 'black',
        price: 175,
        image: "https://i.imgur.com/ZxFNQ5y.jpg",
        description:'An extremely functional item, the pouf may be used as a footstool an ottoman/seat or even a side table or they can be integrated to any space that needs a modern twist with a timeless piece of handmade art.',
    },
]);