export function convertAttoFILtoFIL(attoFIL) {
  return attoFIL * 1e-18;
}

export function convertFILtoAttoFIL(FIL) {
  const bigFIL = BigInt(FIL);
  const bigAttoFIL = bigFIL * BigInt(1e18);
  return bigAttoFIL.toString();
}

export function convertCentsToUSD(cents) {
  return (cents / 100).toFixed(2);
}
