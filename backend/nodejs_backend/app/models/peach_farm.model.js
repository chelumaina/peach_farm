const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Farm = sequelize.define("peach_farm", {
    company_name: { type: Sequelize.STRING },
    cold_room_name: { type: Sequelize.STRING },
    cold_room_id: { type: Sequelize.INTEGER }, 
    active: { type: Sequelize.BOOLEAN },
  });

  Farm.sync({ force: true }).then(() => {
    Farm.create({
      company_name: 'Inspira Farms',
      cold_room_name:'Nairobi Farm Cold room 1',
      cold_room_id:1,
      active: true
    }); 
    Farm.create({
      company_name: 'Inspira Farms',
      cold_room_name:'Mombasa Farm Cold room 1',
      cold_room_id:2,
      active: true
    }); 
  });
  return Farm;
};


