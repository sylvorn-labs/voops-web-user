export interface ResendTimerProps {
  email: string;
  onMessage?: (msg: { type: 'success' | 'error'; text: string }) => void;
}
