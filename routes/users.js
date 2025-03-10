const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Copy the code here
  const email = req.params.email;
  let requested_email = users.filter((user) => user.email === email);
  res.send(requested_email);
});
//Get by specific last name: Retrieve all users with same last name
router.get("/:lastName", (req, res) =>{
    const lastName = req.params.lastName;
    let requested_lastName = users.filter((user) => user.lastName === lastName);
    res.send(requested_lastName);
})

//formatting the output
router.get("/",(req,res) => {
    res.send(JSON.stringify({users},null,4));
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  users.push({"firstName":req.query.firstName, "lastName": req.query.lastName, "email": req.query.email, "DOB": req.query.DOB});
  res.send("The user " + (req.query.firstName) + (' ') + (req.query.lastName) + (' ') + "has been added.");

});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
        const email = req.params.email;
        let filtered_users = users.filter((user) => user.email === email);
        if (filtered_users.length > 0) {
            let filtered_user = filtered_users[0];
            let DOB = req.query.DOB;
            let firstName = req.query.firstName;
            let lastName = req.query.lastName;
            //if the DOB has changed
            if(DOB) {
                filtered_user.DOB = DOB
            }
            //if the firstName has changed
            if(firstName) {
                filtered_user.firstName = firstName
            }
            //if the lastName has changed
            if(lastName) {
                filtered_user.lastName = lastName
            }
            users = users.filter((user) => user.email != email);
            users.push(filtered_user);
            res.send(`User with the email  ${email} updated.`);
        }
        else{
            res.send("Unable to find user!");
        }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email  ${email} deleted.`);

});

module.exports=router;
