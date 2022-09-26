import Hasher, {
  TCompareResponse,
  THasherError,
  THashResponse,
} from "./HasherTypes";
import bcrypt from "bcryptjs";
import BcryptConfig from "./config/BcryptConfig";

const bcryptjshasher: Hasher = {
  async hashAsync(toHashInput: string): Promise<THasherError | THashResponse> {
    try {
      const hashedInput: string = await bcrypt.hash(
        toHashInput,
        BcryptConfig.BCRYPT_HASH_ROUNDS
      );

      return {
        ok: true,
        hashedInput,
      };
    } catch (e) {
      const HASH_ASYNC_EXCEPTION: string =
        "Unexpected error happened at 'BcryptjsHasher.hashAsync' call.";
      const errorMessage: string =
        e instanceof Error ? e.message : HASH_ASYNC_EXCEPTION;
      const error: THasherError = {
        ok: false,
        errorMessage,
      };

      return error;
    }
  },
  async compareAsync(
    unhashedInput: string,
    hashForComparison: string
  ): Promise<THasherError | TCompareResponse> {
    try {
      const isSameInput: Boolean = await bcrypt.compare(
        unhashedInput,
        hashForComparison
      );

      return {
        ok: true,
        isSameInput,
      };
    } catch (e) {
      const COMPARE_ASYNC_EXCEPTION: string =
        "Unexpected error happened at 'BcryptjsHasher.compareAsync' call.";
      const errorMessage: string =
        e instanceof Error ? e.message : COMPARE_ASYNC_EXCEPTION;
      const error: THasherError = {
        ok: false,
        errorMessage,
      };

      return error;
    }
  },
};

export default bcryptjshasher;
