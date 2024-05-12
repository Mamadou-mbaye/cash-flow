import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
//il collegamento con il db tramite sequelize usando dotenv
const sequelize = new Sequelize(db_name, db_user, db_password, {
  dialect: "mysql",
  host: db_host,
  port: 3306,
  timezone: "+02:00",
});
//creazione del nostro model con i column e i loro tipi e definire se possono essere null
export const cash_flow = sequelize.define(
  "cash_flow",
  {
    data: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    entrata: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    uscita: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    differenza: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    hooks: {
      //difinire il valore del column differenza ogni volta che si crea un record
      beforeSave: (instance) => {
        if (instance.entrata !== null && instance.uscita !== null) {
          instance.differenza = instance.entrata - instance.uscita;
        }
      },
      //difinire il valore del column differenza ogni volta che si aggiorna un record
      beforeUpdate: (instance) => {
        if (instance.changed("entrata") && instance.changed("uscita")) {
          instance.differenza = instance.entrata - instance.uscita;
        }
      },
    },
  }
);

//estabilire la connessione con il db
export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database has been succesfully connected");
    await cash_flow.sync();
  } catch (error) {
    console.log("failed to connect to the Database");
  }
};
