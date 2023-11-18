import dayjs from "dayjs";

export const getTotal = (selectedProp: string) => {
  // check if PBT is null or not , if null make an empty object
  const records = JSON.parse(localStorage.getItem("PBT") || "{}");
  if (!records[selectedProp]) return 0;
  return records[selectedProp].reduce((a: number, b: any) => a + b.amount, 0);
};

export const getBalence = () => {
  // check if PBT is null or not , if null make an empty object
  const records = JSON.parse(localStorage.getItem("PBT") || "{}");
  if(Object.keys(records).length==0) return 0
  const income= records.income?.reduce((a: number, b: any) => a + b.amount, 0) || 0
  const expense =records.expense?.reduce((a: number, b: any) => a + b.amount, 0)|| 0
  return (
     income-expense
  );
};

export const getTopCategories = (selectedProp: string) => {
  // check if PBT is null or not , if null make an empty object
  const records = JSON.parse(localStorage.getItem("PBT") || "{}");
  if (!records[selectedProp]) return [];

  // an empty categpory to collect each category in an array
  const categories: any = {};
  records[selectedProp].forEach((item: RecordType) => {
    const category = item.category;
    // check if there is a prop for this category if not make one with empty array and push
    if (!categories[category]) categories[category] = [];
    categories[category].push(item.amount);
  });

  const keys = Object.keys(categories);
  const values: any = [];
  // collect the value of same categories to make it possible to sort
  for (const key of keys) {
    values.push({
      name: key,
      amount: categories[key].reduce(
        (acc: number, curr: number) => acc + curr,
        0
      ),
    });
  }
  //return value top 3 categories after sort it.
  return values
    .sort((a: RecordType, b: RecordType) => b.amount - a.amount)
    .slice(0, 3);
};

export const getLatestCategories = (selectedProp: string) => {
  // check if PBT is null or not , if null make an empty object
  const records = JSON.parse(localStorage.getItem("PBT") || "{}");
  if (!records[selectedProp]) return [];
  const sortedRecords = records[selectedProp].sort(
    (a: RecordType, b: RecordType) => dayjs(b.date,"DD/MM/YYYY").toDate().getTime()-dayjs(a.date,"DD/MM/YYYY").toDate().getTime())
  return sortedRecords.slice(0, 3);
};
