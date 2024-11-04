type Book = {
    name: string,
    year: number,
    type: string // predefined list of types - "Novel", "Novella", "Non-Fiction", "Collection", "Graphic Novel"
}

type Author = {
    id: number,
    name: string,
    birth_date: string, // ISO 8601 date format
    death_date?: string, // optional, ISO 8601 date format
    nationality: string,
    bibliography: Book[]
}

const data:Author[] = [];

let currentSort = "id";

const displayAuthors = (authors: Author[]) => {
    const container = document.getElementById("author-container")!;
    container.innerHTML = "";
    for (const author of authors) {
        displayAuthor(author);
    }
}

const displayAuthor = (author: Author) => {
    const container = document.getElementById("author-container");
    const row = document.createElement("div"); 
    row.classList.add("author-row"); 
    row.appendChild(makeAuthorDataDiv(author.id.toString())); 
    row.appendChild(makeAuthorDataDiv(author.name)); 
    const bdate = getBirthDate(author.birth_date); 
    row.appendChild(makeAuthorDataDiv(bdate)); 

    const isAlive = getIsAlive(author); 
    const isAliveDiv = document.createElement("div"); 
    isAliveDiv.classList.add("author-data"); 
    const chkIsAlive = document.createElement("input"); 
    chkIsAlive.type = "checkbox"; chkIsAlive.disabled = true; 
    chkIsAlive.checked = isAlive; isAliveDiv.appendChild(chkIsAlive); 
    row.appendChild(isAliveDiv); 

    const age = getAge(author); 
    row.appendChild(makeAuthorDataDiv(age.toString())); 
    
    row.appendChild(makeAuthorDataDiv(author.nationality)); 
    row.appendChild(makeAuthorDataDiv(author.bibliography.length.toString())); 

    const yearsActive = getActiveYears(author); 
    row.appendChild(makeAuthorDataDiv(yearsActive)); 
    container?.appendChild(row); 
}


const getAge = (author: Author) => {
    const birthYear = new Date(author.birth_date).getFullYear();
    if (author.death_date) {
        const deathYear = new Date(author.death_date).getFullYear();
        const age = deathYear - birthYear;
        console.log(`Author: ${author.name}, Age at death: ${age}`);
        return age;
    } else {
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        console.log(`Author: ${author.name}, Current Age: ${age}`);
        return age;
    }
}

const getActiveYears = (author: Author) => {
    const publicationYears = author.bibliography.map(book => book.year);
    const startYear = Math.min(...publicationYears);
    let endYear: string | number =  Math.max(...publicationYears);
    const currentYear = new Date().getFullYear();
    const isAlive = getIsAlive(author);

    if(author.death_date){
        endYear = new Date(author.death_date).getFullYear();
    } else if (endYear === currentYear || endYear === currentYear - 1 || endYear === currentYear - 2){
        endYear = 'present';
    }
    return `${startYear} - ${endYear}`;
}

const getBirthDate = (birthDateString: string) => {
    const birthDate = new Date(birthDateString);
    console.log(birthDate);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth()+1;
    const day = birthDate.getDate();
    const result = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    console.log(result);
    return result;
}

const getIsAlive = (author: Author) => {
    return author.death_date === undefined
}

const makeAuthorDataDiv = (data: string) => {
    const div = document.createElement("div");
    div.classList.add("author-data");
    div.textContent = data;
    return div;
}

document.addEventListener("DOMContentLoaded", async () => {
    const localData = await loadData();
    data.push(...localData);
    displayAuthors(data);

    const nationalities = extractNationalities(data);
    displayNationalities(nationalities);

    const idSort = document.getElementById("sort-id")!;
    idSort.style.cursor = "pointer";
    idSort?.addEventListener("click", sortById);

    const nameSort = document.getElementById("sort-name")!;
    nameSort.style.cursor = "pointer";
    nameSort?.addEventListener("click", sortByName);

    const bibliographySort = document.getElementById("sort-bibliography")!;
    bibliographySort.style.cursor = "pointer";
    bibliographySort?.addEventListener("click", sortByBibliography);

    const yearsActiveSort = document.getElementById("sort-yearsActive")!;
    yearsActiveSort.style.cursor = "pointer";
    yearsActiveSort?.addEventListener("click", sortByYearsActive);

    const searchButton = document.getElementById("search-authors");
    searchButton?.addEventListener("click", searchAuthors);

    const yearActiveSearch = document.getElementById("year-active-search") as HTMLInputElement;
    yearActiveSearch?.addEventListener("input", searchAuthors);

});

