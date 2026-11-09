/** 開宴日時（日本時間）。カウントダウン・OP・表示の唯一の情報源 */
export const EVENT_START = Date.parse("2027-01-10T18:00:00+09:00");
/** OP（あと◯日）を出すのは開催日の前日まで。残り1日を切ったら出さない */
export const OP_COUNTDOWN_END = Date.parse("2027-01-10T00:00:00+09:00");
export const OP_SESSION_KEY = "op-seen";
export const OP_REPLAY_EVENT = "op:replay";

/** 開宴までの残り日数（ヒーローのカウントダウンの DAYS と同じ数え方） */
export function daysToEvent(now = Date.now()): number {
  return Math.max(0, Math.floor((EVENT_START - now) / 86_400_000));
}

/**
 * 数字スプライト（public/op/countdown-digits.webp、5列×2行）上の位置。
 * background-size: 500% 200% と組み合わせて使う
 */
export function digitPosition(digit: string | number): string {
  const d = Number(digit);
  return `${(d % 5) * 25}% ${d > 4 ? 100 : 0}%`;
}

export const DIGITS_SRC = "/op/countdown-digits.webp";
