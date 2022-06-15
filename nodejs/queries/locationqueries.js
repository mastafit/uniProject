exports.getAllCountries = () => `
select * from country
`;

exports.getCountryCities = (countryID) => `
select c.Name, cr.CountryID from city c
inner join region r on r.RegionID =  c.regionID
inner join country cr on r.CountryID = r.CountryID

where cr.countryID = "${countryID}"

`;
