export const parseFragment = (parsedDoc: any): string => {
  return parsedDoc.loc.source.body.replace(
    /fragment [_A-Za-z][_0-9A-Za-z]*/,
    '...',
  );
};
