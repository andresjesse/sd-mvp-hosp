import bcryptHasher from "../../impl/BcryptjsHasher";
import HasherError from '../../errors/HasherError';
import Hasher, { CompareResponse, HashResponse } from '../../interfaces/Hasher';

test('CompareAsync_OnSameInput_ReturnsTrue', async () => {
  // Arrange
  const hasher: Hasher = new bcryptHasher();
  const inputTest = "p@ssw0rd";
  const hashResponse: HasherError | HashResponse = await hasher.hashAsync(inputTest);
  const hashedInput: string = (hashResponse as HashResponse).hashedInput;

  // Act
  const compareResponse: HasherError | CompareResponse = await hasher.compareAsync(inputTest, hashedInput);

  // Assert
  expect((compareResponse as CompareResponse).isSameInput).toBeTruthy();
});

test('CompareAsync_OnDiff_ReturnsFalse', async () => {
  // Arrange
  const hasher: Hasher = new bcryptHasher();
  const inputTest = "p@ssw0rd";
  const divergentInput = "password";
  const hashResponse: HasherError | HashResponse = await hasher.hashAsync(inputTest);
  const hashedInput: string = (hashResponse as HashResponse).hashedInput;

  // Act
  const compareResponse: HasherError | CompareResponse = await hasher.compareAsync(divergentInput, hashedInput);

  // Assert
  expect((compareResponse as CompareResponse).isSameInput).toBeFalsy();
});

test('CompareAsync_OnNonHashedArg_ReturnsFalse', async () => {
  // Arrange
  const hasher: Hasher = new bcryptHasher();
  const inputTest = "p@ssw0rd";

  // Act
  const compareResponse: HasherError | CompareResponse = await hasher.compareAsync(inputTest, inputTest);

  // Assert
  expect((compareResponse as CompareResponse).isSameInput).toBeFalsy();
});