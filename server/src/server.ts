import express from "express";
import cors from "cors";
import { productRouter } from "../routes/product";


const PORT = process.env.PORT || 8000

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:4200"
    }
));

app.use("/api/products", productRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})