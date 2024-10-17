export const transformContentArrayToObject = (contentArray: any[]) => {
  const contentObject: { [key: string]: any } = {};

  contentArray.forEach((item) => {
    if (item.type && item.data) {
      contentObject[item.type] = item.data;
    }
  });

  return contentObject;
};
