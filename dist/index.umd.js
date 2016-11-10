(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('babel-runtime/regenerator'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/helpers/asyncToGenerator'), require('express'), require('isomorphic-fetch'), require('bluebird')) :
    typeof define === 'function' && define.amd ? define(['babel-runtime/regenerator', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/helpers/asyncToGenerator', 'express', 'isomorphic-fetch', 'bluebird'], factory) :
    (factory(global._regeneratorRuntime,global._toConsumableArray,global._asyncToGenerator,global.express,global.fetch,global.Promise));
}(this, (function (_regeneratorRuntime,_toConsumableArray,_asyncToGenerator,express,fetch,Promise) { 'use strict';

_regeneratorRuntime = 'default' in _regeneratorRuntime ? _regeneratorRuntime['default'] : _regeneratorRuntime;
_toConsumableArray = 'default' in _toConsumableArray ? _toConsumableArray['default'] : _toConsumableArray;
_asyncToGenerator = 'default' in _asyncToGenerator ? _asyncToGenerator['default'] : _asyncToGenerator;
express = 'default' in express ? express['default'] : express;
fetch = 'default' in fetch ? fetch['default'] : fetch;
Promise = 'default' in Promise ? Promise['default'] : Promise;

function canonize(url) {
    var re = new RegExp('(https?:)?(\/\/)?((rambler)[^\/]*\/)?([a-z]*)');
    var username = url.match(re);
    return '@' + username[5];
}

var _this = undefined;

var getPokemons = function () {
    var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(url) {
        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var response, page, pokemons, pokemons2;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return fetch(url);

                    case 2:
                        response = _context.sent;
                        _context.next = 5;
                        return response.json();

                    case 5:
                        page = _context.sent;
                        pokemons = page.results;

                        if (!(__DEV__ && i > 1)) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt('return', pokemons);

                    case 9:
                        if (!page.next) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 12;
                        return getPokemons(page.next, i + 1);

                    case 12:
                        pokemons2 = _context.sent;
                        return _context.abrupt('return', [].concat(_toConsumableArray(pokemons), _toConsumableArray(pokemons2)));

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getPokemons(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getPokemonsWeight = function () {
    var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee2(id) {
        var response, pokemon;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return fetch(baseUrl + '/pokemon/' + id);

                    case 2:
                        response = _context2.sent;
                        _context2.next = 5;
                        return response.json();

                    case 5:
                        pokemon = _context2.sent;

                        console.log(pokemon);

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getPokemonsWeight(_x4) {
        return _ref2.apply(this, arguments);
    };
}();

//routes

var __DEV__ = true;
var app = express();
var baseUrl = 'https://pokeapi.co/api/v2';
var pokemonField = ['id', 'name'];

app.get('/canonize', function (req, res) {
    var username = canonize(req.query.url);
    res.json({
        url: req.query.url,
        user: username
    });
});

app.get('/', function () {
    var _ref3 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee3(req, res) {
        var pokemonsUrl, pokemonsInfo, pokemonsPromises, pokemonsFull, pokemons, sortPokemons;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        pokemonsUrl = baseUrl + '/pokemon';
                        _context3.next = 4;
                        return getPokemons(pokemonsUrl);

                    case 4:
                        pokemonsInfo = _context3.sent;
                        pokemonsPromises = pokemonsInfo.slice(0, 2).map(function (info) {
                            return getPokemon(info.url);
                        });
                        _context3.next = 8;
                        return Promise.all(pokemonsPromises);

                    case 8:
                        pokemonsFull = _context3.sent;
                        pokemons = pokemonsFull.map(function (pokemon) {
                            return _.pic(pokemon, pokemonField);
                        });
                        sortPokemons = _.sortBy(pokemons, function (pokemon) {
                            return pokemon.weight;
                        });
                        return _context3.abrupt('return', res.json(sortPokemons));

                    case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3['catch'](0);

                        console.log(_context3.t0);

                    case 17:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this, [[0, 14]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});

//const array = [
//    'https://rambler.ru/vyvotrin'
//];
//array.slice(0,2).forEach((url) => {
//  const username = canonize(url);
//  console.log(username);
//});

})));
//# sourceMappingURL=index.umd.js.map
