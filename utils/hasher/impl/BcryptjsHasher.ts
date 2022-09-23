import Hasher, { CompareResponse, HashResponse } from "../interfaces/Hasher";
import bcrypt from "bcryptjs";
import BcryptConfig from "../config/BcryptConfig";
import HasherError from "../errors/HasherError";

class BcryptjsHasher implements Hasher {

    MethodExceptionMessages = {
        HASH_ASYNC_EXCEPTION: "Unexpected error happened at 'BCryptHasher.hashAsync' call.",
        COMPARE_ASYNC_EXCEPTION: "Unexpected error happened at 'BCryptHasher.compareAsync' call.",
        UNEXPECTED_ERROR_TYPE_MESSAGE: "Unable to collect proper error message."
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