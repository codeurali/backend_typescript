abstract class Entity {
    public id: number

    constructor(id: number) {
        this.id = id;
    }
}

class Person extends Entity {
    public firstname: string;
    public lastname: string;

    constructor(id: number, firstname: string, lastname: string) {
        super(id);
        this.firstname = firstname;
        this.lastname = lastname;
    }

}

class Company extends Entity {
    public name: string

    constructor(id: number, name: string) {
        super(id);
        this.name = name;
    }
}


interface IDataProvider {
    // Dans une interface, toutes les méthodes sont publics et abstraites.
    list(): Entity[]; // :tableau de Entity
    search(text: string): Entity[];
}

abstract class BaseProvider implements IDataProvider {
    protected abstract getData(): Entity[];
    
    public list(): Entity[] {return this.getData()} //tableau des entités

    public search(text: string): Entity[] { // text : string
        const listResult: Entity[] = this.getData().filter(e => JSON.stringify(e).toLowerCase().includes(text.toLowerCase()));

        return listResult;
    }
}


class PersonProvider extends BaseProvider {
    protected getData(): Person[] { 
        let p1: Person = new Person(1, 'Sophie', 'Lozophy');
        let p2: Person = new Person(2, 'Annie', 'Versaire');
        let p3: Person = new Person(3, 'Paul', 'Ochon');

        return [p1, p2, p3];
    }
}

class CompanyProvider extends BaseProvider {
    protected getData(): Company[] {
        let c1: Company = new Company(1, 'Google');
        let c2: Company = new Company(2, 'Apple');       
        let c3: Company = new Company(3, 'Microsoft');
       
        return [c1, c2, c3]
    }
}

class RepositoryService {
    private providers: IDataProvider[];

    constructor(providers: IDataProvider[]) {
        this.providers = providers;
    }

    list(): Entity[] {
        let result: Entity[] = [];
        for(const p of this.providers ) {
            result = result.concat(p.list());
        }
        return result;
    }

    search(text: string): Entity[] {
        let result: Entity[] = [];
        for(const e of this.providers ) {
            result = result.concat(e.search(text))
        }
        return result;
    }
}

const jose: PersonProvider = new PersonProvider();
const sophie: CompanyProvider = new CompanyProvider();
const bertrand: RepositoryService = new RepositoryService([jose, sophie]);


console.log(bertrand.list())

const express = require('express');
const cors = require('cors');

let app = express(); //création du serveur 
app.use(cors()); //utilisation du middleware cors : authorise les requetes HTTP provenant d'une autre origine.
app.use(express.json()); //utilisation de json

// GET (recupération de données)
// POST (envoi de données avec une intentiond e création)
// PUT (envoi de données avec une intention de modification totale)
// PATCH (evoi de données avec une intention de modification partielle)
// HEAD (salutation)
// OPTIONS (demande d'authorisation)


// Endpoints
app.get('/', function(req, res) {
    res.send(bertrand.list())
})

app.post('/search', function(req, res) {
    res.send(bertrand.search(req.body.text));
})


// Listener
app.listen(5000, function() {
    console.log("c'est lancé --> url : localhost:5000")
})