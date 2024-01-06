export function generateAddress(
  Address: { City: string; State: string; Country: string; Street: string }[]
): string {
  if (Address && Address.length > 0) {
    const firstAddress = Address[0];
    return `${firstAddress.Country} ${firstAddress.State} ${firstAddress.City} ${firstAddress.Street}`;
  }
  return '';
}
export function generateGUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
