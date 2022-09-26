export type THasherError = {
  ok: false;
  errorMessage: string;
};

export type THashResponse = {
  ok: true;
  hashedInput: string;
};

export type TCompareResponse = {
  ok: true;
  isSameInput: Boolean;
};

interface IHasher {
  hashAsync(toHashInput: String): Promise<THasherError | THashResponse>;
  compareAsync(
    unhashedInput: String,
    hashForComparison: String
  ): Promise<THasherError | TCompareResponse>;
}

export default IHasher;
