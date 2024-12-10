const { prisma } = require("../db/config");

const addEntry = async(req, res) => {
    try {
        const {userId, productId, count} = req.body;
        if(!userId || !productId || !count) return res.status(404).json({error: "All fields required"})
        
        const newEntry = await prisma.cart.create({
            data: {
                userId,
                productId,
                count
            }
        });

        return res.status(201).json({
            cartId: newEntry.cartId,
            userId: newEntry.userId,
            productId: newEntry.productId,
            count: newEntry.count
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"})
    }
    
}

module.exports = addEntry;