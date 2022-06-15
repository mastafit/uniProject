const e = require("express");
const connection = require("./database/connection.js");
const userQueries = require("./queries/userqueries.js");
const locationQueries = require("./queries/locationqueries.js");
const weatherQueries = require("./queries/weatherqueries.js");

exports.findUser = (emailOrNickname, password) => {
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(
      userQueries.findUserByCredentials(emailOrNickname, password),
      (err, res, fields) => {
        if (err) {
          reject(err);
          return conn.destroy();
        }
        resolve(res[0]);
        return conn.destroy();
      }
    );
  });
};
exports.createUser = (name,surname,email,phoneNumber)=>{
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(
      userQueries.CreateNewUser(name,surname,email,phoneNumber),
      (err, res, fields) => {
        if (err) {
          reject(err);
          return conn.destroy();
        }
        resolve(res.insertId);
        return conn.destroy();
      }
    );
  });
}
exports.createPersonalAccount = (userID,birthdate,age,nickname,password)=>{
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(
      userQueries.createNewPersonalAccount(userID,birthdate,age,nickname,password),
      (err, res, fields) => {
        if (err) {
          reject(err);
          return conn.destroy();
        }
        resolve(res.insertId);
        return conn.destroy();
      }
    );
  });
}
exports.addUserCity = (userID,cityID)=>{
  const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ').split(" ")[0]; 
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(
      userQueries.addUserLocation(userID,cityID,dateNow),
      (err, res, fields) => {
        if (err) {
          reject(err);
          return conn.destroy();
        }
        resolve(res.insertId);
        return conn.destroy();
      }
    );
  });
}
exports.getUserProfile = (emailOrNickname) => {
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(
      userQueries.getProfileInfo(emailOrNickname),
      (err, res, fields) => {
        if (err) {
          reject(err);
          return conn.destroy();
        }
        resolve(res[0]);
        return conn.destroy();
      }
    );
  });
};
exports.getUserMeasuring = (id) => {
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(userQueries.getUserMeasuring(id), (err, res, fields) => {
      if (err) {
        reject(err);
        return conn.destroy();
      }
      resolve(res);
      return conn.destroy();
    });
  });
};
exports.getUserLocation = (id) => {
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(userQueries.getUserLocation(id), (err, res, fields) => {
      if (err) {
        reject(err);
        return conn.destroy();
      }
      resolve(res[0]);
      return conn.destroy();
    });
  });
};
exports.getWeatherByCity = (cityName) => {
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(
      weatherQueries.getWeatherByCity(cityName),
      (err, res, fields) => {
        if (err) {
          reject(err);
          return conn.destroy();
        }
        resolve(res);
        return conn.destroy();
      }
    );
  });
};
exports.getCountries = () => {
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(locationQueries.getAllCountries(), (err, res, fields) => {
      if (err) {
        reject(err);
        return conn.destroy();
      }
      resolve(res);
      return conn.destroy();
    });
  });
};
exports.getCountryCities = (countryID) => {
  return new Promise((resolve, reject) => {
    let conn = connection();
    conn.query(
      locationQueries.getCountryCities(countryID),
      (err, res, fields) => {
        if (err) {
          reject(err);
          return conn.destroy();
        }
        resolve(res);
        return conn.destroy();
      }
    );
  });
};
