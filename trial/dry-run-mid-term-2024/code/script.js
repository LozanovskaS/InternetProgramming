var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var data = [];
var currentSort = "id";
var displayAuthors = function (authors) {
    var container = document.getElementById("author-container");
    container.innerHTML = "";
    for (var _i = 0, authors_1 = authors; _i < authors_1.length; _i++) {
        var author = authors_1[_i];
        displayAuthor(author);
    }
};
var displayAuthor = function (author) {
    var container = document.getElementById("author-container");
    var row = document.createElement("div");
    row.classList.add("author-row");
    row.appendChild(makeAuthorDataDiv(author.id.toString()));
    row.appendChild(makeAuthorDataDiv(author.name));
    var bdate = getBirthDate(author.birth_date);
    row.appendChild(makeAuthorDataDiv(bdate));
    var isAlive = getIsAlive(author);
    var isAliveDiv = document.createElement("div");
    isAliveDiv.classList.add("author-data");
    var chkIsAlive = document.createElement("input");
    chkIsAlive.type = "checkbox";
    chkIsAlive.disabled = true;
    chkIsAlive.checked = isAlive;
    isAliveDiv.appendChild(chkIsAlive);
    row.appendChild(isAliveDiv);
    var age = getAge(author);
    row.appendChild(makeAuthorDataDiv(age.toString()));
    row.appendChild(makeAuthorDataDiv(author.nationality));
    row.appendChild(makeAuthorDataDiv(author.bibliography.length.toString()));
    var yearsActive = getActiveYears(author);
    row.appendChild(makeAuthorDataDiv(yearsActive));
    container === null || container === void 0 ? void 0 : container.appendChild(row);
};
var getAge = function (author) {
    var birthYear = new Date(author.birth_date).getFullYear();
    if (author.death_date) {
        var deathYear = new Date(author.death_date).getFullYear();
        var age = deathYear - birthYear;
        console.log("Author: ".concat(author.name, ", Age at death: ").concat(age));
        return age;
    }
    else {
        var currentYear = new Date().getFullYear();
        var age = currentYear - birthYear;
        console.log("Author: ".concat(author.name, ", Current Age: ").concat(age));
        return age;
    }
};
var getActiveYears = function (author) {
    var publicationYears = author.bibliography.map(function (book) { return book.year; });
    var startYear = Math.min.apply(Math, publicationYears);
    var endYear = Math.max.apply(Math, publicationYears);
    var currentYear = new Date().getFullYear();
    var isAlive = getIsAlive(author);
    if (author.death_date) {
        endYear = new Date(author.death_date).getFullYear();
    }
    else if (endYear === currentYear || endYear === currentYear - 1 || endYear === currentYear - 2) {
        endYear = 'present';
    }
    return "".concat(startYear, " - ").concat(endYear);
};
var getBirthDate = function (birthDateString) {
    var birthDate = new Date(birthDateString);
    console.log(birthDate);
    var year = birthDate.getFullYear();
    var month = birthDate.getMonth() + 1;
    var day = birthDate.getDate();
    var result = "".concat(year, "-").concat(month.toString().padStart(2, "0"), "-").concat(day.toString().padStart(2, "0"));
    console.log(result);
    return result;
};
var getIsAlive = function (author) {
    return author.death_date === undefined;
};
var makeAuthorDataDiv = function (data) {
    var div = document.createElement("div");
    div.classList.add("author-data");
    div.textContent = data;
    return div;
};
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var localData, nationalities, idSort, nameSort, bibliographySort, yearsActiveSort, searchButton, yearActiveSearch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadData()];
            case 1:
                localData = _a.sent();
                data.push.apply(data, localData);
                displayAuthors(data);
                nationalities = extractNationalities(data);
                displayNationalities(nationalities);
                idSort = document.getElementById("sort-id");
                idSort.style.cursor = "pointer";
                idSort === null || idSort === void 0 ? void 0 : idSort.addEventListener("click", sortById);
                nameSort = document.getElementById("sort-name");
                nameSort.style.cursor = "pointer";
                nameSort === null || nameSort === void 0 ? void 0 : nameSort.addEventListener("click", sortByName);
                bibliographySort = document.getElementById("sort-bibliography");
                bibliographySort.style.cursor = "pointer";
                bibliographySort === null || bibliographySort === void 0 ? void 0 : bibliographySort.addEventListener("click", sortByBibliography);
                yearsActiveSort = document.getElementById("sort-yearsActive");
                yearsActiveSort.style.cursor = "pointer";
                yearsActiveSort === null || yearsActiveSort === void 0 ? void 0 : yearsActiveSort.addEventListener("click", sortByYearsActive);
                searchButton = document.getElementById("search-authors");
                searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", searchAuthors);
                yearActiveSearch = document.getElementById("year-active-search");
                yearActiveSearch === null || yearActiveSearch === void 0 ? void 0 : yearActiveSearch.addEventListener("input", searchAuthors);
                return [2 /*return*/];
        }
    });
}); });
var extractNationalities = function (authors) {
    var allNationalities = authors.map(function (author) { return author.nationality; });
    var unique = __spreadArray([], new Set(allNationalities), true);
    unique.sort(function (f, s) { return f.localeCompare(s); });
    return unique;
};
var displayNationalities = function (nationalities) {
    var select = document.getElementById("nationality-search");
    select.innerHTML = "";
    var none = document.createElement("option");
    none.text = "--- Select ---";
    none.value = "";
    select.appendChild(none);
    for (var _i = 0, nationalities_1 = nationalities; _i < nationalities_1.length; _i++) {
        var nationality = nationalities_1[_i];
        var option = document.createElement("option");
        option.text = nationality;
        option.value = nationality;
        select.appendChild(option);
    }
};
var sortById = function () {
    var idSort = document.getElementById("sort-id");
    currentSort = "id";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    idSort.classList.toggle("sorted");
    idSort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        return first.id - second.id;
    });
    displayAuthors(data);
};
var sortByName = function () {
    var nameSort = document.getElementById("sort-name");
    currentSort = "name";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    nameSort.classList.toggle("sorted");
    nameSort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        return first.name.localeCompare(second.name);
    });
    displayAuthors(data);
};
var sortByBibliography = function () {
    var bibliographySort = document.getElementById("sort-bibliography");
    currentSort = "bibliography";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    bibliographySort.classList.toggle("sorted");
    bibliographySort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        return second.bibliography.length - first.bibliography.length;
    });
    displayAuthors(data);
};
var sortByYearsActive = function () {
    var yearsActiveSort = document.getElementById("sort-yearsActive");
    currentSort = "yearsActive";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    yearsActiveSort.classList.toggle("sorted");
    yearsActiveSort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        var firstStartYear = Math.min.apply(Math, first.bibliography.map(function (book) { return book.year; }));
        var secondStartYear = Math.min.apply(Math, second.bibliography.map(function (book) { return book.year; }));
        if (firstStartYear !== secondStartYear) {
            return firstStartYear - secondStartYear;
        }
        var firstEndYear = first.death_date
            ? new Date(first.death_date).getFullYear()
            : Math.max.apply(Math, first.bibliography.map(function (book) { return book.year; }));
        var secondEndYear = second.death_date
            ? new Date(second.death_date).getFullYear()
            : Math.max.apply(Math, second.bibliography.map(function (book) { return book.year; }));
        return firstEndYear - secondEndYear;
    });
    displayAuthors(data);
};
var searchAuthors = function () {
    var nameSearch = document.getElementById("name-search");
    var nameValue = nameSearch.value.toLowerCase();
    var natSearch = document.getElementById("nationality-search");
    var natValue = natSearch.value;
    var yearActiveSearch = document.getElementById("year-active-search");
    var yearValue = yearActiveSearch.value ? parseInt(yearActiveSearch.value) : null;
    var filteredAuthors = data
        .filter(function (author) { return author.name.toLowerCase().includes(nameValue); })
        .filter(function (author) {
        if (natValue === "") {
            return true; // we don't filter by nationality
        }
        return (natValue === author.nationality);
    })
        .filter(function (author) {
        if (yearValue === null)
            return true;
        var startYear = Math.min.apply(Math, author.bibliography.map(function (book) { return book.year; }));
        var endYear = author.death_date
            ? new Date(author.death_date).getFullYear()
            : Math.max.apply(Math, author.bibliography.map(function (book) { return book.year; }));
        return yearValue >= startYear && yearValue <= endYear;
    });
    displayAuthors(filteredAuthors);
};
var loadData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term-2024/data/authors.json")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
