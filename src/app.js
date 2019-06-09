import Library from "./Library";
import Library_UI from "./Library_UI";

const App = {
    library: [],
    init: function init() {
        let books_arr = Library.fetch_books();
        this.library = books_arr ? books_arr : [];
        Library_UI.init(this.library);
    }
};

App.init();

export default App;
