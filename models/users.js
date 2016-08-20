'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    UserName: DataTypes.STRING,
    Password: DataTypes.STRING,
    ImageLink: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};

// 'use strict';

// require('sequelize-isunique-validator')(sequelize);

// //https://www.npmjs.com/package/sequelize-isunique-validator
// module.exports = function(sequelize, DataTypes) {
//   var Users = sequelize.define('Users', {
//     FirstName: DataTypes.STRING,
//     LastName: DataTypes.STRING,
//     Email: {
//       type: DataTypes.STRING,
//       isUnique: true,
//       validate: {
//         isEmail: true,
//         isUnique: sequelize.validateIsUnique('Email')
//       }
//     }
//     UserName: {
//       type: DataTypes.STRING,
//       isUnique: true,
//       validate : {
//         isUnique: sequelize.validateIsUnique('UserName')
//       }
//     }
//     Password: DataTypes.STRING,
//     ImageLink: DataTypes.STRING
//   }, {
//     classMethods: {
//       associate: function(models) {
//         // associations can be defined here
//       }
//     }
//   });
//   return Users;
// };