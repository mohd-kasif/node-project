const { default: axios } = require("axios")
const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const bcrypt = require('bcrypt');
app.use(express.json())
const cors = require("cors")
const port = process.env.PORT || 8000
const db = require("./models");

const { AddressDetail } = require("./models")
const { ProfessionDetail } = require("./models");
const { User } = require("./models")
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))


// Connecting databse
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "users",
//     password: process.env.password
// })
// connection.connect((err) => {
//     if (err) throw err;
//     console.log("database connected")

// })
db.sequelize.sync().then((result) => {
    app.listen(port, () => {
        console.log(`Sever is running on ${port}`)
    })
}).catch((err) => {
    console.log("error connecting localhost", err)
});


app.get("/address", (req, res) => {
    AddressDetail.create({
        line1: "Purana Kuan",
        line2: "Raja ka Tajpur",
        pincode: "246735",
        state: "U.P"
    })
    res.send("address successfully added")
})
app.get("/personal_details", (req, res) => {
    console.log(PersonalDetail, "personal detail")
    PersonalDetail.create({
        name: "mohd kashif",
        age: 24,
        dob: Date(),
        mother_name: "roshan jahan",
        father_name: "jameel ahmed"
    })
    // res.send(PersonalDetail.json)
    // console.log(PersonlaDetaill, "personal detail model")
    // res.send(PersonlaDetaill)
})
const savePasswordToDatabse = (email, password) => {
    User.create({
        email: email,
        password: password
    })
}

app.post("/signup", (req, res) => {
    let email = req.body.email
    let password = req.body.password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            savePasswordToDatabse(email, hash)
            res.send("user created successfully")
        })
    })
})
app.get("/find", (req, res) => {
    AddressDetail.findAll().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err, "erro during finding address detail")
    })
})
app.get("/profession", (req, res) => {
    ProfessionDetail.create({
        profession: "Software Engineer",
        salaryRange: "3000",
        experience: 2
    })
})
const getDate = async () => {
    try {
        const response = await axios.get("https://worldtimeapi.org/api/ip")
        const iso_date = new Date(response.data.utc_datetime)

        const full_year = iso_date.getFullYear()
        const month = iso_date.getMonth() + 1
        const day = iso_date.getDate()

        return `${day}-${month}-${full_year}`


    } catch (err) {
        console.log(err, "error in time request")
    }
}

const catFact = async () => {
    try {
        // const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
        const response = await axios.get("https://www.boredapi.com/api/activity")
        console.log(response.data, "cat fact data")
        return response.data


    } catch (err) {
        console.log(err, "error in cat request")
    }
}

app.get("/get_date", async (req, res) => {
    try {
        const gettime = await getDate()
        res.send({ current_date: gettime })
    } catch (err) {
        res.send({ error: "Error" })
    }
})

const uploadVideo = async (url) => {
    try {
        const response = await axios.get(`https://doodapi.com/api/upload/url?key=${process.env.doodstream_key}&url=${url}`)
        return response.data
    } catch (err) {
        return err
    }
}

app.get("/upload_video", async (req, res) => {
    const url = req.body.url
    try {
        const response = await uploadVideo(url)
        res.send(response)
    } catch (err) {
        res.send(err)
    }

})

const getNationality = async (name) => {
    try {
        const response = await axios.get(`https://api.nationalize.io/?name=${name}`)
        return response.data
    } catch (err) {
        return err
    }
}
app.get("/random_nationality", async (req, res) => {
    const name = req.body.name
    try {
        const response = await getNationality(name)
        res.send(response)
    } catch (err) {
        res.send({ error: "Error" })
    }
})

app.get("/cat_fact", async (req, res) => {
    try {
        const response = await catFact()
        res.send(response)
    }
    catch (err) {

    }

})


const saveData = (name, pass) => {
    const sql = `INSERT INTO user_info (name, password) VALUES (?, ?)`;
    connection.query(sql, [name, pass], (err, result) => {
        if (err) {
            console.log(err, "erorr in saving")
            return

        }
        else {
            console.log("data saved")
        }
    })
}

const encryptPassword = (name, pass) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pass, salt, (err, hash) => {
            saveData(name, hash)
        })
    })
}
app.post("/save_usename", (req, res) => {
    const { name, password } = req.body
    encryptPassword(name, password)
    res.send({
        "name": name,
        "password": password
    })
    try {

    } catch (err) {

    }
})

// Listening on port
// app.listen(port, () => {
//     console.log(`Sever is running on ${port}`)
// })