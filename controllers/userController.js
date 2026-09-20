

const { Op } = require("sequelize");
const userModel=require("../models/UserModel.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const FollowerModel = require("../models/followeModel.js");
const { sendNotificationToAll } = require("../socketio/notification.js");
const NotificationModel = require("../models/notificationModel.js");
const sequelize = require("../utils/db.js");

const generatejwtToken = async (userId, name) => {
    return await jwt.sign({ userId: userId, name: name }, process.env.JWT_SECRET_KEY);
}
const signUp = async (req, res) => {
    try {
        const { name, email, password, mobile ,role} = req.body;        
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
        await bcrypt.hash(password, 10, async function (err, hash) {            
            if (err) {
                throw new Error("Something went wrong!")
            }            
            const user = await userModel.create({ name, email, password: hash, mobile,role });

            res.status(201).json({ success: true, user, message: "User created successfully" })
        });
    } catch (error) {
        res.status(500).json(error)
    }
}
const logIn = async (req, res) => {
    try {
        const { emailAndMobile, password } = req.body;
        const user = await userModel.findAll({
            where: {
                [Op.or]: [
                    { email: emailAndMobile },
                    { mobile: emailAndMobile }
                ]
            }
        });        
        if(user[0].isBlock){
          return  res.status(403).json({message:"User is blocked"})
        }
        if (!user.length) {
            return res.status(404).send("User not exist");
        }
        await bcrypt.compare(password, user[0]?.password, async (err, result) => {
            if (err) {
                throw new Error("Something went wrong!")
            }
            if (result) {
                res.status(200).json({ success: true, user:user[0], token: await generatejwtToken(user[0].id, user[0].name), message: "User Login successfully" })
            } else {
                return res.status(401).send("User not authorized");
            }

        })

    } catch (error) {
        res.status(500).json(error.message)
    }
}


const getUserById=async(req,res)=>{
    const {id}=req.params;
    try {
        const user=await userModel.findByPk(id);
        if(!user){
            res.status(404).json({success:false,message:"User not exist"});

        }
        const isFollow=await FollowerModel.findOne({
            where:{
                followerId:req.user.id,
                followingId:id
            }
        });
           const result={...user.toJSON(),isFollow:isFollow?true:false}
           res.status(200).json({success:true,message:"user fetch successfully",user:result})
        
    } catch (error) {
            res.status(500).json({success:false,message:"SOMETHING WENT WRONG!"});
        
    }
}

const getUsers=async(req,res)=>{
    const {search}=req.query;
    const {page,limit}=req.query;
   const pageNumber = parseInt(req.query.page) || 1;
   const limits = parseInt(req.query.limit) || 12;
   const offset = (pageNumber - 1) * limits;
    try {
          const userWhere = {};
          if (search) {
                userWhere[Op.or] = [
                    {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                    },
                    {
                    email: {
                        [Op.like]: `%${search}%`,
                    },
                    },
                     {
                    mobile: {
                        [Op.like]: `%${search}%`,
                    },
                    },
                    
                ];
                }
        
        const loginUserId=req.user?.id;
        const user=await userModel.findAndCountAll(
            {where:{
                ...userWhere,
                id: {
                [Op.ne]:loginUserId 
                },
                role:{
                    [Op.ne]:"admin"
                }

            },
            limit:limits,
            offset:offset,
            order:[["createdAt","Desc"]]
        });
        if(!user){
            res.status(404).json({success:false,message:"User not exist"});

        }
        const followingUser=await FollowerModel.findAll({
            where:{
                followerId:loginUserId
            }
        });
        const followingIds=followingUser.map(item=>item.followingId)
        const result=user?.rows?.map(item=>{
            return {...item.toJSON(),isFollow:followingIds.includes(item.id)}
        });
           res.status(200).json({success:true,message:"users fetch successfully",result,count:user?.count})
        
    } catch (error) {        
            res.status(500).json({success:false,message:error.message});
        
    }
}


const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {  name, email, profilePic, age, mobile, dob, gender, country, role, password,isBlock} = req.body;       
        const user = await userModel.findByPk(id);
       
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;
        user.age = age || user.age;
        user.mobile = mobile || user.mobile;
        user.dob = dob || user.dob;
        user.gender = gender || user.gender;
        user.country = country || user.country;
        if(role && req.user.role=="admin"){
          user.role = role ;

        }
        if(isBlock != undefined && req.user.role=="admin"){
           user.isBlock = isBlock 

        }
       
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
        }
        await user.save();
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });


    } catch (error) {
       res.status(500).json({success:false,message:"SOMETHING WENT WRONG!"});


    }
}


const deleteUser=async(req,res)=>{
    const {id}=req.params;
    try {
        const resposne=await userModel.destroy({where:{id:id}});
         if(resposne==1){
           res.status(200).json({success:true,message:"User Deleted Successfully"}) 
         }else{
           res.status(400).json({success:false,message:"User Deleted unsuccessfull"}) 

         }
        
    } catch (error) {
           res.status(500).json({success:false,message:"User Deleted unsuccessfull"})   
    }
}


module.exports={
    signUp,
    logIn,
    getUserById,
    getUsers,
    updateUser,
    deleteUser
}