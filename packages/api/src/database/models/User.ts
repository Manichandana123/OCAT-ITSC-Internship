import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class User extends Model<
InferAttributes<User>,
InferCreationAttributes<User>
> {
  declare public id: CreationOptional<number>;
  declare public firstName: string;
  declare public lastName: string;
  declare public username: string;
  declare public password: string;
  declare public isSupervisor: boolean;
  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  declare public deletedAt: Date | null;

  public static initModel(sequelize: Sequelize): typeof User {
    User.init({
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        autoIncrementIdentity: true,
        field: `id`,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      isSupervisor: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },

      /* eslint-enable sort-keys */
    }, {
      sequelize,
    });

    return User;
  }
}
