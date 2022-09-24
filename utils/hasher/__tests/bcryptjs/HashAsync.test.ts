import bcryptHasher from "../../impl/BcryptjsHasher";
import Hasher, {HasherError, HashResponse } from '../../interfaces/Hasher';

test('HashAsync_OnValidInput_ReturnsTransformedOutput', async () => {
  // Arrange
  const hasher: Hasher = new bcryptHasher();
  const inputTest = "p@ssw0rd";

  // Act
  let response: HasherError | HashResponse = await hasher.hashAsync(inputTest);
  
  // Assert
  expect(response.ok).toBeTruthy;
  
  response = (response as HashResponse);
  const doOutputStringDiffersFromInput: Boolean = response.hashedInput != inputTest;
  expect(doOutputStringDiffersFromInput).toBeTruthy();
});