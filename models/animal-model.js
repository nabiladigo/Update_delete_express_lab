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

class Animal {
    constructor( data, id ) {
        this.id = id;
        this.name = data.name;
        this.image = data.image;
        this.category = data.category;
        this.description= data.description;
    }
}


module.exports = new Collection(Animal, [
    {
        name: 'Jamaican Fruit-Eating Bat',
        description:`Jamaican fruit-eating bats are a species of leaf-nosed bat characterized by a leaflike protrusion on their snout. The purpose of the nose leaf is unknown, but it’s thought to play a role in echolocation. Although Jamaican fruit-eating bats are capable of using echolocation, they instead rely on their senses of vision and smell to find food. The hair of the Jamaican fruit-eating bat is brown or black and paler on the underparts. Pale white markings are present above and below the eyes. Jamaican fruit-eating bats have a 16-inch (41-centimeter) wingspan.`,
        image:"https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_jamaican-fruit-eating-bat_600x300.ashx",
        category:`BATS are nocturnal, flying mammals that eat fruits and insects.`,
    },
    {
        name: 'American Beaver',
        description:`The American beaver's most noticeable characteristic is the long, flat, black tail. A beaver’s tail not only helps it swim faster, but can also be used to make a loud alarm call when slapped against water. In addition, the large tail helps the beaver balance when carrying a heavy log or tree trunk.`,        
        image:"https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_rodent_beaver-colorado-kelly-lyon_600x300.ashx", 
        category:`RODENTS are gnawing mammals with a single pair of incisors`      
    },
    {
        name: 'Wolverine',
        description:`Wolverines have a wide variety of nicknames. They are known throughout the contiguous United States as the glutton, woods devil, Indian devil, and ommeethatsees (a Cree Indian word), carcajou, quickhatch, nasty cat, and skunk bear. It is the largest land-living species in the weasel family, or mustelids. The wolverine usually weighs between 17 and 40 pounds, stands up to 1.5 feet tall, and is generally 33 to 44 inches long (including tail). The male is larger than females.`,
        image: 'https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_wolverine_600x300.ashx',
        category:`CARNIVORES are meat-eating mammals, such as bears, felines, and canines` 
    },
    {
        name: 'Nine-Banded Armadillo',
        description:`Approximately 20 species of armadillo exist, but the nine-banded is the only one found in the United States. The term “armadillo” means “little armored one” in Spanish, and refers to the presence of bony, armor-like plates covering their body. Despite their name, nine-banded armadillos can have 7 to 11 bands on their armor. A common misconception is that nine-banded armadillos can roll up into spherical balls. In reality, only two species of armadillo (both three-banded) are able to roll up completely. Nine-banded armadillos are about 2.5 feet (0.7 meters) long from the nose to the tip of the tail and weigh an average of 12 pounds (5 kilograms)`,        
        image:'https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_nine-banded-armadillo_600x300.ashx',
        category:`MOLESand ARMADILLOS are burrowing mammals`
    },{
        name: 'Amirecan Bison',
        description:`This animal's true name is the American bison, but most people call them buffalo. Bison are the largest terrestrial animal in North America. They can stand up to six feet (1.8 meters) tall. A male can weigh upwards of a ton (900 kilograms), and a female can weigh about 900 pounds (400 kilograms)`,
        image:'https://www.nwf.org/-/media/NEW-WEBSITE/Shared-Folder/Wildlife/Mammals/mammal_bison-california_john-hobbs_600x300.ashx',
        category:`UNGULATES are hooved mammals with four legs.`
    }
]);