const extractNationalities = (authors: Author[]) => {
    const allNationalities = authors.map(author => author.nationality);
    const unique = [...new Set(allNationalities)];
    unique.sort((f, s) => f.localeCompare(s));
    return unique;
}

const displayNationalities = (nationalities: string[]) => {
    const select = document.getElementById("nationality-search")! as HTMLSelectElement;
    select.innerHTML = "";
    const none = document.createElement("option");
    none.text = "--- Select ---";
    none.value = "";
    select.appendChild(none);
    for (const nationality of nationalities) {
        const option = document.createElement("option");
        option.text = nationality;
        option.value = nationality;
        select.appendChild(option);
    }
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

    data.sort((first: Author, second: Author) => {
        return first.id - second.id;
    });
    displayAuthors(data);
}

const sortByName = () => {
    const nameSort = document.getElementById("sort-name")!;

    currentSort = "name";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    nameSort.classList.toggle("sorted");
    nameSort.classList.toggle("unsorted");

    data.sort((first: Author, second: Author) => {
        return first.name.localeCompare(second.name);
    });
    displayAuthors(data);
}

const sortByBibliography = () => {
    const bibliographySort = document.getElementById("sort-bibliography")!;

    currentSort = "bibliography";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    bibliographySort.classList.toggle("sorted");
    bibliographySort.classList.toggle("unsorted");

    data.sort((first: Author, second: Author) => {
        return second.bibliography.length - first.bibliography.length;
    });
    displayAuthors(data);
}

const sortByYearsActive = () => {
    const yearsActiveSort = document.getElementById("sort-yearsActive")!;

    currentSort = "yearsActive";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    yearsActiveSort.classList.toggle("sorted");
    yearsActiveSort.classList.toggle("unsorted");

    data.sort((first: Author, second: Author) => {
        const firstStartYear = Math.min(...first.bibliography.map(book => book.year));
        const secondStartYear = Math.min(...second.bibliography.map(book => book.year));

        if(firstStartYear !== secondStartYear){
            return firstStartYear - secondStartYear;
        }

        const firstEndYear = first.death_date
        ? new Date(first.death_date).getFullYear()
        : Math.max(...first.bibliography.map(book => book.year));
        const secondEndYear = second.death_date
        ? new Date(second.death_date).getFullYear()
        : Math.max(...second.bibliography.map(book => book.year));

        return firstEndYear - secondEndYear;
    });
    displayAuthors(data);
}

const searchAuthors = () => {
    const nameSearch = document.getElementById("name-search")! as HTMLInputElement;
    const nameValue = nameSearch.value.toLowerCase();

    const natSearch = document.getElementById("nationality-search")! as HTMLSelectElement;
    const natValue = natSearch.value;

    const yearActiveSearch = document.getElementById("year-active-search")! as HTMLSelectElement;
    const yearValue = yearActiveSearch.value ? parseInt(yearActiveSearch.value) : null;

    const filteredAuthors = data
        .filter(author => author.name.toLowerCase().includes(nameValue))
        .filter(author => {
            if (natValue === "") {
                return true; // we don't filter by nationality
            }
            return (natValue === author.nationality);
        })
        .filter(author => {
            if(yearValue === null) return true;

            const startYear = Math.min(...author.bibliography.map(book => book.year));
            const endYear = author.death_date
            ? new Date(author.death_date).getFullYear()
            : Math.max(...author.bibliography.map(book => book.year));

            return yearValue >= startYear && yearValue <= endYear;
        });
    displayAuthors(filteredAuthors);
}

const loadData = async () => {
    const response = await fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term-2024/data/authors.json");
    const data = await response.json();
    return data;
}

