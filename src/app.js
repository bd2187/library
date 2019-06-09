const Book = function Book(id, name, author, pages, read) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

const App = {
    library: [],
    init: function init() {
        let books_arr = this.fetch_books();
        this.library = books_arr ? books_arr : [];
    },

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
        this.library = [...this.library, book];
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

        for (let i = 0; i < this.library.length; i++) {
            let book = this.library[i];
            if (book.id != id) filtered_library.push(book);
        }

        this.library = filtered_library;
        this.update_db();
    },

    /**
     *  Toggles boolean value of book.read
     *  @param Number id
     *  @return
     */
    toggle_read: function toggle_read(id) {
        for (let i = 0; i < this.library.length; i++) {
            let book = this.library[i];
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
            user_books: this.library
        };
        localStorage.setItem("user_books", JSON.stringify(books));
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
// App.init();
