const express = require("express");
const router = new express.Router();
const products = require("../models/productsSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");

//for get product data API********************************************************
router.get("/getproducts", async (req, res) => {
    try {
        const producstdata = await products.find();
        // console.log(producstdata + "data mila hain");
        
         res.status(201).json(producstdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});

//get individual data API**************************************************************
router.get("/getproductsone/:id", async (req, res) => {

    try {
        const { id } = req.params;
        console.log(id);

        const individual = await products.findOne({ id: id });
        console.log(individual + "ind mila hai");

        res.status(201).json(individual);
    } catch (error) {
        res.status(400).json(error);
    }
});

//ragister user API**********************************************
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "filll the all details" });
        console.log(" details");
    };

    try {

        const preuser = await User.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new User({
                fname, email, mobile, password, cpassword
            });

            const storedata = await finaluser.save();
            // console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("password at lest 6 and mobile are unique" + error.message);
        res.status(422).send(error);
    }

});


//for login user API******************************************************************

router.post("/login",async(req,res)=>{
    const{email,password}=req.body;

    if(!email || !password)
    {
        res.status(400).json({error:"fill the all fields"})
    };

    try{

        const userlogin = await User.findOne({ email : email});
         console.log(userlogin + "user value");

         if(userlogin){
            const isMatch = await bcrypt.compare(password,userlogin.password);
            // console.log(isMatch);
            //token genrate

            const token = await userlogin.generatAuthtoken();
            // console.log(token);
            
            res.cookie("Ecomwebsite",token,{
                expires:new Date(Date.now()+900000),
                httpOnly: true
            });
            
            if(!isMatch){
                res.status(400).json({error:"invalid crediential password"});

            }else{
                res.status(201).json({userlogin});
            }
        
        }else
        {
            res.status(400).json({error:"invalid details"});
        }

    }catch(error)
    {
        res.status(400).json({error:"invalid details"});
    }
})


//adding data into usercart API***********************************************

router.post("/addcart/:id",authenicate ,async(req,res)=>{

    try{

        const {id} = req.params;
        const cart = await products.findOne({id:id});
        console.log(cart+ " cart value")

        
        const Usercontact = await User.findOne({ _id: req.userID });
        console.log(Usercontact + "user is found");

        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
            console.log(cartData + " thse save wait kr");
            console.log(Usercontact + "userjode save");
            res.status(201).json(Usercontact);
        }else
        {
            res.status(401).json({error:"invalid user.."});

        }

    }catch(error)
    {
        res.status(401).json({error:"invalid user.."});

    }
})


// get data into the cart API*****************************************************
router.get("/cartdetails", authenicate, async (req, res) => {
    try {
        const buyuser = await User.findOne({ _id: req.userID });
        console.log(buyuser + "user hain buy pr");
        res.status(201).json(buyuser);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});

// get valid user API*****************************************************************
router.get("/validuser", authenicate, async (req, res) => {
    try {
        const validuserone = await User.findOne({ _id: req.userID });
       // console.log(validuserone + "user hain home k header main pr");
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for valid user");
    }
});



// remove iteam from the cart API********************************************************

router.get("/remove/:id", authenicate, async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("iteam remove");

    } catch (error) {
        console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
});


// for userlogout API*****************************************************************

router.get("/logout", authenicate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("Ecomwebsite", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "Error for user logout");
    }
});


module.exports =router;