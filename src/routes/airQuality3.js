const express = require("express");
const airQuality = require("express").Router();
airQuality.use(express.json());
// searchparameters
const {
  airQualityCallback,
  airQualityPromises,
} = require("../controllers/airQualityControllers");

// this endpoint is for callback

airQuality.get("/:cityName/callback", (req, res) => {
  let city = req.params.cityName;
  let url = `https://api.openaq.org/v2/latest?city=${city}`;
  let options = {
    method: "GET",
  };
  airQualityCallback(url, options, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      //   console.log("888888888888888888");
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ data: data });
    }
  });
});

airQuality.get("/:cityName/promises", (req, res) => {
  let city = req.params.cityName;
  let url = `https://api.openaq.org/v2/latest?city=${city}`;
  let options = {
    method: "GET",
  };
  airQualityPromises(url, options)
    .then((response) => {
      console.log("res", response);
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      console.log("888888888888888", err);
      res.status(500).json({ error: err });
    });
});

airQuality.get("/:cityName/asyncAwait", async (req, res) => {
  let city = req.params.cityName;
  let url = `https://api.openaq.org/v2/latest?city=${city}`;
  let options = {
    method: "GET",
  };
  try {
    const response = await airQualityPromises(url, options);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//ex we deliver to postman a letter it go to chennai to delhi
//we need the response there is no direct way TN->AP->TG->DL
// Now for response we need to wait and it is dependent whether it is deleveried or not data or error
//callbackhell
// in call back you can see the code flow going to the right
// if you want changes need to do it will confuse
airQuality.get("/callbackHell", (req, res) => {
  // let city = req.params.cityName;
  let page = 1;
  let url = `https://api.openaq.org/v2/latest?page=${page}`;
  let options = {
    method: "GET",
  };
  let data = [];
  airQualityCallback(url, options, (err, response1) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      page = page + 1;
      url = `https://api.openaq.org/v2/latest?page=${page}`;
      airQualityCallback(url, options, (err, response2) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          page = page + 1;
          url = `https://api.openaq.org/v2/latest?page=${page}`;
          airQualityCallback(url, options, (err, response3) => {
            if (err) {
              return res.status(500).json({ error: err });
            } else {
              data.push(response1);
              data.push(response2);
              data.push(response3);
              res.setHeader("Content-Type", "application/json");
              res.status(200).json({ data: data });
            }
          });
        }
      });
    }
  });
});

//callbackhell with asyncawait
//with code is clean to see
//general we will think it is syncoronus but in event loop it is asyncoronus
airQuality.get("/asyncAwait", async (req, res) => {
  try {
    let page = 1;
    let data = [];
    let url = `https://api.openaq.org/v2/latest?page=${page}`;
    let options = {
      method: "GET",
    };
    const response1 = await airQualityPromises(url, options);
    console.log("ress", response1);
    page = page + 1;
    url = `https://api.openaq.org/v2/latest?page=${page}`;
    const response2 = await airQualityPromises(url, options);
    page = page + 1;
    url = `https://api.openaq.org/v2/latest?page=${page}`;
    const response3 = await airQualityPromises(url, options);
    data.push(response1);
    data.push(response2);
    data.push(response3);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
//parallel delivery TN-> AP, TN-> TG, TN->KA
//all should pass we there is no dependt each other
//if any one is fail go to the catch
//it retrive data very fast compare to callback hell
airQuality.get("/promiseAll", async (req, res) => {
  let url1 = `https://api.openaq.org/v2/latest?page=${1}`;
  let url2 = `https://api.openaq.org/v2/latest?page=${2}`;
  let url3 = `https://api.openaq.org/v2/latest?page=${3}`;
  let options = {
    method: "GET",
  };
  Promise.all([
    airQualityPromises(url1, options),
    airQualityPromises(url2, options),
    airQualityPromises(url3, options),
  ])
    .then((response) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//it will retrive the data which is  resolve or reject fast
//getting data fast first it return those data
airQuality.get("/promiseRace", async (req, res) => {
  let url1 = `https://api.openaq.org/v2/latest?page=${1}`;
  let url2 = `https://api.openaq.org/v2/latest?page=${2}`;
  let url3 = `https://api.openaq.org/v2/latest?page=${3}`;
  let options = {
    method: "GET",
  };
  Promise.race([
    airQualityPromises(url1, options),
    airQualityPromises(url2, options),
    airQualityPromises(url3, options),
  ])
    .then((response) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
module.exports = airQuality;
