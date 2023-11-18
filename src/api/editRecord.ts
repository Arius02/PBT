const editRecord = (recordType: string, payload: RecordType) => {
  // check if PBT is null or not , if null make an empty object
  const records = JSON.parse(localStorage.getItem("PBT") || "{}");
  // check if the the record is exist or not.
  let itemToUpdate=records[recordType]?.find((item: any) => item.id === payload.id)
  if (!records[recordType] || !itemToUpdate) {
    console.log("Record not found");
    return false;
  }
  // update record and save document

  itemToUpdate = { ...itemToUpdate, ...payload };
  records[recordType] = records[recordType].map((item: any) => {
    if (item.id === payload.id) {
      return itemToUpdate;
    }
    return item;
  });
  localStorage.setItem("PBT", JSON.stringify(records));
  return true;
};

export default editRecord;
