const express = require("express");
const router = express.Router();
const url = require("url");

let members = [
    { name: "user0", age: 18, height: "6ft" },
    { name: "user1", age: 18, height: "6ft" },
    { name: "user2", age: 17, height: "6ft" },
    { name: "user3", age: 13, height: "5ft" },
    { name: "user4", age: 20, height: "5ft" },
];
router.get("/members", (req, res) => {
    res.json(members);
});
router.get("/members/:id", (req, res) => {
    if (members.length - 1 < req.params.id ) {
        res.send("<h2> member not found </h2>");
    } 
    else if (members[parseInt(req.params.id)] == null) {
        res.send('member has been deleted')
    }
    else {
        res.status(200);
        res.json(members[req.params.id]);
    }
});
router.get("/search", (req, res) => {
    let searched = members.filter((value) => {
        return value.name == req.query.name;
    });
    if (searched.length == 0) {
        res.status(400);
        res.send("not founddd");
    } else {
        res.json(searched);
    }
});
router.get("/searchapi", (req, res) => {
    let searchedApi = members.filter((value) => {
        for (let i = 0; i < req.query.name.split("").length; i++) {
            return value.name.split("")[i] == req.query.name.split("")[i];
        }
    });
    if (searchedApi.length == 0) {
        res.send("not founddd");
    } else {
        res.json(searchedApi);
    }
});

router.post("/members", (req, res) => {
    let datta = req.body;
    members.push(datta);
    res.status(200);
    res.json(members);
});

router.put("/members/:id", (req, res) => {
    if (members.length - 1 < req.params.id) {
        res.send("<h2> member not found </h2>");
    } else {
        let updated = req.body
        members[Number(req.params.id)] = updated
        res.json(members)       
    }
});

router.delete("/members/:id", (req, res) => {
    let updated = members.filter((value) => {
        return value != req.params.id;
    });
    if (members.length - 1 < req.params.id) {
        res.send("<h2> member not found </h2>");
    } else {    
        delete(members[parseInt(req.params.id)])
        res.status(200)
        setTimeout(() => {
            res.json(updated)
        console.log(updated)
        }, 5000);
    }
});
module.exports = router;
