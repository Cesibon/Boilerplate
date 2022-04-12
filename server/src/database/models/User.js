const {
  generateHash
} = require('@utils/hash')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username already exists!"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        console.log(value)
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        const hashedPassword = generateHash(value)
        this.setDataValue('password', hashedPassword)
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['password', 'token']
      }
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ["password"]
        }
      },
      withToken: {
        attributes: {
          include: ["token"]
        }
      }
    }
  }, {
    timestamps: false
  })

  return User
}