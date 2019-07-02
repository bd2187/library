import library from "./Library";
import library_ui from "./Library_UI";

class App {
    constructor() {
        this.library = [];
    }

    init() {
        let books_arr = library.fetch_books();
        this.library = books_arr ? books_arr : [];
        library_ui.init(this.library);
    }
}

const app = new App();

app.init();

export default app;
