import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;
const API_URL="https://animechan.xyz/api";

app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/public/', express.static('./public'));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/submit", async (req,res) => {
    try {
        const result=await axios.get("https://animechan.xyz/api/random");
        const q = result.data.quote;
        console.log(q);
        res.render("quote.ejs", {
            charName: result.data.character,
            quote:result.data.quote,
            animeName:result.data.anime,
        });
        //res.json({ quote });
        // const quote = response.quote;
        // console.log(quote);
    }
    catch(error)
    {
        //console.log(error.response.data);
        console.log("error");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});