import hasher from "../../../utils/hasher/BcryptjsHasher";
import {
  TCompareResponse,
  THasherError,
  THashResponse,
} from "../../../utils/hasher/HasherTypes";

test("CompareAsync_OnSameInput_ReturnsTrue", async () => {
  // Arrange
  const inputTest = "p@ssw0rd";
  const hashResponse: THasherError | THashResponse = await hasher.hashAsync(
    inputTest
  );
  const hashedInput: string = (hashResponse as THashResponse).hashedInput;

  // Act
  const compareResponse: THasherError | TCompareResponse =
    await hasher.compareAsync(inputTest, hashedInput);

  // Assert
  expect((compareResponse as TCompareResponse).isSameInput).toBeTruthy();
});

test("CompareAsync_OnDiff_ReturnsFalse", async () => {
  // Arrange
  const inputTest = "p@ssw0rd";
  const divergentInput = "password";
  const hashResponse: THasherError | THashResponse = await hasher.hashAsync(
    inputTest
  );
  const hashedInput: string = (hashResponse as THashResponse).hashedInput;

  // Act
  const compareResponse: THasherError | TCompareResponse =
    await hasher.compareAsync(divergentInput, hashedInput);

  // Assert
  expect((compareResponse as TCompareResponse).isSameInput).toBeFalsy();
});

test("CompareAsync_OnNonHashedArg_ReturnsFalse", async () => {
  // Arrange
  const inputTest = "p@ssw0rd";

  // Act
  const compareResponse: THasherError | TCompareResponse =
    await hasher.compareAsync(inputTest, inputTest);

  // Assert
  expect((compareResponse as TCompareResponse).isSameInput).toBeFalsy();
});
