import bcrypt from "bcryptjs";

interface IHasher {
  hashAsync(toHashInput: String): Promise<string>;
  compareAsync(
    unhashedInput: String,
    hashForComparison: String
  ): Promise<boolean>;
}

const bcryptjshasher: IHasher = {
  async hashAsync(toHashInput: string): Promise<string> {
    if (process.env.BCRYPT_HASH_ROUNDS == undefined)
      throw new Error("BCRYPT_HASH_ROUNDS does not exist in .env!");

    return await bcrypt.hash(
      toHashInput,
      parseInt(process.env.BCRYPT_HASH_ROUNDS || "")
    );
  },
  async compareAsync(
    unhashedInput: string,
    hashForComparison: string
  ): Promise<boolean> {
    return await bcrypt.compare(unhashedInput, hashForComparison);
  },
};

export default bcryptjshasher;
