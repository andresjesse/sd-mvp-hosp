export type HasherError = {
    ok: false,
    errorMessage: string
}

export type HashResponse = {
    hashedInput: string
}

export type CompareResponse = {
    isSameInput: Boolean
}

interface Hasher {
    hashAsync(toHashInput : String): Promise<HasherError | HashResponse>;
    compareAsync(unhashedInput: String, hashForComparison: String): Promise<HasherError | CompareResponse>;
}

export default Hasher;