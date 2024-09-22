import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const upload = multer({ dest: "./imgs/" });

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const blogsFilePath = path.resolve("./DB/json/Blogs.json");
const usersFilePath = path.resolve("./DB/json/users.json");
let Blogs = JSON.parse(fs.readFileSync(blogsFilePath).toString());
let users = JSON.parse(fs.readFileSync(usersFilePath).toString());

app.get("/blogs", (req, res) => {
    console.log(Blogs.length, 'blogs récupérés')
    return res.status(201).json(Blogs);
})
app.get("/users", (req, res) => {
    return res.status(200).json(users);
})
app.post("/register", (req, res) => {
    if(!req.body.username) return res.status(400).json({message: "bad request"})
})
app.post("/login", (req, res) => {
    if(!req.body.username) return res.status(400).json({message: "bad request"})

    let user = users.find(a => a.name === req.body.username);
    if(!user) return res.status(401).json({message: "unauthorized"});

    return res.status(200).json(user)
})

app.post("/upload", upload.array("images"), (req, res) => {
    var images = [];

    const { name, description, content, author } = req.body;

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            const fileName = `${Date.now()}-${file.originalname}`;
            const destPath = path.join("./DB/images/", fileName);
            fs.copyFileSync(file.path, destPath);
            if(file.originalname.includes(".")) images.push(fileName);
            console.log(images)
            fs.rmSync(file.path);
        });
    }

    Blogs.push({
        name,
        description,
        content,
        images,
        author
    });

    fs.writeFileSync(blogsFilePath, JSON.stringify(Blogs, null, 2), "utf8");

    res.json({ images });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


export default app