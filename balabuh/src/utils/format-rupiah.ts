export function formatRupiah(value: number): string {
  return value
    .toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    .replace(/Rp\s+/g, 'Rp')
    .replace(/,00$/, '');
}
