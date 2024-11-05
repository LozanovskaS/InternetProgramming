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
var _this = this;
var data = [];
var currentSort = "id";
var displayMovies = function (movies) {
    var container = document.getElementById("movie-container");
    container.innerHTML = "";
    for (var _i = 0, movies_1 = movies; _i < movies_1.length; _i++) {
        var movie = movies_1[_i];
        displayMovie(movie);
    }
};
var displayMovie = function (movie) {
    var container = document.getElementById("movie-container");
    var row = document.createElement("div");
    row.classList.add("movie-row");
    row.appendChild(makeMovieDataDiv(movie.id.toString()));
    row.appendChild(makeMovieDataDiv(movie.title));
    row.appendChild(makeMovieDataDiv(movie.year.toString()));
    row.appendChild(makeMovieDataDiv(movie.director));
    row.appendChild(makeMovieDataDiv(movie.genre.join('/')));
    row.appendChild(makeMovieDataDiv(truncatePlot(movie.plot)));
    // row.appendChild(makeMovieDataDiv(formatCast(movie.cast)));
    // row.appendChild(makeMovieDataDiv(movie.oscar.length.toString()));
    container === null || container === void 0 ? void 0 : container.appendChild(row);
};
var makeMovieDataDiv = function (data) {
    var div = document.createElement("div");
    div.classList.add("movie-data");
    div.textContent = data;
    return div;
};
var truncatePlot = function (plot) {
    if (plot.length <= 50)
        return plot;
    var lastSpace = plot.slice(0, 50).lastIndexOf(' ');
    return "".concat(plot.slice(0, lastSpace), "...");
};
// const getAge = (author: Author) => {
//     const birthYear = new Date(author.birth_date).getFullYear();
//     if (author.death_date) {
//         const deathYear = new Date(author.death_date).getFullYear();
//         const age = deathYear - birthYear;
//         console.log(`Author: ${author.name}, Age at death: ${age}`);
//         return age;
//     } else {
//         const currentYear = new Date().getFullYear();
//         const age = currentYear - birthYear;
//         console.log(`Author: ${author.name}, Current Age: ${age}`);
//         return age;
//     }
// }
// const getActiveYears = (author: Author) => {
//     const publicationYears = author.bibliography.map(book => book.year);
//     const startYear = Math.min(...publicationYears);
//     let endYear: string | number =  Math.max(...publicationYears);
//     const currentYear = new Date().getFullYear();
//     const isAlive = getIsAlive(author);
//     if(author.death_date){
//         endYear = new Date(author.death_date).getFullYear();
//     } else if (endYear === currentYear || endYear === currentYear - 1 || endYear === currentYear - 2){
//         endYear = 'present';
//     }
//     return `${startYear} - ${endYear}`;
// }
// const getBirthDate = (birthDateString: string) => {
//     const birthDate = new Date(birthDateString);
//     console.log(birthDate);
//     const year = birthDate.getFullYear();
//     const month = birthDate.getMonth()+1;
//     const day = birthDate.getDate();
//     const result = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
//     console.log(result);
//     return result;
// }
// const getIsAlive = (author: Author) => {
//     return author.death_date === undefined
// }
var makeAuthorDataDiv = function (data) {
    var div = document.createElement("div");
    div.classList.add("author-data");
    div.textContent = data;
    return div;
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
    displayMovies(data);
};
var sortByTitle = function () {
    var titleSort = document.getElementById("sort-title");
    currentSort = "title";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    titleSort.classList.toggle("sorted");
    titleSort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        return first.title.localeCompare(second.title);
    });
    displayMovies(data);
};
var sortByYear = function () {
    var yearSort = document.getElementById("sort-year");
    currentSort = "year";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    yearSort.classList.toggle("sorted");
    yearSort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        return first.year - second.year;
    });
    displayMovies(data);
};
var sortByDirector = function () {
    var directorSort = document.getElementById("sort-director");
    currentSort = "director";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    directorSort.classList.toggle("sorted");
    directorSort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        return first.director.localeCompare(second.director);
    });
    displayMovies(data);
};
var sortByGenre = function () {
    var genreSort = document.getElementById("sort-genre");
    currentSort = "genre";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    genreSort.classList.toggle("sorted");
    genreSort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        var firstGenre = first.genre[0] || "";
        var secondGenre = second.genre[0] || "";
        return firstGenre.localeCompare(secondGenre);
    });
    displayMovies(data);
};
var sortByOscar = function () {
    var oscarSort = document.getElementById("sort-oscar");
    currentSort = "oscar";
    var allSorters = document.getElementsByClassName("sorter");
    for (var index = 0; index < allSorters.length; index++) {
        var sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    oscarSort.classList.toggle("sorted");
    oscarSort.classList.toggle("unsorted");
    data.sort(function (first, second) {
        return second.oscar.length - first.oscar.length;
    });
    displayMovies(data);
};
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var localData, idSort, titleSort, yearSort, directorSort, genreSort, oscarSort, searchButton;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadData()];
            case 1:
                localData = _a.sent();
                data.push.apply(data, localData);
                displayMovies(data);
                idSort = document.getElementById("sort-id");
                idSort.style.cursor = "pointer";
                idSort === null || idSort === void 0 ? void 0 : idSort.addEventListener("click", sortById);
                titleSort = document.getElementById("sort-title");
                titleSort.style.cursor = "pointer";
                titleSort === null || titleSort === void 0 ? void 0 : titleSort.addEventListener("click", sortByTitle);
                yearSort = document.getElementById("sort-year");
                yearSort.style.cursor = "pointer";
                yearSort === null || yearSort === void 0 ? void 0 : yearSort.addEventListener("click", sortByYear);
                directorSort = document.getElementById("sort-director");
                directorSort.style.cursor = "pointer";
                directorSort === null || directorSort === void 0 ? void 0 : directorSort.addEventListener("click", sortByDirector);
                genreSort = document.getElementById("sort-genre");
                genreSort.style.cursor = "pointer";
                genreSort === null || genreSort === void 0 ? void 0 : genreSort.addEventListener("click", sortByGenre);
                oscarSort = document.getElementById("sort-oscar");
                oscarSort.style.cursor = "pointer";
                oscarSort === null || oscarSort === void 0 ? void 0 : oscarSort.addEventListener("click", sortByOscar);
                searchButton = document.getElementById("search-movies");
                searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("click", searchMovies);
                return [2 /*return*/];
        }
    });
}); });
var searchMovies = function () {
    var titleSearch = document.getElementById("title-search");
    var titleValue = titleSearch.value.toLowerCase();
    // const natSearch = document.getElementById("nationality-search")! as HTMLSelectElement;
    // const natValue = natSearch.value;
    var yearSearch = document.getElementById("year-search");
    var yearValue = yearSearch.value ? parseInt(yearSearch.value) : null;
    var filteredMovies = data
        .filter(function (movie) { return movie.title.toLowerCase().includes(titleValue); })
        .filter(function (movie) {
        if (yearValue === null)
            return true;
        return movie.year === yearValue;
    });
    // .filter(author => {
    //     if(yearValue === null) return true;
    //     const startYear = Math.min(...author.bibliography.map(book => book.year));
    //     const endYear = author.death_date
    //     ? new Date(author.death_date).getFullYear()
    //     : Math.max(...author.bibliography.map(book => book.year));
    //     return yearValue >= startYear && yearValue <= endYear;
    // });
    displayMovies(filteredMovies);
};
var loadData = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
