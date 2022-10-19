import "./css/discover.css";
import "./css/earbuds.css";
import "./css/products.css";
import "./css/speaker.css";
import "./css/main.css";
import "./css/footer.css";

import MainScript from "./scripts/mainScript";

//starting the application
$(document).ready(function () {
    $(".loading-container").remove();
    $("body").css({ overflow: "scroll" });
    window.app = new MainScript();
    app.slide(0);
});
