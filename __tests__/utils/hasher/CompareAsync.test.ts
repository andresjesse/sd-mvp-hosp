import hasher from "../../../utils/hasher/BcryptjsHasher";

test("CompareAsync_OnSameInput_ReturnsTrue", async () => {
  // Arrange
  const inputTest = "p@ssw0rd";
  const hashedInput = await hasher.hashAsync(inputTest);

  // Act
  const compareResponse = await hasher.compareAsync(inputTest, hashedInput);

  // Assert
  expect(compareResponse).toBeTruthy();
});

test("CompareAsync_OnDiff_ReturnsFalse", async () => {
  // Arrange
  const inputTest = "p@ssw0rd";
  const divergentInput = "password";
  const hashedInput = await hasher.hashAsync(inputTest);

  // Act
  const compareResponse = await hasher.compareAsync(
    divergentInput,
    hashedInput
  );

  // Assert
  expect(compareResponse).toBeFalsy();
});

test("CompareAsync_OnNonHashedArg_ReturnsFalse", async () => {
  // Arrange
  const inputTest = "p@ssw0rd";

  // Act
  const compareResponse = await hasher.compareAsync(inputTest, inputTest);

  // Assert
  expect(compareResponse).toBeFalsy();
});
