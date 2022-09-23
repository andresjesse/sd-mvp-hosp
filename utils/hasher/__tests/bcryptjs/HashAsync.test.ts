import bcryptHasher from "../../impl/BcryptjsHasher";
import Hasher, {HasherError, HashResponse } from '../../interfaces/Hasher';

test('HashAsync_OnValidInput_ReturnsTransformedOutput', async () => {
  // Arrange
  const hasher: Hasher = new bcryptHasher();
  const inputTest = "p@ssw0rd";

  // Act
  const response: HasherError | HashResponse = await hasher.hashAsync(inputTest);
  
  // Assert
  const isSuccessfulResponse: Boolean = (response as HashResponse).hashedInput != undefined;
  expect(isSuccessfulResponse).toBeTruthy;

  const doOutputStringDiffersFromInput: Boolean = (response as HashResponse).hashedInput != inputTest;
  expect(doOutputStringDiffersFromInput).toBeTruthy();
});