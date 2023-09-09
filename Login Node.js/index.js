import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import session from 'express-session'; // Import express-session

const app = express();
const port = 3000;

app.use('/public', express.static('public'));
app.use('/images', express.static('images'));
app.use('/scripts', express.static('scripts'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: '1234', // Change this to a strong, random secret
  resave: false,
  saveUninitialized: true,
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_login'
})

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected")
    }
})

/* signin */
app.get("/", (req, res) => {
    res.render("signin.ejs");
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            return;
        }
        if (results.length > 0) {
            console.log("User found!")
            const user = results[0]; // Assuming the user's data is stored in the "results" array

            // Store user data in the session
            req.session.user = user;

            res.render("mainshop.ejs", { user });
        } else {
            console.log("No user found!")
            return res.send("No such user found.");
        }
    });
});
/* signin */

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

/* signup */
app.get("/signup", (req, res) => {
    res.render("signup.ejs")
});

app.post("/submit", (req, res) => {
    const { fName, lName, email, password } = req.body;

    // Check if email already exists in the database
    db.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.log(error);
            return res.send("Error checking email.");
        }

        if (results.length > 0) {
            // Email already exists, send an error response
            return res.send("Email already registered.");
        }

        // Email doesn't exist, proceed with inserting the user
        const newUser = {
            name: fName + " " + lName,
            email: email,
            password: password
        };

        db.query("INSERT INTO users SET ?", newUser, (insertError, result) => {
            if (insertError) {
                console.log(insertError);
                return res.send("Error inserting data.");
            }

            console.log("User registered successfully.");
            res.redirect("/");
        });
    });
});
/* signup */

/* logout */
app.post("/logout", (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
        // Redirect the user to the login page or any other appropriate page after logout
        res.redirect("/");
    });
});
/* logout */

/* /phones */
app.get("/phones", (req, res) => {
    // Retrieve user data from the session
    const user = req.session.user;
    
    // Check if the user is logged in
    if (!user) {
        return res.redirect("/"); // Redirect to the login page if the user is not logged in
    }

    res.render("phones.ejs", { user });
});

app.post("/phones", (req, res) => {
    // Retrieve user data from the session
    const user = req.session.user;
   
    // Check if the user is logged in
    if (!user) {
        return res.redirect("/"); // Redirect to the login page if the user is not logged in
    }
    res.render("mainshop.ejs", { user });
});
/* /phones */

/* tablets */
app.get("/tablets", (req, res) => {
     const user = req.session.user;
     
    if (!user) {
        return res.redirect("/"); 
    } 
    res.render("tablets.ejs", { user });
});

app.post("/tablets", (req, res) => {
    const user = req.session.user;
    
    if (!user) {
        return res.redirect("/"); 
    }
    res.render("mainshop.ejs", { user });
});
/* tablets */

/* laptops */
app.get("/laptops", (req, res) => {
    const user = req.session.user;
    
   if (!user) {
       return res.redirect("/"); 
   } 
   res.render("laptops.ejs", { user });
});

app.post("/laptops", (req, res) => {
   const user = req.session.user;
   
   if (!user) {
       return res.redirect("/"); 
   }
   res.render("mainshop.ejs", { user });
});
/* laptops */

/* Accesories */
app.get("/acc", (req, res) => {
    const user = req.session.user;
    
   if (!user) {
       return res.redirect("/"); 
   } 
   res.render("acc.ejs", { user });
});

app.post("/acc", (req, res) => {
   const user = req.session.user;
   
   if (!user) {
       return res.redirect("/"); 
   }
   res.render("mainshop.ejs", { user });
});
/* Accesories */
app.get("/acc", (req, res) => {
    const user = req.session.user;
    
   if (!user) {
       return res.redirect("/"); 
   } 
   res.render("acc.ejs", { user });
});

app.post("/acc", (req, res) => {
   const user = req.session.user;
   
   if (!user) {
       return res.redirect("/"); 
   }
   res.render("mainshop.ejs", { user });
});
/* Accesories */
app.get("/sales", (req, res) => {
    const user = req.session.user;
    
   if (!user) {
       return res.redirect("/"); 
   } 
   res.render("sales.ejs", { user });
});

app.post("/sales", (req, res) => {
   const user = req.session.user;
   
   if (!user) {
       return res.redirect("/"); 
   }
   res.render("mainshop.ejs", { user });
});
/* Accesories */

/* buying */
app.post("/buy-phone", (req, res) => {
    // Retrieve user data from the session
    const user = req.session.user;
    
    // Check if the user is logged in
    if (!user) {
        return res.redirect("/"); // Redirect to the login page if the user is not logged in
    }

    // Read the ID from the hidden input field
    const phoneIdToRemove = req.body.phoneId;

    // Decrement the quantity of the phone in the database
    db.query("UPDATE phones SET quantity = quantity - 1 WHERE id = ?", [phoneIdToRemove], (error, result) => {
        if (error) {
            console.log(error);
            return res.send("Error updating phone quantity.");
        }

        console.log("Phone quantity decremented successfully.");
        res.redirect("/phones"); // Redirect to the phones page or any other appropriate page
    });
});
app.post("/buy-tablet", (req, res) => {
    // Retrieve user data from the session
    const user = req.session.user;
    
    // Check if the user is logged in
    if (!user) {
        return res.redirect("/"); // Redirect to the login page if the user is not logged in
    }

    // Read the ID from the hidden input field
    const phoneIdToRemove = req.body.phoneId;

    // Decrement the quantity of the phone in the database
    db.query("UPDATE phones SET quantity = quantity - 1 WHERE id = ?", [phoneIdToRemove], (error, result) => {
        if (error) {
            console.log(error);
            return res.send("Error updating phone quantity.");
        }

        console.log("Phone quantity decremented successfully.");
        res.redirect("/tablets"); // Redirect to the phones page or any other appropriate page
    });
});
app.post("/buy-laptop", (req, res) => {
    // Retrieve user data from the session
    const user = req.session.user;
    
    // Check if the user is logged in
    if (!user) {
        return res.redirect("/"); // Redirect to the login page if the user is not logged in
    }

    // Read the ID from the hidden input field
    const phoneIdToRemove = req.body.phoneId;

    // Decrement the quantity of the phone in the database
    db.query("UPDATE phones SET quantity = quantity - 1 WHERE id = ?", [phoneIdToRemove], (error, result) => {
        if (error) {
            console.log(error);
            return res.send("Error updating phone quantity.");
        }

        console.log("Phone quantity decremented successfully.");
        res.redirect("/laptops"); // Redirect to the phones page or any other appropriate page
    });
});
app.post("/buy-acc", (req, res) => {
    // Retrieve user data from the session
    const user = req.session.user;
    
    // Check if the user is logged in
    if (!user) {
        return res.redirect("/"); // Redirect to the login page if the user is not logged in
    }

    // Read the ID from the hidden input field
    const phoneIdToRemove = req.body.phoneId;

    // Decrement the quantity of the phone in the database
    db.query("UPDATE phones SET quantity = quantity - 1 WHERE id = ?", [phoneIdToRemove], (error, result) => {
        if (error) {
            console.log(error);
            return res.send("Error updating phone quantity.");
        }

        console.log("Phone quantity decremented successfully.");
        res.redirect("/acc"); // Redirect to the phones page or any other appropriate page
    });
});
/* buying */