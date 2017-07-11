export default {
  id: 1,
  executive: 'EXECUTIVE Agencja Ochrony Mienia "Maczeta", ul. Kosynierów 6b, 12-345 Wołomin, NIP: XXX-XX-XX-XXX',
  recipient: 'RECIPIENT: Parafia św. Edwarda, ul. Biskupia 7, 12-345 Pruszków, NIP: XXX-XX-XX-XXX',
  invoiceTitle: 'Template',
  invoiceDate: 'Place and date: Wołomin 12.12.1989',
  labels: {
    nrLabel: 'Nr.',
    serviceNameLabel: 'Service name',
    amountLabel: 'Amt',
    priceNettoLabel: 'Price netto',
    valueNettoLabel: 'Value',
    valRateLabel: 'VAT',
    valValueLabel: 'VAT amount',
    vatRateValue: '-',
    fullValueLabel: 'Value'
  },
  services: [
    {
      id: 1,
      name: '',
      amount: '',
      priceNetto: '',
      vat: ''
    }
  ],
  valueInWords: 'In word: hundreds of millions',
  paymentType: 'Payment type: account transfer',
  accountNumber: 'Account number: (mbank) XX XXXX XXXX XXXX XXXX XXXX XXXX'
}
