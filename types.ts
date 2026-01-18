
export interface BankRate {
  bankName: string;
  code: string;
  rates: {
    [key: string]: number; // key format: '1M', '2M', '3M', '6M', '12M', '13M'
  };
  lastUpdated: string;
}

export type Term = '1M' | '2M' | '3M' | '6M' | '12M' | '13M';

export const TERMS: Term[] = ['1M', '2M', '3M', '6M', '12M', '13M'];

export const TERM_LABELS: Record<Term, string> = {
  '1M': '1 Tháng',
  '2M': '2 Tháng',
  '3M': '3 Tháng',
  '6M': '6 Tháng',
  '12M': '12 Tháng',
  '13M': '13 Tháng',
};

export interface GroundingSource {
  title: string;
  uri: string;
}
