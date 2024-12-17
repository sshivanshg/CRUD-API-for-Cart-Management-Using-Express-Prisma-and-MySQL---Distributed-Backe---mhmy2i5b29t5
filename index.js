const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Parse JSON requests
app.use(authMiddleware); // Global middleware

// 1. Create a New Cart Entry
app.post("/api/cart/addProduct", async (req, res) => {
  const { userId, productId, count } = req.body;

  try {
    const newCart = await prisma.cart.create({
      data: { userId, productId, count },
    });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ error: "Unable to create cart entry" });
  }
});

// 2. Retrieve Cart Entry by ID
app.get("/api/cart/getById/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { cartId: parseInt(id) },
    });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: "Unable to retrieve cart entry" });
  }
});

// 3. Partially Update a Cart Entry
app.patch("/api/cart/patch/:id", async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    const updatedCart = await prisma.cart.update({
      where: { cartId: parseInt(id) },
      data: { count },
    });
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: "Unable to update cart entry" });
  }
});

// 4. Delete a Cart Entry
app.delete("/api/cart/removeProduct/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cart.delete({
      where: { cartId: parseInt(id) },
    });
    res.status(200).json({ message: "Cart entry deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Unable to delete cart entry" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
