const {Sequelize}=require("sequelize");





const sequelize=new Sequelize("food_recipe","root","Himesh1999@",{
    host:"localhost",
    dialect:"mysql"
});






(async ()=>{
   try {
     await sequelize.authenticate();
     console.log("Database connected successfully");
     
   } catch (error) {
     console.log("Database connected Failed");
    
   }

})();


module.exports=sequelize





