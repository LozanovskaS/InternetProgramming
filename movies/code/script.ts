type Movie = {   
    id: number,
    title: string,    
    year: number,     
    director: string,     
    genre: string[],    
    plot: string,     
    cast: Cast[],     
    oscar: Oscars[],     
    rating: number; 
}   

type Cast = {     
    actor: string,     
    character: string  
}   

type Oscars = {     
    award: string 
}

const data:Movie[] = [];

let currentSort = "id";

const displayMovies = (movies: Movie[]) => {
    const container = document.getElementById("movie-container")!;
    container.innerHTML = "";
    for (const movie of movies) {
        displayMovie(movie);
    }
}

const displayMovie = (movie: Movie) => {
    const container = document.getElementById("movie-container");
    const row = document.createElement("div");
    row.classList.add("movie-row");

    row.appendChild(makeMovieDataDiv(movie.id.toString()));
    row.appendChild(makeMovieDataDiv(movie.title));
    row.appendChild(makeMovieDataDiv(movie.year.toString()));
    row.appendChild(makeMovieDataDiv(movie.director));
    row.appendChild(makeMovieDataDiv(movie.genre.join('/')));
    row.appendChild(makeMovieDataDiv(truncatePlot(movie.plot)));
    // row.appendChild(makeMovieDataDiv(formatCast(movie.cast)));
    // row.appendChild(makeMovieDataDiv(movie.oscar.length.toString()));

    container?.appendChild(row);
}

const makeMovieDataDiv = (data: string) => {
    const div = document.createElement("div");
    div.classList.add("movie-data");
    div.textContent = data;
    return div;
}

const truncatePlot = (plot: string) => {
    if (plot.length <= 50) 
        return plot;
    
    const lastSpace = plot.slice(0, 50).lastIndexOf(' ');
    return `${plot.slice(0, lastSpace)}...`;
}

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

const makeAuthorDataDiv = (data: string) => {
    const div = document.createElement("div");
    div.classList.add("author-data");
    div.textContent = data;
    return div;
}

const sortById = () => {
    const idSort = document.getElementById("sort-id")!;

    currentSort = "id";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    idSort.classList.toggle("sorted");
    idSort.classList.toggle("unsorted");

    data.sort((first: Movie, second: Movie) => {
        return first.id - second.id;
    });
    displayMovies(data);
}

const sortByTitle = () => {
    const titleSort = document.getElementById("sort-title")!;

    currentSort = "title";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    titleSort.classList.toggle("sorted");
    titleSort.classList.toggle("unsorted");

    data.sort((first: Movie, second: Movie) => {
        return first.title.localeCompare(second.title);
    });
    displayMovies(data);
}

const sortByYear = () => {
    const yearSort = document.getElementById("sort-year")!;

    currentSort = "year";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    yearSort.classList.toggle("sorted");
    yearSort.classList.toggle("unsorted");

    data.sort((first: Movie, second: Movie) => {
        return first.year - second.year;
    });
    displayMovies(data);
}

const sortByDirector = () => {
    const directorSort = document.getElementById("sort-director")!;

    currentSort = "director";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    directorSort.classList.toggle("sorted");
    directorSort.classList.toggle("unsorted");

    data.sort((first: Movie, second: Movie) => {
        return first.director.localeCompare(second.director);
    });
    displayMovies(data);
}

const sortByGenre = () => {
    const genreSort = document.getElementById("sort-genre")!;

    currentSort = "genre";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    genreSort.classList.toggle("sorted");
    genreSort.classList.toggle("unsorted");

    data.sort((first: Movie, second: Movie) => {
        const firstGenre = first.genre[0] || "";
        const secondGenre = second.genre[0] || "";

        return firstGenre.localeCompare(secondGenre);
    });
    displayMovies(data);
}

const sortByOscar = () => {
    const oscarSort = document.getElementById("sort-oscar")!;

    currentSort = "oscar";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    oscarSort.classList.toggle("sorted");
    oscarSort.classList.toggle("unsorted");

    data.sort((first: Movie, second: Movie) => {
        return second.oscar.length - first.oscar.length;
    });
    displayMovies(data);
}

document.addEventListener("DOMContentLoaded", async () => {
    const localData = await loadData();
    data.push(...localData);
    displayMovies(data);

    const idSort = document.getElementById("sort-id")!;
    idSort.style.cursor = "pointer";
    idSort?.addEventListener("click", sortById);

    const titleSort = document.getElementById("sort-title")!;
    titleSort.style.cursor = "pointer";
    titleSort?.addEventListener("click", sortByTitle);

    const yearSort = document.getElementById("sort-year")!;
    yearSort.style.cursor = "pointer";
    yearSort?.addEventListener("click", sortByYear);

    const directorSort = document.getElementById("sort-director")!;
    directorSort.style.cursor = "pointer";
    directorSort?.addEventListener("click", sortByDirector);

    const genreSort = document.getElementById("sort-genre")!;
    genreSort.style.cursor = "pointer";
    genreSort?.addEventListener("click", sortByGenre);

    const oscarSort = document.getElementById("sort-oscar")!;
    oscarSort.style.cursor = "pointer";
    oscarSort?.addEventListener("click", sortByOscar);

    const searchButton = document.getElementById("search-movies");
    searchButton?.addEventListener("click", searchMovies);
});

const searchMovies = () => {
    const titleSearch = document.getElementById("title-search")! as HTMLInputElement;
    const titleValue = titleSearch.value.toLowerCase();

    // const natSearch = document.getElementById("nationality-search")! as HTMLSelectElement;
    // const natValue = natSearch.value;

    const yearSearch = document.getElementById("year-search")! as HTMLSelectElement;
    const yearValue = yearSearch.value ? parseInt(yearSearch.value) : null;

    const filteredMovies = data
        .filter(movie => movie.title.toLowerCase().includes(titleValue))
        .filter(movie => {
            if(yearValue === null) return true;

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
}

const loadData = async () => {
    const response = await fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json");
    const data = await response.json();
    return data;
}

