import Hasher, {
  TCompareResponse,
  THasherError,
  THashResponse,
} from "./HasherTypes";
import bcrypt from "bcryptjs";

const bcryptjshasher: Hasher = {
  async hashAsync(toHashInput: string): Promise<THasherError | THashResponse> {
    try {
      if (process.env.BCRYPT_HASH_ROUNDS == undefined)
        throw new Error("BCRYPT_HASH_ROUNDS does not exist in .env!");

      const hashedInput: string = await bcrypt.hash(
        toHashInput,
        parseInt(process.env.BCRYPT_HASH_ROUNDS || "")
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
