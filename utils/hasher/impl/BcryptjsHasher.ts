import Hasher, { CompareResponse, HasherError, HashResponse } from "../interfaces/Hasher";
import bcrypt from "bcryptjs";
import BcryptConfig from "../config/BcryptConfig";

class BcryptjsHasher implements Hasher {

    MethodExceptionMessages = {
        HASH_ASYNC_EXCEPTION: "Unexpected error happened at 'BcryptjsHasher.hashAsync' call.",
        COMPARE_ASYNC_EXCEPTION: "Unexpected error happened at 'BcryptjsHasher.compareAsync' call.",
    } as const

    async hashAsync(toHashInput: string): Promise<HasherError | HashResponse> {
        try {
            const hashedInput: string = await bcrypt.hash(
                toHashInput, BcryptConfig.BCRYPT_HASH_ROUNDS);

            return {
                hashedInput
            }
        } catch (e) {
            const errorMessage: string = e instanceof Error ? e.message : this.MethodExceptionMessages.UNEXPECTED_ERROR_TYPE_MESSAGE;
            const error: HasherError = {
                resume: this.MethodExceptionMessages.HASH_ASYNC_EXCEPTION,
                errorMessage
            }

            return error;
        }
    }

    async compareAsync(unhashedInput: string, hashForComparison: string): Promise<HasherError | CompareResponse> {
        try {
            const isSameInput: Boolean = await bcrypt.compare(unhashedInput, hashForComparison);

            return {
                isSameInput
            }
        } catch (e) {
            const errorMessage: string = e instanceof Error ? e.message : this.MethodExceptionMessages.UNEXPECTED_ERROR_TYPE_MESSAGE;
            const error: HasherError = {
                resume: this.MethodExceptionMessages.COMPARE_ASYNC_EXCEPTION,
                errorMessage
            }

            return error;
        }
    }
}

export default BcryptjsHasher; 