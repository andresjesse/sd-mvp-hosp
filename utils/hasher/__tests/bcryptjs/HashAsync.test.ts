import hasher from "../../impl/BcryptjsHasher";
import {HasherError, HashResponse } from '../../interfaces/Hasher';

test('HashAsync_OnValidInput_ReturnsTransformedOutput', async () => {
  // Arrange
  const inputTest = "p@ssw0rd";

  // Act
  let response: HasherError | HashResponse = await hasher.hashAsync(inputTest);
  
  // Assert
  expect(response.ok).toBeTruthy();
  
  response = (response as HashResponse);
  const doOutputStringDiffersFromInput: Boolean = response.hashedInput != inputTest;
  expect(doOutputStringDiffersFromInput).toBeTruthy();
});

test('HashAsync_OnNullInput_ReturnsFalse', async () => {
  // Arrange
  const inputTest = null;

  // Act
  let response: HasherError | HashResponse = await hasher.hashAsync(inputTest as any);
  
  // Assert
  expect(response.ok).toBeFalsy();
});