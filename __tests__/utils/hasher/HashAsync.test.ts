import hasher from "../../../utils/hasher/BcryptjsHasher";
import { THasherError, THashResponse } from "../../../utils/hasher/HasherTypes";

test("HashAsync_OnValidInput_ReturnsTransformedOutput", async () => {
  // Arrange
  const inputTest = "p@ssw0rd";

  // Act
  let response: THasherError | THashResponse = await hasher.hashAsync(
    inputTest
  );

  // Assert
  expect(response.ok).toBeTruthy();

  response = response as THashResponse;
  const doOutputStringDiffersFromInput: Boolean =
    response.hashedInput != inputTest;
  expect(doOutputStringDiffersFromInput).toBeTruthy();
});

test("HashAsync_OnNullInput_ReturnsFalse", async () => {
  // Arrange
  const inputTest = null;

  // Act
  let response: THasherError | THashResponse = await hasher.hashAsync(
    inputTest as any
  );

  // Assert
  expect(response.ok).toBeFalsy();
});
