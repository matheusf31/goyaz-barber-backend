const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Thiago',
          email: 'thiago@gmail.com',
          password_hash: bcrypt.hashSync('123456', 8),
          provider: true,
          banned: false,
          phone: '6293961282',
          admin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
