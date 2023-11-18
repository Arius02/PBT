 const getRecords= (recordType:string)=>{
  // check if PBT is null or not , if null make an empty object
  const records = JSON.parse(localStorage.getItem("PBT") || "{}");
  return records[recordType];
}

export default getRecords;