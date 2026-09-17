import { TSUBOS as MASTER_TSUBOS } from "./tsubo";
import { Tsubo } from "@/types/oriental";

/**
 * 既存コンポーネント互換レイヤー
 * 実体は src/data/tsubo/index.ts から供給されます。
 */
export const TSUBOS: Tsubo[] = MASTER_TSUBOS;
