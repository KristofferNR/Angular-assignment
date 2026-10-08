import { db } from "../src/database";
import express from "express";

export const productRouter = express.Router();



productRouter.get("/", (req, res) => {
    const products = db
    .prepare(`SELECT * FROM products`)
    .all();

    res.json(products)
})

productRouter.get("/spot", (req, res) => {
    const products = db
    .prepare(`SELECT * FROM products ORDER BY RANDOM() LIMIT 3`)
    .all();
    res.json(products)
})

productRouter.get("/hero", (req, res) => {
    const products = db
    .prepare(`SELECT * FROM products ORDER BY date DESC LIMIT 1`)
    .get();
    res.json(products)
})

productRouter.get("/search", (req, res) => {
    const query = (req.query.q as string || "").trim().toLowerCase();
    console.log(query);

    if (!query) {
        res.status(400)
        .json({ error: "Missing search query" });
        return
    }

    const search = `%${query}%`;

    const products = db
        .prepare(`SELECT * FROM products WHERE LOWER(name) LIKE ?`)
    .all(search);
    console.log(products);
    res.json(products)
})

productRouter.get("/:slug", (req, res) => {

    const product = db
    .prepare(`SELECT * FROM products WHERE slug = ?`)
    .get(req.params.slug);

    if (!product) {
        res.status(404)
        .json({ error: "Product not found" });

        return
    }

    res.json(product)
})

productRouter.get('/related/:slug', (req, res) => {
  const { slug } = req.params;

  const products = db
    .prepare('SELECT * FROM products WHERE slug != ? ORDER BY RANDOM() LIMIT 3')
    .all(slug);

  res.json(products);
});

productRouter.post("/", (req, res) => {

    const { 
        name, 
        brand, 
        price, 
        sku, 
        image, 
        description, 
        date,  
    } = req.body;

    if (!name || !price || !sku || !image || !date) {
        res.status(400)
        .json({ error: "Missing required fields" });

        return
    }

    const slug = name
    .toLowerCase()
    .replace(/[åä]+/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/[ö]+/g, "o");
    
    const product = db.prepare(
        `INSERT INTO products (
            name, 
            brand, 
            price, 
            sku, 
            image, 
            description, 
            date, 
            slug
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        );
    
    try {

        const result = product.run(
            name, 
            brand, 
            price, 
            sku, 
            image, 
            description, 
            date,
            slug
        );
        res.status(201)
        .json({ 
            message: "Product created successfully", 
            id: result.lastInsertRowid, 
            slug
        });

    } catch (error: any) {

        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {

            if (error.message.includes("products.sku")) {
            res.status(409)
            .json({ error: "SKU already exists" });
            return;
            }
        }


        if (error.message.includes("products.slug")) {
            res.status(409)
            .json({ error: "Product with this name already exists" });
            return;
        }

        res.status(400)
        .json({ error: error.message });
    }
})

productRouter.delete("/:id", (req, res) => {

    const product = db
    .prepare(`DELETE FROM products WHERE id = ?`);

    const result = product
    .run(req.params.id);

    if (result.changes > 0) {

        res.status(200)
        .json({ message: "Product deleted successfully" });

    } else {

        res.status(404)
        .json({ error: "Product not found" });

    }
})


