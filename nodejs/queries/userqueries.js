exports.findUserByCredentials = (emailOrNickname, password) =>
  `
  select * from user u
  inner join personal_account p on p.UserID=u.UserID
  where u.email="${emailOrNickname}" and p.password="${password} "or p.Nickname = "${emailOrNickname}" and p.password="${password}"
`;

exports.getProfileInfo = (emailOrNickname) => `
select * from user u
inner join personal_account p on p.UserID=u.UserID
where u.email="${emailOrNickname}" or p.Nickname = "${emailOrNickname}"

`;

exports.getUserMeasuring = (id) => `
select u.userID, a.Attribute_name,m.unitName, m.unitDescription from user_preferences u
inner join attribute a on u.AttributeID = a.AttributeID
inner join measuring_units m on m.AttributeID = a.AttributeID
where userID=${id};
`;

exports.getUserLocation = (id) => `
select uc.UserID, c.CityID, c.Name as "City", r.CountryID as "Country" from user_city uc
inner join city c on uc.CityID = c.CityID
inner join region r on c.RegionID = r.RegionID
where userID = ${id};
`;

exports.CreateNewUser = (name,surname,email,phoneNumber)=>`
Insert into user(First_Name,Second_Name,Email,Phone_number) values (
  "${name}",
  "${surname}",
  "${email}",
  "${phoneNumber}"
)
`;
exports.createNewPersonalAccount = (userID,birthdate,age,nickname,password)=>`
Insert into personal_account(UserID, Nickname, Password,Age,Balance,BirthDate) values
(
  "${userID}",
  "${nickname}",
  "${password}",
  "${age}",
  0,
  "${birthdate}"
)
`
exports.addUserLocation = (userID, cityID,dateNow)=>`
Insert into user_city(UserID,CityID,Added_on) values
(
  "${userID}",
  (Select CityID from city where Name="${cityID}"),
  "${dateNow}"
)`