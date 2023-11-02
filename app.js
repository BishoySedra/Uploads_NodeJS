import Express from "express";
import ejs from "ejs";
import upload from "./services/multerUpload.js";

const app = Express();

// EJS
app.set("view engine", "ejs");

// static
app.use(Express.static("./public"));

// routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/upload", (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            res.render('index', {
                msg: error
            });
        } else {
            if (req.file === undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected!!'
                });
            } else {
                res.render('index', {
                    msg: 'File Uploaded Successfully!',
                    filePath: `/uploads/${req.file.filename}`
                });
            }
        }
    });
});

try {
    const port = 3000;
    app.listen(port, () => console.log(`Server Running on port ${port}`));
} catch (error) {
    console.log(error);
}   