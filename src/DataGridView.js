var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
HTMLElement.prototype.setText = function (text) {
    return this.textContent = text;
};
HTMLElement.prototype.getText = function () {
    return this.textContent;
};
HTMLElement.prototype.setStyle = function (_style) {
    for (var key in _style) {
        this.style[key] = _style[key];
    }
};
HTMLElement.prototype.setStyleFor = function (selector, _style) {
    var all = this.querySelectorAll(selector);
    for (var _i = 0, all_1 = all; _i < all_1.length; _i++) {
        var item = all_1[_i];
        for (var key in _style) {
            item.style[key] = _style[key];
        }
    }
};
HTMLElement.prototype.getStyle = function () {
    return this.style;
};
HTMLElement.prototype.on = function (event, callback) {
    this.addEventListener(event, function (it) {
        it.stopPropagation();
        it.preventDefault();
        callback(it);
    });
};
HTMLElement.prototype.appendItem = function (children) {
    var _this = this;
    if (typeof children == "string" || typeof children == "object") {
        this.appendChild(children);
    }
    else {
        children.forEach(function (child) {
            _this.appendChild(child);
        });
    }
};
var Position;
(function (Position) {
    Position[Position["after"] = 0] = "after";
    Position[Position["before"] = 1] = "before";
})(Position || (Position = {}));
var DOM = /** @class */ (function () {
    function DOM() {
    }
    DOM.createElement = function (tag) {
        return document.createElement(tag);
    };
    DOM.get = function (selector) {
        return document.querySelector(selector);
    };
    DOM.getAll = function (selector) {
        return document.querySelectorAll(selector);
    };
    DOM.setStyle = function (target, style) {
        Object.keys(style).forEach(function (key) {
            target.style[key] = style[key];
        });
    };
    DOM.setPsedoStyle = function (selector, psedo, style) {
        var element = typeof selector == "object"
            ? selector
            : document.querySelector(selector);
        var psedoElement = window.getComputedStyle(element, ":" + psedo);
        this.setStyle(psedoElement, style);
    };
    DOM.setAttr = function (target, attr) {
        Object.keys(attr).forEach(function (key) {
            target.setAttribute(key, attr[key]);
        });
    };
    DOM.render = function (element, parent) {
        var _parent;
        if (typeof parent == "string") {
            _parent = this.get(parent);
        }
        else {
            _parent = parent;
        }
        _parent.appendChild(element);
    };
    DOM.insert = function (element, referenceNode, postion) {
        switch (postion) {
            case Position.after:
                referenceNode.parentNode.insertBefore(element, referenceNode.nextSibling);
                break;
            case Position.before:
                referenceNode.parentNode.insertBefore(element, referenceNode);
                break;
        }
    };
    DOM.rawStyle = function (rawCssText) {
        var s = document.createElement("style"), c = rawCssText;
        return ((s.type = "text/css"),
            s.styleSheet
                ? (s.styleSheet.cssText = c)
                : s.appendChild(document.createTextNode(c)),
            s);
    };
    DOM.renderStyleElement = function (element) {
        document.getElementsByTagName("head")[0].appendChild(element);
    };
    DOM.documentReady = function (callback) {
        document.addEventListener("DOMContentLoaded", callback);
    };
    DOM.createTextNode = function (text) {
        return document.createTextNode(text);
    };
    return DOM;
}());
var TElement = /** @class */ (function () {
    function TElement(tag, child, options) {
        var _this = this;
        this.tag = tag;
        this.element = DOM.createElement(tag);
        if (typeof child == "string" || typeof child == typeof Text) {
            this.element.appendChild(DOM.createTextNode(child));
        }
        else if (Array.isArray(child)) {
            for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
                var item = child_1[_i];
                this.element.appendChild(item);
            }
        }
        else if (child != undefined) {
            this.element.appendChild(child);
        }
        // Options
        if (options) {
            this._options = options;
            if (this._options["style"]) {
                for (var key in this._options.style) {
                    this.element.style[key] = this._options.style[key];
                }
            }
            if (this._options["event"]) {
                this.element.addEventListener(this._options.event.name, function (e) {
                    _this._options.event.callback(e);
                });
            }
            if (this._options["id"]) {
                DOM.setAttr(this.element, {
                    id: this._options.id
                });
            }
            if (this._options["className"]) {
                this.element.classList.add(this._options.className);
            }
        }
        return this.element;
    }
    return TElement;
}());
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(child, options) {
        return _super.call(this, "table", child, options) || this;
    }
    return Table;
}(TElement));
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row(child, options) {
        return _super.call(this, "tr", child, options) || this;
    }
    return Row;
}(TElement));
var HeaderCell = /** @class */ (function (_super) {
    __extends(HeaderCell, _super);
    function HeaderCell(child, options) {
        return _super.call(this, "th", child, options) || this;
    }
    return HeaderCell;
}(TElement));
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(child, options) {
        return _super.call(this, "td", child, options) || this;
    }
    return Cell;
}(TElement));
var TableHeader = /** @class */ (function (_super) {
    __extends(TableHeader, _super);
    function TableHeader(child, options) {
        return _super.call(this, "thead", child, options) || this;
    }
    return TableHeader;
}(TElement));
var TableBody = /** @class */ (function (_super) {
    __extends(TableBody, _super);
    function TableBody(child, options) {
        return _super.call(this, "tbody", child, options) || this;
    }
    return TableBody;
}(TElement));
var DataGridView = /** @class */ (function () {
    function DataGridView(dataSource, target, customHeaderText) {
        this._style = "\n* {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  user-select: none;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  }\n\n  table {\n    border-collapse: collapse;\n    margin: 3px auto;\n    font-size: 0.9em;\n    min-width: 400px;\n    width:100%;\n    border-radius: 1px;\n    overflow: hidden;\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);\n  }\n\n  table thead tr {\n    background-color: #FFDD81;\n    color: #000;\n    // border-bottom: 1px solid #dddddd;\n    text-align: inherit;\n    font-weight: bold;\n  }\n\n\n  table th,\n  table td {\n    padding: 12px 15px;\n    position: relative !important;\n  }\n\n  table tbody tr {\n    background-color: #ffffff;\n    border-bottom: 1px solid #dddddd;\n    cursor: pointer\n  }\n\n  table tbody tr:nth-of-type(even) {\n    background-color: #f3f3f3;\n  }\n\n  table tbody tr:last-of-type {\n    border-bottom: 2px solid #ccc;\n  }\n\n  table tbody tr.active-row {\n    font-weight: bold;\n    color: #009879;\n  }\n\n  .no-alt tbody tr:nth-of-type(even) {\n    background-color: #ffffff !important;\n  }\n\n  .grid-rtl tbody tr td {\n    border:none !important;\n    border-left: 1px solid #ccc !important;\n  }\n  .grid-rtl tbody tr td:last-child {\n    border:none !important;\n    border-right: 1px solid #ccc !important;\n  }\n\n  .grid-ltr tbody tr td {\n    border:none !important;\n    border-right: 1px solid #ccc !important;\n  }\n  .grid-ltr tbody tr td:last-child {\n    border:none !important;\n    border-left: 1px solid #ccc !important;\n  }\n\n  .sorted-table th {\n    cursor: pointer;\n  }\n\n  .sorted-table .th-sort-asc::after {\n    position: absolute !important;\n    content: '\u279C';\n    transform: rotate(-90deg);\n    color:#F7608C\n  }\n\n  .sorted-table .th-sort-desc::after {\n    position: absolute !important;\n    content: '\u279C';\n    transform: rotate(90deg);\n    color:#F7608C\n  }\n\n  .sorted-table .th-sort-asc::after,\n  .sorted-table .th-sort-desc::after {\n      margin-left: 4px;\n      margin-right: 4px;\n  }\n\n  .sorted-table .th-sort-asc,\n  .sorted-table .th-sort-desc {\n      /*background: rgba(0, 0, 0, 0.1);*/\n  }\n";
        this.element = new Table();
        this.dataSource = [];
        this.columnsHeaderTexts = [];
        this.sortIsEabled = false;
        DOM.renderStyleElement(DOM.rawStyle(this._style));
        this.dataSource = dataSource;
        this.GetColumnHeaderText();
        if (customHeaderText) {
            this.setColumnsHeaderText = customHeaderText;
        }
        // fill data grid view
        this.fill();
        // init ui dirction
        this.rightToLeft(false);
        // render dataGridView in ui
        DOM.get(target).appendChild(this.element);
    }
    DataGridView.prototype.fill = function () {
        // fill header
        var header = new TableHeader();
        var headrRow = new Row();
        var cells = [];
        Array.from(this.columnsHeaderTexts).forEach(function (text) {
            cells.push(new HeaderCell(text));
        });
        Array.from(cells).forEach(function (cell) {
            headrRow.appendChild(cell);
        });
        header.appendChild(headrRow);
        this.element.appendChild(header);
        var body = new TableBody();
        Array.from(this.dataSource).forEach(function (item) {
            // # create cells of row
            var _cells = [];
            // # get cells values
            Object.values(item).forEach(function (text) {
                //# create new cell
                var txt = DOM.createTextNode(text);
                var cell = new Cell(txt);
                // # add to cell array
                _cells = __spreadArrays(_cells, [cell]);
            });
            // create new row
            var row = new Row(_cells);
            // insert new row into table
            body.appendChild(row);
            _cells = [];
        });
        this.element.appendChild(body);
    };
    DataGridView.prototype.setStyle = function (style) {
        this.element.setStyle(style);
    };
    DataGridView.prototype.setStyleFor = function (selector, style) {
        var sel = this.element.querySelector(selector);
        for (var key in style) {
            sel.style[key] = style[key];
        }
    };
    DataGridView.prototype.rightToLeft = function (state) {
        this.element.setStyle({
            direction: state ? "rtl" : "ltr",
            textAlign: state ? "right" : "left"
        });
    };
    Object.defineProperty(DataGridView.prototype, "RightToLeft", {
        get: function () {
            return this.getDirction() == "rtl";
        },
        enumerable: false,
        configurable: true
    });
    DataGridView.prototype.useGridLines = function (state) {
        var dirction = this.getDirction();
        if (state) {
            DOM.get("table").classList.remove("grid-" + dirction);
            DOM.get("table").classList.add("grid-" + dirction);
        }
        else {
            DOM.get("table").classList.remove("grid-" + dirction);
        }
    };
    DataGridView.prototype.alternativeRowHighLight = function (state) {
        if (!state) {
            DOM.get("table").classList.remove("no-alt");
            DOM.get("table").classList.add("no-alt");
        }
        else {
            DOM.get("table").classList.remove("no-alt");
        }
    };
    DataGridView.prototype.sort = function (column, asc) {
        if (asc === void 0) { asc = true; }
        var dirModifier = asc ? 1 : -1;
        var table = this.element;
        var tbody = table.tBodies[0];
        var rows = Array.from(tbody.querySelectorAll("tr"));
        var sortedRows = rows.sort(function (a, b) {
            var aColText = a.querySelector("td:nth-child(" + (column + 1) + ")")
                .textContent.trim();
            var bColText = b.querySelector("td:nth-child(" + (column + 1) + ")")
                .textContent.trim();
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        });
        // remove all old rows
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        // re-add new sorted rows
        tbody.append.apply(tbody, sortedRows);
        // remember how the column is currently sorted
        table.querySelectorAll("th").forEach(function (th) {
            return th.classList.remove("th-sort-asc", "th-sort-desc");
        });
        table.querySelector("th:nth-child(" + (column + 1) + ")").classList.toggle("th-sort-asc", asc);
        table.querySelector("th:nth-child(" + (column + 1) + ")").classList.toggle("th-sort-desc", !asc);
    };
    DataGridView.prototype.enableSorting = function () {
        var _this = this;
        var table = this.element;
        function sortingByCell(headerCell) {
            headerCell.stopPropagation();
            var headerIndex = Array.prototype.indexOf.call(headerCell.target.parentElement.children, headerCell.target);
            var currentIsAscending = headerCell.target.classList.contains("th-sort-asc");
            this.sort(headerIndex, !currentIsAscending);
            table.classList.remove("sorted-table");
            table.classList.add("sorted-table");
        }
        table.querySelectorAll("th").forEach(function (headerCell) {
            headerCell.addEventListener("click", sortingByCell.bind(_this));
        });
    };
    DataGridView.prototype.getDirction = function () {
        return window.getComputedStyle(document.querySelector("table")).direction;
    };
    DataGridView.prototype.setTextAlignment = function (alignment) {
        if (typeof alignment != "object") {
            throw new Error("alignment property must be object like\n        {\n            target:'table' | 'row' | 'all' | 'cell' | 'header-cell',\n            textAlign:  'left' | 'right' | 'center' | 'inherit'\n        }");
        }
        DOM.getAll(this.getTarget(alignment.target))
            .forEach(function (e) { return e.style.textAlign = alignment.textAlign; });
    };
    DataGridView.prototype.getTarget = function (target) {
        switch (target) {
            case "table":
                return "table";
            case "cell":
                return "table tbody tr *";
            case "header-cell":
                return "table thead tr *";
            case "row":
                return "table tbody > tr";
            case "all":
                return "table tbody > tr, table thead > tr";
        }
    };
    DataGridView.prototype.setDataSource = function (dataSource) {
        this.dataSource = dataSource;
        this.GetColumnHeaderText();
    };
    DataGridView.prototype.getDataSource = function () {
        return this.dataSource;
    };
    Object.defineProperty(DataGridView.prototype, "setColumnsHeaderText", {
        set: function (headersText) {
            if (this.columnsHeaderTexts.length == headersText.length) {
                this.columnsHeaderTexts = headersText;
            }
            else {
                throw new Error("Header Cells count not match dataSource Header Cells count!");
            }
        },
        enumerable: false,
        configurable: true
    });
    DataGridView.prototype.GetColumnHeaderText = function () {
        if (typeof this.dataSource[0] == "object") {
            this.columnsHeaderTexts = __spreadArrays(Object.keys(this.dataSource[0]));
        }
        else {
            throw new Error("Invalid DataSource, dataSource must be array of objects!"
                .trim());
        }
    };
    // Events
    DataGridView.prototype.on = function (eventName, target, callback) {
        DOM.getAll(this.getTarget(target))
            .forEach(function (e) { return e.on(eventName, callback); });
    };
    return DataGridView;
}());
