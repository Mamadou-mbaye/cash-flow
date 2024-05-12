import { cash_flow } from "../models/db.js";
//creare un nuovo record
export const createRecord = (data, entrata, uscita) => {
  return cash_flow.create({ data, entrata, uscita });
};
//prendere un record dal suo id
export const getRecord = (id) => {
  return cash_flow.findOne({ where: { id } });
};
//aggiornare i dati di un record tramite id
export const udpateRecord = async (id, newEntrata, newUscita) => {
  try {
    const result = await cash_flow.update(
      { entrata: newEntrata, uscita: newUscita },
      { where: { id }, individualHooks: true }
    );
    return result;
  } catch (error) {
    console.error("Errore durante l'aggiornamento: ", error);
    throw new error();
  }
};
//cancellare un record dal suo id
export const deleteRecord = async (id) => {
  return cash_flow.destroy({ where: { id } });
};
//pulire il models cancellando tutti i records
export const clearRecords = async () => {
  return cash_flow.destroy({ where: {}, truncate: true });
};
