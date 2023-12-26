"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
var items = [];
app.get('/items', function (req, res) {
    res.json(items);
});
app.post('/items', function (req, res) {
    var item = req.body;
    items.push(item);
    res.status(201).json(item);
});
app.put('/items/:id', function (req, res) {
    var itemId = parseInt(req.params.id);
    var itemIndex = items.findIndex(function (item) { return item.id === itemId; });
    if (itemIndex > -1) {
        items[itemIndex] = __assign(__assign({}, items[itemIndex]), req.body);
        res.json(items[itemIndex]);
    }
    else {
        res.status(404).send('Item not found');
    }
});
app.delete('/items/:id', function (req, res) {
    var itemId = parseInt(req.params.id);
    items = items.filter(function (item) { return item.id !== itemId; });
    res.status(200).send('Item deleted');
});
var PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
