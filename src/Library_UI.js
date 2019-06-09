import Library from "./Library";
import App from "./app";

const Library_UI = {
    entry_types: {
        NAME: "name",
        AUTHOR: "author",
        PAGES: "pages",
        BOOK_ID: "bookid",
        DID_READ: "didread"
    },

    /**
     *  Adds event listener to #add-book-form and populates
     *  any existing books from library to UI
     *  @param Array library
     *  @return
     */
    init: function(library) {
        let add_book_form = document.getElementById("add-book-form");
        add_book_form.addEventListener("submit", this.add_book.bind(this));

        this.populate_books(library);
    },

    /**
     *  Iterates through the library array
     *  to append each book to UI
     *  @param Array library
     *  @return
     */
    populate_books: function populate_books(library) {
        for (let i = 0; i < library.length; i++) {
            this.append_book(library[i]);
        }

        this.show_empty_library(library.length);
    },

    /**
     *  Determines if we should display the "Empty Library"
     *  message
     *  @param Number amount
     *  @return
     */
    show_empty_library: function show_empty_library(amount) {
        var message = document.getElementsByClassName(
            "empty-library-message"
        )[0];

        message.style.display = amount > 0 ? "none" : "block";
    },

    /**
     *  Adds a book to the library array
     *  @param Object evt
     *  @return
     */
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
        this.append_book(book_entries);
        this.show_empty_library(App.library.length);
    },

    /**
     *  Appends book to UI
     *  @param Object book_entries
     *  @return
     */
    append_book: function append_book(book_entries = {}) {
        var clonable_book_entry = document.getElementsByClassName(
            "clonable-book-entry"
        )[0];

        let { id, name, author, pages, read } = book_entries;
        var new_entry = clonable_book_entry.cloneNode(true);

        new_entry.style.display = "block";
        new_entry.classList.remove("clonable-book-entry");
        new_entry.setAttribute("data-id", id);
        new_entry.getElementsByClassName("entry__name")[0].innerHTML = name;
        new_entry.getElementsByClassName("entry__author")[0].innerHTML = author;
        new_entry.getElementsByClassName("entry__pages")[0].innerHTML = pages;
        new_entry.getElementsByClassName("entry__checked")[0].checked = read;
        new_entry
            .getElementsByClassName("entry__checked")[0]
            .addEventListener("change", this.toggle_read.bind(this, id));
        new_entry
            .getElementsByClassName("entry__delete-btn")[0]
            .addEventListener("click", this.delete_book.bind(this, id));

        document.getElementById("books-list").appendChild(new_entry);
    },

    /**
     *  Deletes book and removes the book from the UI
     *  @param Number id
     *  @return
     */
    delete_book: function delete_book(id) {
        Library.delete_book(id);
        document.querySelectorAll(`[data-id="${id}"]`)[0].remove();
        this.show_empty_library(App.library.length);
    },

    /**
     *  Calls Library.toggle_read to toggle the "read"  boolean
     *  @param Number id
     *  @return
     */
    toggle_read: function toggle_read(id) {
        Library.toggle_read(id);
    }
};

export default Library_UI;
