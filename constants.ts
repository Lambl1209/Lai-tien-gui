
import { BankRate } from './types';

export const BANK_LIST = [
  "Agribank Hà Tĩnh", "Agribank Hà Tĩnh II", "Vietcombank", "BIDV", "VietinBank", "Techcombank",
  "MBBank", "VPBank", "ACB", "Sacombank", "VIB",
  "HDBank", "TPBank", "SHB", "MSB", "SeABank",
  "LPBank", "Bac A Bank", "PVcomBank", "ABBANK"
];

export const INITIAL_DATA: BankRate[] = BANK_LIST.map(bank => ({
  bankName: bank,
  code: bank.replace(/\s/g, '').toUpperCase(),
  rates: {
    '1M': 1.6 + Math.random(),
    '2M': 1.6 + Math.random(),
    '3M': 1.9 + Math.random(),
    '6M': 3.0 + Math.random(),
    '12M': 4.7 + Math.random(),
    '13M': 4.8 + Math.random(),
  },
  lastUpdated: new Date().toLocaleDateString('vi-VN')
}));
