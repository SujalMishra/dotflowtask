import axios from "axios";
const API_KEY = "147288a8becf4488a4a05fe63341b2d6";

export default async function handler(req, res) {
    const { searchQuery } = req.query;
    console.log(searchQuery);
    try {
        const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&apiKey=${API_KEY}`
        );
        console.log(response.data.articles);
        res.status(200).json(response.data.articles);
    } catch (error) {
        console.log(error);
    }
    }