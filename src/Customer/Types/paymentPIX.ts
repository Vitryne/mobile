export type PixHeaderProps = { onBack: () => void };
export type PixStatusProps = {
  amount: number;
  expired: boolean;
  remainingSeconds: number;
};
export type PixQRCodeProps = { code: string; expired: boolean };
export type PixCopyCodeProps = {
  code: string;
  copied: boolean;
  expired: boolean;
  onCopy: () => void;
  onRenew: () => void;
};
