import Express from "express";
import EJS from "ejs";
import multer from "multer";

const app = Express();

// app.set("views");
app.set("view engine", "ejs");
app.use(Express.static("./public"));

app.get("/", (req, res) => {
    res.render("index");
})

try {
    const port = 3000;
    app.listen(port, () => console.log(`Server Running on port ${port}`));
} catch (error) {
    console.log(error);
}   