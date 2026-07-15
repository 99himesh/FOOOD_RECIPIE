

const userModel=require("../models/UserModel.js")

const signUp = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        const user = await userModel.findAll({
            where: {
                [Op.or]: {
                    email: email,
                    mobile: mobile
                }

            }
        })
        if (user.length) {
            return res.status(400).send("User aready  exist")
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                throw new Error("Somethinggfsngkjsfdn went wrong!")
            }
            const user = await Users.create({ name, email, password: hash, mobile });
            res.status(201).json({ success: true, user, message: "User created successfully" })
        });
    } catch (error) {
        console.log(error, "fgjbdfjhgfdjh");

        res.status(500).json(error)

    }
}


const logIn = async (req, res) => {
    try {
        const { emailAndMobile, password } = req.body;
        console.log(emailAndMobile);

        const user = await Users.findAll({
            where: {
                [Op.or]: [
                    { email: emailAndMobile },
                    { mobile: emailAndMobile }
                ]
            }
        });
        console.log(user[0].password);

        if (!user.length) {
            return res.status(404).send("User not exist");
        }

        await bcrypt.compare(password, user[0]?.password, async (err, result) => {
            if (err) {
                throw new Error("Something went wrong!")
            }
            if (result) {
                res.status(200).json({ success: true, user, token: await generatejwtToken(user[0].id, user[0].name), message: "User Login successfully" })
            } else {
                return res.status(401).send("User not authorized");
            }

        })

    } catch (error) {
        res.status(500).json(error.message)

    }
}