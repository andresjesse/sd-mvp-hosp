import hasher from "../../impl/BcryptjsHasher";
import { CompareResponse, HasherError, HashResponse } from '../../interfaces/Hasher';

test('CompareAsync_OnSameInput_ReturnsTrue', async () => {
  // Arrange
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
  const inputTest = "p@ssw0rd";

  // Act
  const compareResponse: HasherError | CompareResponse = await hasher.compareAsync(inputTest, inputTest);

  // Assert
  expect((compareResponse as CompareResponse).isSameInput).toBeFalsy();
});