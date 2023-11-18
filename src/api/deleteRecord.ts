const deleteRecord = (recordType: string, id: number) => {
  // check if PBT is null or not , if null make an empty object
  const records = JSON.parse(localStorage.getItem("PBT") || "{}");
  // check if the the record is exist or not.
  if (
    !records[recordType] ||
    !records[recordType].find((item: any) => item.id == id)
  ) {
    console.log("Record not found");
    return false;
  }
  // delete record and save document
  records[recordType] = records[recordType].filter(
    (item: any) => item.id !== id
  );
  localStorage.setItem("PBT", JSON.stringify(records));
  return true;
};

export default deleteRecord;
