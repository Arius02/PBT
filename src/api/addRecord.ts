const addRecord=(recordType:string,payload:RecordType)=>{
    // check if PBT is null or not , if null make an empty object
    const records=JSON.parse(localStorage.getItem("PBT")||'{}')

    // check if the the record is exist or not , if not make it an array to be itterable
    if(!records[recordType]) records[recordType]=[]
    // add an id to the record to dispaly it mui gird data
    const id=records[recordType].slice(0,1)[0]?.id+1||1
    records[recordType] = [{ ...payload, id }, ...records[recordType]];

    // save data in local storage
    localStorage.setItem('PBT',JSON.stringify(records))
}

export const addIncomeRecord= (payload:RecordType)=>{
   addRecord('income',payload)
}
export const addExpenseRecord= (payload:RecordType)=>{
    addRecord('expense',payload)  
}