const { prisma } = require("../db/config");

const updateEntry = async(req, res) => {
    try {
        let { id } = req.params;
        id = parseInt(id);
        const updatedFields = req.body;
        if(!id) return res.status(400).json({error: "id is required"});
        if(!updatedFields) return res.status(400).json({error: "No fields provided to update"})

        const current = await prisma.cart.findUnique({where: {cartId: id}});
        if(!current) return res.status(404).json({error: "Entry not found"});

        const updatedEntry = await prisma.cart.update({
            where: {cartId: id},
            data: updatedFields
        });

        return res.status(200).json(updatedEntry);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"})
    }
};

module.exports = updateEntry;