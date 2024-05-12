import {
  createRecord,
  getRecord,
  udpateRecord,
  deleteRecord,
  clearRecords,
} from "../services/user.service.js";
//prendere la richiesta poi una volta creato il record mandere un feedback per dire che il record è stato creato
export const createRecordController = async (req, res) => {
  const { data, entrata, uscita } = req.body;
  const record = await createRecord(data, entrata, uscita);
  res.send({ message: "Record creato", record });
};
//prendere la richiesta e tornare il record
export const getRecordController = async (req, res) => {
  const id = req.params.id;
  const record = await getRecord(Number(id));
  //verificare se il record esiste nel db
  if (record) {
    res.send({ message: "Record trovato", record });
  } else {
    res.send({ message: "Record non trovato" });
  }
};
//prendere la richiesta e tornare il record aggiornato
export const udpateRecordController = async (req, res) => {
  const id = req.params.id;
  const newEntrata = req.body.newEntrata;
  const newUscita = req.body.newUscita;
  await udpateRecord(id, newEntrata, newUscita);

  const record = await getRecord(Number(id));
  //verificare se il record esiste nel db
  if (record) {
    //verificare se la richiesta non è vuota
    if (!newEntrata && !newUscita) {
      res
        .status(400)
        .send({ message: "Errore durante l'inserimento dei parametri" });
      return;
    }

    res.send({ message: "Record aggiornato", record });
  } else {
    res.send({ message: "Record non trovato" });
  }
};
//cancellare un record
export const deleteRecordController = async (req, res) => {
  const id = req.params.id;
  const record = await getRecord(Number(id));
  //verificare se il record esiste nel db
  if (record) {
    await deleteRecord(Number(id));
    res.send({ message: "Record cancellato" });
  } else {
    res.send({ message: "Record non trovato" });
  }
};
//pulire il model cancellando tutti i record
export const clearRecordsController = async (req, res) => {
  await clearRecords();
  res.send({ message: "tabella pulito" });
};
