const User = require("../models/User")
const { verifyToken, verifyTokenAndAuth } = require("./verifyToken");


const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SECRET
            ).toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
            {
                $set: req.body
            },
            { new: true });

            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json(err)

        }

    


})

//DELETE

router.delete("/:id", verifyTokenAndAuth, async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})





module.exports = router