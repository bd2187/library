import Book from "./Book";
import App from "./app";

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
            let book = App.library[i];
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
        this.update_db();
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

export default Library;
