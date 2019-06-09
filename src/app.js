const Book = function Book(id, name, author, pages, read) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

const Library = {
    /**
     *  Creates a new book with Book.prototype
     *  @param Object book_info
     *  @return
     */
    create_book: function create_book(book_info = {}) {
        let { id, name, author, pages, read } = book_info;

        let book = new Book(id, name, author, pages, read);

        this.add_book(book);
    },

    /**
     *  Adds book to library
     *  @param Object book
     *  @return
     */
    add_book: function add_book(book) {
        App.library = [...App.library, book];
        this.update_db();
    },

    /**
     *  Deletes book by iterating through
     *  library and filtering out book with same id value
     *  as argument passed as id
     *  @param Number id
     *  @return
     */
    delete_book: function delete_book(id) {
        let filtered_library = [];

        for (let i = 0; i < App.library.length; i++) {
            let book = this.library[i];
            if (book.id != id) filtered_library.push(book);
        }

        App.library = filtered_library;
        this.update_db();
    },

    /**
     *  Toggles boolean value of book.read
     *  @param Number id
     *  @return
     */
    toggle_read: function toggle_read(id) {
        for (let i = 0; i < App.library.length; i++) {
            let book = App.library[i];
            if (book.id === id) {
                book.read = !book.read;
                break;
            }
        }
    },

    /**
     *  Fetches array of books from local storage
     *  @param
     *  @return Array (if user_books is found) or null )if user_books is not found
     */
    fetch_books: function fetch_books() {
        let user_books = localStorage.getItem("user_books");

        if (user_books) {
            try {
                return JSON.parse(user_books).user_books;
            } catch (err) {
                return null;
            }
        } else {
            return null;
        }
    },

    /**
     *  Saves library in local storage
     *  @param
     *  @return
     */
    update_db: function update_db() {
        let books = {
            user_books: App.library
        };
        localStorage.setItem("user_books", JSON.stringify(books));
    }
};

const Library_UI = {
    entry_types: {
        NAME: "name",
        AUTHOR: "author",
        PAGES: "pages",
        BOOK_ID: "bookid",
        DID_READ: "didread"
    },

    init: function() {
        this.handle_event_listeners();
        this.populate_books();
    },

    populate_books: function() {
        App.library;
    },

    handle_event_listeners: function handle_event_listeners() {
        let add_book_form = document.getElementById("add-book-form");

        add_book_form.addEventListener("submit", this.add_book.bind(this));
    },

    add_book: function add_book(evt) {
        evt.preventDefault();
        let book_inputs = [...document.getElementsByClassName("book-data")];
        let book_entries = {};

        book_inputs.forEach(input_el => {
            let entry = input_el;
            let entry_type = entry.getAttribute("data-entry").toLowerCase();

            const { NAME, AUTHOR, PAGES, BOOK_ID, DID_READ } = this.entry_types;

            switch (entry_type) {
                case NAME:
                    book_entries.name = entry.value;
                    break;

                case AUTHOR:
                    book_entries.author = entry.value;
                    break;

                case PAGES:
                    book_entries.pages = entry.value;
                    break;

                case BOOK_ID:
                    book_entries.id = entry.value;
                    break;

                case DID_READ:
                    book_entries.read = entry.checked;
                    break;

                default:
                    break;
            }

            if (entry.type === "text") {
                entry.value = "";
            } else if (entry.type === "checkbox") {
                entry.checked = false;
            }
        });

        Library.add_book(book_entries);
    }
};

const App = {
    library: [],
    init: function init() {
        let books_arr = Library.fetch_books();
        this.library = books_arr ? books_arr : [];
        Library_UI.init();
    }
};

// App.create_book({
//     id: 123,
//     name: "book name",
//     author: "book author",
//     pages: 300,
//     read: false
// });

// App.create_book({
//     id: 456,
//     name: "book name",
//     author: "book author",
//     pages: 300,
//     read: false
// });

// App.delete_book(456);

// console.log(App.library);
App.init();
