var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entity = /** @class */ (function () {
    function Entity() {
    }
    return Entity;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Person;
}(Entity));
var Company = /** @class */ (function (_super) {
    __extends(Company, _super);
    function Company() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Company;
}(Entity));
var BaseProvider = /** @class */ (function () {
    function BaseProvider() {
    }
    BaseProvider.prototype.list = function () { return this.getData(); }; //tableau des entités
    BaseProvider.prototype.search = function (text) {
        var listResult = this.getData().filter(function (e) { return JSON.stringify(e).toLowerCase().includes(text.toLowerCase()); });
        return listResult;
    };
    return BaseProvider;
}());
var PersonProvider = /** @class */ (function (_super) {
    __extends(PersonProvider, _super);
    function PersonProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonProvider.prototype.getData = function () {
        var p1 = new Person();
        p1.id = 1,
            p1.firstname = 'Sophie',
            p1.lastname = 'Lozophy';
        var p2 = new Person();
        p2.id = 2,
            p2.firstname = 'Annie',
            p2.lastname = 'Versaire';
        var p3 = new Person();
        p3.id = 3,
            p3.firstname = 'Paul',
            p3.lastname = 'Ochon';
        return [p1, p2, p3];
    };
    return PersonProvider;
}(BaseProvider));
var CompanyProvider = /** @class */ (function (_super) {
    __extends(CompanyProvider, _super);
    function CompanyProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompanyProvider.prototype.getData = function () {
        var c1 = new Company();
        c1.id = 1,
            c1.name = 'Google';
        var c2 = new Company();
        c2.id = 2,
            c2.name = 'Apple';
        var c3 = new Company();
        c3.id = 3,
            c3.name = 'Microsoft';
        return [c1, c2, c3];
    };
    return CompanyProvider;
}(BaseProvider));
var RepositoryService = /** @class */ (function () {
    function RepositoryService(providers) {
        this.providers = providers;
    }
    RepositoryService.prototype.list = function () {
        var result = [];
        for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
            var p = _a[_i];
            result = result.concat(p.list());
        }
        return result;
    };
    RepositoryService.prototype.search = function (text) {
        var result = [];
        for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
            var e = _a[_i];
            result = result.concat(e.search(text));
        }
        return result;
    };
    return RepositoryService;
}());
var jose = new PersonProvider();
var sophie = new CompanyProvider();
var bertrand = new RepositoryService([jose, sophie]);
console.log(bertrand.list());
var express = require('express');
var cors = require('cors');
var app = express(); //création du serveur 
app.use(cors()); //utilisation du middleware cors : authorise les requetes HTTP provenant d'une autre origine.
app.use(express.json()); //utilisation de json
// GET (recupération de données)
// POST (envoi de données avec une intentiond e création)
// PUT (envoi de données avec une intention de modification totale)
// PATCH (evoi de données avec une intention de modification partielle)
// HEAD (salutation)
// OPTIONS (demande d'authorisation)
// Endpoints
app.get('/', function (req, res) {
    res.send(bertrand.list());
});
app.post('/search', function (req, res) {
    res.send(bertrand.search(req.body.text));
});
// Listener
app.listen(5000, function () {
    console.log("c'est lancé --> url : localhost:5000");
});
